import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendOTP, sendPasswordResetEmail } from '../services/nodeMailer.js';

class UserController {
    // ========== Register ==========
    async register(req, res) {
        try {
            const { username, email, password, role } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: "Please fill all fields", success: false });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: role || "user"
            });

            await newUser.save();

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                },
                success: true
            });
        } catch (err) {
            console.error("Register error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Login ==========
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Please fill all fields", success: false });
            }

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: "User not found", success: false });
            }

            const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Password is incorrect", success: false });
            }

            const SECRET = process.env.JWT_SECRET;
            const token = jwt.sign({ id: existingUser._id }, SECRET, { expiresIn: "1h" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // set true in production with HTTPS
                sameSite: "lax",
                maxAge: 3600000,
                path: "/"
            });

            return res.status(200).json({
                message: "User verified successfully",
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role
                },
                userId: existingUser._id,
                token: token, // Send token in response body for localStorage
                success: true
            });
        } catch (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Logout ==========
    async logout(req, res) {
        try {
            res.clearCookie("token", {
                path: "/",
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            return res.status(200).json({ message: "Logged out", success: true });
        } catch (err) {
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Change Password ==========
    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({ message: "Please provide current and new password", success: false });
            }

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Current password is incorrect", success: false });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return res.status(200).json({ message: "Password updated successfully", success: true });
        } catch (err) {
            console.error("Change password error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Forgot Password: Send OTP ==========
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ message: "Email is required" });

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "User not found" });

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.resetOTP = otp;
            user.resetOTPExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
            await user.save();

            await sendOTP(user.email, user.username, otp);

            return res.json({ message: "OTP sent to your email" });
        } catch (err) {
            console.error("Forgot password error:", err);
            return res.status(500).json({ message: "Failed to send OTP" });
        }
    }

    // ========== Verify OTP ==========
    async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "User not found" });

            if (!user.resetOTP || !user.resetOTPExpiry) {
                return res.status(400).json({ message: "No OTP requested" });
            }
            if (user.resetOTP !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }
            if (user.resetOTPExpiry < Date.now()) {
                return res.status(400).json({ message: "OTP expired" });
            }

            return res.json({ message: "OTP verified" });
        } catch (err) {
            console.error("Verify OTP error:", err);
            return res.status(500).json({ message: "Failed to verify OTP" });
        }
    }

    // ========== Reset Password ==========
    async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;
            if (!email || !otp || !newPassword) {
                return res.status(400).json({ message: "All fields required" });
            }

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "User not found" });

            if (!user.resetOTP || !user.resetOTPExpiry) {
                return res.status(400).json({ message: "No OTP requested" });
            }
            if (user.resetOTP !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }
            if (user.resetOTPExpiry < Date.now()) {
                return res.status(400).json({ message: "OTP expired" });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            user.resetOTP = undefined;
            user.resetOTPExpiry = undefined;
            await user.save();

            return res.json({ message: "Password reset successful" });
        } catch (err) {
            console.error("Reset password error:", err);
            return res.status(500).json({ message: "Failed to reset password" });
        }
    }

    // ========== Get Profile ==========
    async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            return res.status(200).json({ user, success: true });
        } catch (err) {
            console.error("Get profile error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Update Profile ==========
    async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const { username, email, fullName, phone } = req.body;

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            if (email && email !== user.email) {
                const emailExists = await User.findOne({ email });
                if (emailExists) {
                    return res.status(400).json({ message: "Email already in use", success: false });
                }
            }

            if (username) user.username = username;
            if (email) user.email = email;
            if (fullName) user.fullName = fullName;
            if (phone) user.phone = phone;

            await user.save();

            return res.status(200).json({
                message: "Profile updated successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    phone: user.phone,
                    role: user.role
                },
                success: true
            });
        } catch (err) {
            console.error("Update profile error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Change Password ==========
    async changePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({ 
                    message: "Current password and new password are required", 
                    success: false 
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({ 
                    message: "New password must be at least 6 characters long", 
                    success: false 
                });
            }

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            // Verify current password
            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                return res.status(400).json({ 
                    message: "Current password is incorrect", 
                    success: false 
                });
            }

            // Hash new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
            await user.save();

            return res.status(200).json({
                message: "Password changed successfully",
                success: true
            });
        } catch (err) {
            console.error("Change password error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Forgot Password ==========
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({ message: "Email is required", success: false });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found with this email", success: false });
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

            // Save reset token to user
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetTokenExpiry;
            await user.save();

            // Send reset email
            const resetUrl = `${process.env.PORTAL_PORT}/reset-password/${resetToken}`;
            const emailResult = await sendPasswordResetEmail(user.email, user.username, resetUrl);

            if (emailResult.success) {
                return res.status(200).json({
                    message: "Password reset email sent successfully",
                    success: true
                });
            } else {
                return res.status(500).json({
                    message: "Failed to send reset email",
                    success: false
                });
            }

        } catch (err) {
            console.error("Forgot password error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }

    // ========== Reset Password ==========
    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({ message: "New password is required", success: false });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
            }

            // Find user with valid reset token
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({ message: "Invalid or expired reset token", success: false });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update user password and clear reset token
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return res.status(200).json({
                message: "Password reset successfully",
                success: true
            });

        } catch (err) {
            console.error("Reset password error:", err);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    }
}

export default new UserController();
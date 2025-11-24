import Team from "../models/Team.js";

class TeamController {
    // Add a member (only admin)
    async addMember(req, res) {
        try {
            const { name, role, type = 'physical', twitter, linkedin, facebook } = req.body;
            console.log("Body:", req.body);
            console.log("File:", req.file);

            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload an image",
                    success: false
                });
            }

            // Validate member type
            if (!['digital', 'physical'].includes(type)) {
                return res.status(400).json({
                    message: "Invalid member type. Must be 'digital' or 'physical'",
                    success: false
                });
            }

            const newMember = await Team.create({
                name,
                role,
                type,
                image: `/uploads/team/${req.file.filename}`,
                socialLinks: {
                    twitter: twitter || "",
                    linkedin: linkedin || "",
                    facebook: facebook || "",
                },
            });

            return res.status(201).json({
                message: "Team member added successfully",
                success: true,
                data: newMember,
            });
        } catch (err) {
            return res.status(500).json({ message: `Server Error: ${err.message}`, success: false });
        }
    }

    // Get all members (public)
    async getMembers(req, res) {
        try {
            const { type } = req.query;
            const query = {};

            // Filter by type if provided
            if (type && ['digital', 'physical'].includes(type)) {
                query.type = type;
            }

            const members = await Team.find(query).sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                members
            });
        } catch (err) {
            return res.status(500).json({
                message: `Server Error: ${err.message}`,
                success: false
            });
        }
    }

    // Update a member (only admin)
    async updateMember(req, res) {
        try {
            const { id } = req.params;
            const { name, role, type, twitter, linkedin, facebook } = req.body;

            const member = await Team.findById(id);
            if (!member) {
                return res.status(404).json({
                    message: "Team member not found",
                    success: false
                });
            }

            // Update image if provided
            if (req.file) {
                // Delete old image
                const fs = await
                import ('fs');
                const path = await
                import ('path');
                const oldImagePath = path.join(process.cwd(), 'uploads/team', path.basename(member.image));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                member.image = `/uploads/team/${req.file.filename}`;
            }

            // Update other fields
            member.name = name || member.name;
            member.role = role || member.role;
            member.type = type || member.type;
            member.socialLinks = {
                twitter: twitter !== undefined ? twitter : member.socialLinks.twitter,
                linkedin: linkedin !== undefined ? linkedin : member.socialLinks.linkedin,
                facebook: facebook !== undefined ? facebook : member.socialLinks.facebook,
            };

            await member.save();

            return res.status(200).json({
                message: "Team member updated successfully",
                success: true,
                data: member,
            });
        } catch (err) {
            return res.status(500).json({
                message: `Server Error: ${err.message}`,
                success: false
            });
        }
    }

    // Delete a member (only admin)
    async deleteMember(req, res) {
        try {
            const { id } = req.params;

            const member = await Team.findById(id);
            if (!member) {
                return res.status(404).json({
                    message: "Team member not found",
                    success: false
                });
            }

            // Delete image file if exists
            if (member.image) {
                const fs = await
                import ('fs');
                const path = await
                import ('path');
                const oldImagePath = path.join(process.cwd(), 'uploads/team', path.basename(member.image));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            await Team.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Team member deleted successfully",
                success: true
            });
        } catch (err) {
            console.error("Error in deleteMember:", err);
            return res.status(500).json({
                message: `Server Error: ${err.message}`,
                success: false
            });
        }
    }
}

export default new TeamController();
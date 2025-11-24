import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// Define your upload paths
const uploadPathCVs = path.join(process.cwd(), "uploads/cv");
const uploadPathPDFs = path.join(process.cwd(), "uploads/pdfs");
const uploadPathTeam = path.join(process.cwd(), "uploads/team");
const uploadPathTestimonials = path.join(process.cwd(), "uploads/testimonials");
const uploadPathFacilities = path.join(process.cwd(), "uploads/facilities");
const uploadPathImages = path.join(process.cwd(), "uploads/services");
const uploadPathProjects = path.join(process.cwd(), "uploads/projects");
const uploadPathGallery = path.join(process.cwd(), "uploads/gallery");
const uploadBlogs = path.join(process.cwd(), "uploads/blogs");

// Ensure folders exist
[
    uploadPathCVs,
    uploadPathPDFs,
    uploadPathTeam,
    uploadPathTestimonials,
    uploadPathFacilities,
    uploadPathImages,
    uploadPathProjects,
    uploadPathGallery,
    uploadBlogs,
].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});


// Mime type normalization
const mimeTypeMapping = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    ".tiff": "image/tiff",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".heic": "image/heic",
    ".heif": "image/heif",
    ".avif": "image/avif",
    ".apng": "image/apng",
};

const getNormalizedMimeType = (file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    return mimeTypeMapping[ext] || (file.mimetype && file.mimetype.startsWith("image/") ? file.mimetype : "application/octet-stream");
};

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "cv") cb(null, uploadPathCVs);
        else if (getNormalizedMimeType(file) === "application/pdf") cb(null, uploadPathPDFs);
        else if (req.originalUrl.includes("/team/")) cb(null, uploadPathTeam);
        else if (req.originalUrl.includes("/testimonial/")) cb(null, uploadPathTestimonials);
        else if (req.originalUrl.includes("/facility/")) cb(null, uploadPathFacilities);
        else if (req.originalUrl.includes("/project/")) cb(null, uploadPathProjects);
        else if (req.originalUrl.includes("/blogs/")) cb(null, uploadBlogs);
        else if (req.originalUrl.includes("/gallery/")) cb(null, uploadPathGallery);

        else cb(null, uploadPathImages);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});

// Image filter
const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif|bmp|tiff|tif|svg|ico|heic|heif|avif|apng/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(getNormalizedMimeType(file)) || getNormalizedMimeType(file).startsWith("image/");
    if (file.size > 10 * 1024 * 1024) return cb(new Error("File size must be less than 10MB"));
    if (extname || mimetype) cb(null, true);
    else cb(new Error("Only image files are allowed!"));
};

// PDF filter
const pdfFilter = (req, file, cb) => {
    const allowedTypes = /pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = getNormalizedMimeType(file) === "application/pdf";
    if (file.size > 30 * 1024 * 1024) return cb(new Error("PDF file size must be less than 30MB"));
    if (extname && mimetype) cb(null, true);
    else cb(new Error("Only PDF files are allowed!"));
};

// Multer configs
export const upload = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 20 * 1024 * 1024 } });
export const uploadPDF = multer({ storage, fileFilter: pdfFilter, limits: { fileSize: 30 * 1024 * 1024 } });

// ✅ Middleware to convert uploaded images to WebP
export const convertToWebP = async(req, res, next) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".tiff", ".bmp", ".heic", ".heif", ".avif"];

    const processOne = async(file) => {
        const ext = path.extname(file.filename).toLowerCase();
        if (!imageExtensions.includes(ext)) return;
        const inputPath = file.path;
        const outputName = `${path.parse(file.filename).name}.webp`;
        const outputPath = path.join(path.dirname(inputPath), outputName);
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        file.filename = outputName;
        file.path = outputPath;
        file.mimetype = "image/webp";
        if (inputPath !== outputPath) fs.unlinkSync(inputPath);
    };

    try {
        if (req.file) {
            await processOne(req.file);
        }
        if (Array.isArray(req.files) && req.files.length) {
            for (const f of req.files) {
                await processOne(f);
            }
        }
        next();
    } catch (err) {
        console.error("Error converting image(s) to WebP:", err);
        next(err);
    }
};
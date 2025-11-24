import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';


// make routes 
import userRoute from './routes/user.routes.js'
import servicesRoute from './routes/services.routes.js'
import contactRoutes from './routes/contact.routes.js'
import testimonialRoutes from './routes/testimonial.routes.js'
import teamRoutes from './routes/team.routes.js'
import galleryRoutes from './routes/gallery.routes.js'
import projectRoutes from './routes/project.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import blogsRoutes from './routes/blogs.routes.js'
dotenv.config();

const app = express();

// Security headers
app.use(
    helmet({
        contentSecurityPolicy: false, // disables CSP entirely
    })
);
// Compression middleware (optimized)
app.use(
    compression({
        level: 9, // Maximum compression
        threshold: 1, // Compress everything
        filter: (req, res) => {
            if (req.headers['x-no-compression']) return false;
            return compression.filter(req, res);
        },
    })
);

// Request parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Logger (optional for production)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://sparkbrightcleaning.com',      // add this
    'http://www.sparkbrightcleaning.com',
        'https://admin.sparkbrightcleaning.com',

    // add www version
];


app.use(
    cors({
        origin: function(origin, callback) {
            // Allow requests with no origin (like mobile apps, curl, postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
                console.error(msg);
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

// Path helpers
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();


// make rest full apis 
app.use('/api', userRoute)
app.use('/api', servicesRoute)
app.use('/api', testimonialRoutes)
app.use('/api', teamRoutes)
app.use('/api', contactRoutes)
app.use('/api', projectRoutes)
app.use('/api', galleryRoutes)
app.use('/api', dashboardRoutes)
app.use('/api', blogsRoutes)
    // Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version,
    });
});

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Shehrity Backend API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        status: 'operational',
    });
});

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});

export default app;

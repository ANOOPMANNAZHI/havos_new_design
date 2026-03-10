import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import blogRoutes from './routes/blog.js';
import caseStudiesRoutes from './routes/caseStudies.js';
import careersRoutes from './routes/careers.js';
import testimonialsRoutes from './routes/testimonials.js';
import faqRoutes from './routes/faq.js';
import teamRoutes from './routes/team.js';
import pageContentRoutes from './routes/pageContent.js';
import legalRoutes from './routes/legal.js';
import navigationRoutes from './routes/navigation.js';
import clientLogosRoutes from './routes/clientLogos.js';
import contactRoutes from './routes/contact.js';
import seoRoutes from './routes/seo.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Make prisma available to routes
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/case-studies', caseStudiesRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/page-content', pageContentRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/client-logos', clientLogosRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { prisma };

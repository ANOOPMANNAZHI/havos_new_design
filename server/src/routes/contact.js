import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import { sendEmail, contactNotificationEmail } from '../utils/sendEmail.js';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  details: z.string().min(10).max(5000),
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' },
});

// Public: Submit contact form
router.post('/', contactLimiter, validate(contactSchema), async (req, res) => {
  try {
    const submission = await req.prisma.contactSubmission.create({
      data: req.body,
    });

    // Send notification email (non-blocking)
    try {
      const adminEmail = await req.prisma.setting.findUnique({
        where: { settingKey: 'contact_email' },
      });
      if (adminEmail) {
        const { subject, html } = contactNotificationEmail(req.body);
        await sendEmail({ to: adminEmail.settingValue, subject, html });
      }
    } catch (emailErr) {
      console.error('Failed to send notification email:', emailErr.message);
    }

    res.status(201).json({ message: 'Thank you! We will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all submissions
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const { archived } = req.query;
    const where = archived === 'true' ? { isArchived: true } : { isArchived: false };
    const submissions = await req.prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get single submission
router.get('/admin/:id', authenticate, async (req, res) => {
  try {
    const submission = await req.prisma.contactSubmission.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!submission) return res.status(404).json({ error: 'Not found' });
    // Mark as read
    if (!submission.isRead) {
      await req.prisma.contactSubmission.update({
        where: { id: submission.id },
        data: { isRead: true },
      });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update (archive/unarchive)
router.put('/admin/:id', authenticate, async (req, res) => {
  try {
    const submission = await req.prisma.contactSubmission.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(submission);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete
router.delete('/admin/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.contactSubmission.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

export default router;

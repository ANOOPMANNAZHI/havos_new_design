import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get active testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await req.prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const testimonials = await req.prisma.testimonial.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const testimonials = await req.prisma.testimonial.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create
router.post('/', authenticate, async (req, res) => {
  try {
    const testimonial = await req.prisma.testimonial.create({ data: req.body });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update
router.put('/:id', authenticate, async (req, res) => {
  try {
    const testimonial = await req.prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(testimonial);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get active FAQs grouped by category
router.get('/', async (req, res) => {
  try {
    const faqs = await req.prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const faqs = await req.prisma.fAQ.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create
router.post('/', authenticate, async (req, res) => {
  try {
    const faq = await req.prisma.fAQ.create({ data: req.body });
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update
router.put('/:id', authenticate, async (req, res) => {
  try {
    const faq = await req.prisma.fAQ.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(faq);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.fAQ.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

export default router;

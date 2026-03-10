import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get active case studies
router.get('/', async (req, res) => {
  try {
    const studies = await req.prisma.caseStudy.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(studies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get by slug
router.get('/:slug', async (req, res) => {
  try {
    const study = await req.prisma.caseStudy.findUnique({
      where: { slug: req.params.slug },
    });
    if (!study) return res.status(404).json({ error: 'Case study not found' });
    res.json(study);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const studies = await req.prisma.caseStudy.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    res.json(studies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create
router.post('/', authenticate, async (req, res) => {
  try {
    const study = await req.prisma.caseStudy.create({ data: req.body });
    res.status(201).json(study);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update
router.put('/:id', authenticate, async (req, res) => {
  try {
    const study = await req.prisma.caseStudy.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(study);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.caseStudy.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

export default router;

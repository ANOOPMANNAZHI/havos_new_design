import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get active jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await req.prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get job by slug
router.get('/:slug', async (req, res) => {
  try {
    const job = await req.prisma.job.findUnique({
      where: { slug: req.params.slug },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const jobs = await req.prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create
router.post('/', authenticate, async (req, res) => {
  try {
    const job = await req.prisma.job.create({ data: req.body });
    res.status(201).json(job);
  } catch (err) {
    if (err.code === 'P2002') return res.status(400).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update
router.put('/:id', authenticate, async (req, res) => {
  try {
    const job = await req.prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(job);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.job.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const logos = await req.prisma.clientLogo.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(logos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const logos = await req.prisma.clientLogo.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(logos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const logo = await req.prisma.clientLogo.create({ data: req.body });
    res.status(201).json(logo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const logo = await req.prisma.clientLogo.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(logo);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.clientLogo.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

export default router;

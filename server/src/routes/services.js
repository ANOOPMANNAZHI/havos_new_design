import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const serviceSchema = z.object({
  number: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  fullDescription: z.string(),
  tags: z.array(z.string()),
  icon: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
  seoMetaTitle: z.string().optional().nullable(),
  seoMetaDesc: z.string().optional().nullable(),
  seoOgImage: z.string().optional().nullable(),
});

// Public: Get all active services
router.get('/', async (req, res) => {
  try {
    const services = await req.prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await req.prisma.service.findUnique({
      where: { slug: req.params.slug },
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all services (including inactive)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const services = await req.prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create service
router.post('/', authenticate, validate(serviceSchema), async (req, res) => {
  try {
    const service = await req.prisma.service.create({ data: req.body });
    res.status(201).json(service);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update service
router.put('/:id', authenticate, async (req, res) => {
  try {
    const service = await req.prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(service);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete service
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.service.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin: Reorder services
router.put('/admin/reorder', authenticate, async (req, res) => {
  try {
    const { items } = req.body;
    const updates = items.map((item, index) =>
      req.prisma.service.update({
        where: { id: item.id },
        data: { sortOrder: index },
      })
    );
    await req.prisma.$transaction(updates);
    res.json({ message: 'Reordered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

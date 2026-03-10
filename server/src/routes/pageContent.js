import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get page content by slug
router.get('/:pageSlug', async (req, res) => {
  try {
    const page = await req.prisma.pageContent.findUnique({
      where: { pageSlug: req.params.pageSlug },
    });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all pages
router.get('/', authenticate, async (req, res) => {
  try {
    const pages = await req.prisma.pageContent.findMany();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Upsert page content
router.put('/:pageSlug', authenticate, async (req, res) => {
  try {
    const page = await req.prisma.pageContent.upsert({
      where: { pageSlug: req.params.pageSlug },
      update: req.body,
      create: { pageSlug: req.params.pageSlug, ...req.body },
    });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get legal page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await req.prisma.legalPage.findUnique({
      where: { slug: req.params.slug },
    });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update legal page
router.put('/:slug', authenticate, async (req, res) => {
  try {
    const page = await req.prisma.legalPage.upsert({
      where: { slug: req.params.slug },
      update: { ...req.body, lastUpdated: new Date() },
      create: { slug: req.params.slug, ...req.body },
    });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get SEO data for a page
router.get('/:pageSlug', async (req, res) => {
  try {
    const page = await req.prisma.pageContent.findUnique({
      where: { pageSlug: req.params.pageSlug },
      select: { seoMetaTitle: true, seoMetaDesc: true, seoOgImage: true },
    });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all pages' SEO data
router.get('/', authenticate, async (req, res) => {
  try {
    const pages = await req.prisma.pageContent.findMany({
      select: { pageSlug: true, seoMetaTitle: true, seoMetaDesc: true, seoOgImage: true },
    });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update SEO for a page
router.put('/:pageSlug', authenticate, async (req, res) => {
  try {
    const { seoMetaTitle, seoMetaDesc, seoOgImage } = req.body;
    const page = await req.prisma.pageContent.upsert({
      where: { pageSlug: req.params.pageSlug },
      update: { seoMetaTitle, seoMetaDesc, seoOgImage },
      create: { pageSlug: req.params.pageSlug, sections: {}, seoMetaTitle, seoMetaDesc, seoOgImage },
    });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

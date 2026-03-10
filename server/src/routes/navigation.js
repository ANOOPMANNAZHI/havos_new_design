import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get navigation by type
router.get('/:type', async (req, res) => {
  try {
    const nav = await req.prisma.navigation.findUnique({
      where: { type: req.params.type },
    });
    if (!nav) return res.status(404).json({ error: 'Navigation not found' });
    res.json(nav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update navigation
router.put('/:type', authenticate, async (req, res) => {
  try {
    const nav = await req.prisma.navigation.upsert({
      where: { type: req.params.type },
      update: { items: req.body.items },
      create: { type: req.params.type, items: req.body.items },
    });
    res.json(nav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

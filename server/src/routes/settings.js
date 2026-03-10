import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get specific setting
router.get('/:key', async (req, res) => {
  try {
    const setting = await req.prisma.setting.findUnique({
      where: { settingKey: req.params.key },
    });
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json({ key: setting.settingKey, value: setting.settingValue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all settings
router.get('/', authenticate, async (req, res) => {
  try {
    const settings = await req.prisma.setting.findMany();
    const result = {};
    settings.forEach(s => { result[s.settingKey] = s.settingValue; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Bulk update settings
router.put('/', authenticate, async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    const updates = entries.map(([key, value]) =>
      req.prisma.setting.upsert({
        where: { settingKey: key },
        update: { settingValue: String(value) },
        create: { settingKey: key, settingValue: String(value) },
      })
    );
    await req.prisma.$transaction(updates);
    res.json({ message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

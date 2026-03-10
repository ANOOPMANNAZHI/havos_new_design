import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { getPagination, paginatedResponse } from '../utils/pagination.js';

const router = Router();

const blogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  tag: z.string(),
  icon: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  publishedAt: z.string().optional(),
  readTime: z.string().optional().nullable(),
  author: z.string(),
  authorRole: z.string().optional().nullable(),
  authorInitials: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  seoMetaTitle: z.string().optional().nullable(),
  seoMetaDesc: z.string().optional().nullable(),
  seoOgImage: z.string().optional().nullable(),
});

// Public: Get published posts
router.get('/', async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const where = { isPublished: true };
    const [posts, total] = await Promise.all([
      req.prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      req.prisma.blogPost.count({ where }),
    ]);
    res.json(paginatedResponse(posts, total, page, limit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await req.prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
    });
    if (!post || !post.isPublished) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all posts
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const posts = await req.prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create post
router.post('/', authenticate, validate(blogSchema), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
    const post = await req.prisma.blogPost.create({ data });
    res.status(201).json(post);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update post
router.put('/:id', authenticate, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
    const post = await req.prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data,
    });
    res.json(post);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await req.prisma.blogPost.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;

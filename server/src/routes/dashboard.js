import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const [
      services,
      blogPosts,
      caseStudies,
      jobs,
      testimonials,
      faqs,
      teamMembers,
      unreadSubmissions,
      totalSubmissions,
    ] = await Promise.all([
      req.prisma.service.count(),
      req.prisma.blogPost.count(),
      req.prisma.caseStudy.count(),
      req.prisma.job.count({ where: { isActive: true } }),
      req.prisma.testimonial.count(),
      req.prisma.fAQ.count(),
      req.prisma.teamMember.count(),
      req.prisma.contactSubmission.count({ where: { isRead: false, isArchived: false } }),
      req.prisma.contactSubmission.count(),
    ]);

    const recentSubmissions = await req.prisma.contactSubmission.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    res.json({
      counts: {
        services,
        blogPosts,
        caseStudies,
        jobs,
        testimonials,
        faqs,
        teamMembers,
        unreadSubmissions,
        totalSubmissions,
      },
      recentSubmissions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

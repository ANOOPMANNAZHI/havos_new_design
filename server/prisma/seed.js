import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@havos.com' },
    update: {},
    create: {
      email: 'admin@havos.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('Admin user created (admin@havos.com / admin123)');

  // Seed services
  const services = [
    {
      number: '01', slug: 'web-app-development', title: 'Website & App Development',
      description: 'Custom websites and mobile applications built with modern frameworks. From responsive landing pages to complex web apps, we deliver pixel-perfect solutions that perform.',
      fullDescription: 'We specialize in building high-performance websites and applications using cutting-edge technologies like React, Next.js, and React Native. Our development process ensures clean code, fast load times, and seamless user experiences across all devices. Whether you need a corporate website, SaaS platform, or mobile app, our team delivers scalable solutions tailored to your business goals.',
      tags: ['React', 'Next.js', 'Mobile Apps', 'UI/UX', 'Progressive Web Apps'], sortOrder: 0,
    },
    {
      number: '02', slug: 'digital-marketing', title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that increase visibility, drive traffic, and convert leads. SEO, social media, PPC, and content marketing under one roof.',
      fullDescription: 'Our digital marketing team crafts comprehensive strategies that put your brand in front of the right audience. We combine SEO expertise, targeted social media campaigns, pay-per-click advertising, and compelling content marketing to drive measurable results. Every campaign is backed by analytics and optimized continuously for maximum ROI.',
      tags: ['SEO', 'Social Media', 'PPC', 'Content Marketing', 'Analytics'], sortOrder: 1,
    },
    {
      number: '03', slug: 'cybersecurity', title: 'Cybersecurity',
      description: 'Protect your digital assets with enterprise-grade security solutions. Vulnerability assessments, penetration testing, compliance auditing, and 24/7 monitoring.',
      fullDescription: 'In an increasingly connected world, cybersecurity is non-negotiable. We provide comprehensive security services including vulnerability assessments, penetration testing, security audits, and real-time threat monitoring. Our team helps businesses achieve compliance with industry standards while building robust defense systems against evolving cyber threats.',
      tags: ['Penetration Testing', 'Compliance', 'Threat Monitoring', 'Security Audits', 'Incident Response'], sortOrder: 2,
    },
    {
      number: '04', slug: 'it-consulting', title: 'IT Consulting',
      description: 'Strategic technology consulting to align your IT infrastructure with business objectives. Cloud migration, system architecture, and digital transformation roadmaps.',
      fullDescription: 'Our IT consulting services help organizations make informed technology decisions. We assess your current infrastructure, identify gaps, and design roadmaps for digital transformation. From cloud migration strategies to system architecture design, we provide the expertise you need to modernize operations, reduce costs, and stay ahead of the competition.',
      tags: ['Cloud Migration', 'Architecture', 'Digital Transformation', 'Infrastructure', 'Strategy'], sortOrder: 3,
    },
    {
      number: '05', slug: 'ai-automation', title: 'AI & Workflow Automation',
      description: 'Leverage artificial intelligence and smart automation to streamline operations. Custom AI models, chatbots, workflow automation, and intelligent data processing.',
      fullDescription: 'Transform your business operations with AI-powered solutions. We build custom machine learning models, intelligent chatbots, and automated workflows that eliminate repetitive tasks and unlock new efficiencies. From document processing to predictive analytics, our AI solutions are designed to integrate seamlessly with your existing systems and deliver immediate value.',
      tags: ['Machine Learning', 'Chatbots', 'Process Automation', 'NLP', 'Predictive Analytics'], sortOrder: 4,
    },
    {
      number: '06', slug: 'ecommerce', title: 'E-Commerce Solutions',
      description: 'End-to-end e-commerce platforms that drive sales. Custom storefronts, payment integration, inventory management, and conversion optimization.',
      fullDescription: 'We build powerful e-commerce experiences that turn visitors into customers. Our solutions include custom storefront development, secure payment gateway integration, inventory and order management systems, and conversion rate optimization. Whether you\'re launching a new online store or scaling an existing one, we deliver platforms that are fast, secure, and built to sell.',
      tags: ['Shopify', 'Custom Stores', 'Payment Gateways', 'Inventory', 'CRO'], sortOrder: 5,
    },
    {
      number: '07', slug: 'whatsapp-automation', title: 'WhatsApp Automation & Backup',
      description: 'Automate customer communication with WhatsApp Business API. Bulk messaging, chatbots, CRM integration, and secure message backup solutions.',
      fullDescription: 'Harness the power of WhatsApp for business communication at scale. We set up WhatsApp Business API integrations, build automated chatbot flows, enable bulk messaging campaigns, and provide secure backup solutions for your conversation history. Our WhatsApp automation solutions help businesses improve response times, nurture leads, and maintain organized communication records.',
      tags: ['WhatsApp API', 'Chatbots', 'Bulk Messaging', 'CRM Integration', 'Message Backup'], sortOrder: 6,
    },
    {
      number: '08', slug: 'custom-lms', title: 'Custom Learning App (LMS)',
      description: 'Purpose-built learning management systems for education and corporate training. Course creation, progress tracking, assessments, and certificate generation.',
      fullDescription: 'We design and develop custom Learning Management Systems tailored to your educational or training needs. Our LMS solutions feature intuitive course builders, interactive content delivery, progress tracking dashboards, assessment engines, and automated certificate generation. Built for scalability, our platforms support thousands of concurrent learners with a seamless experience.',
      tags: ['Course Builder', 'Progress Tracking', 'Assessments', 'Certificates', 'Video Streaming'], sortOrder: 7,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`Seeded ${services.length} services`);

  // Seed case studies
  const caseStudies = [
    {
      number: '01', slug: 'ecommerce-platform-redesign', title: 'E-Commerce Platform Redesign', client: 'RetailMax',
      description: 'Complete redesign and development of a high-traffic e-commerce platform, resulting in a 45% increase in conversion rates and 60% faster page loads.',
      tags: ['E-Commerce', 'UI/UX', 'Performance'], color: '#2B5CFF', gradient: 'linear-gradient(135deg, #2B5CFF 0%, #6B8CFF 100%)',
      challenge: 'RetailMax\'s existing platform was built on legacy technology, causing slow load times, poor mobile experience, and declining conversion rates in an increasingly competitive market.',
      solution: 'We rebuilt the entire platform using React and Next.js with a headless CMS, implemented server-side rendering for SEO, and designed a mobile-first checkout flow optimized for conversions.',
      results: [{ metric: '45%', label: 'Increase in Conversions' }, { metric: '60%', label: 'Faster Page Loads' }, { metric: '3x', label: 'Mobile Revenue Growth' }],
      sortOrder: 0,
    },
    {
      number: '02', slug: 'ai-powered-customer-support', title: 'AI-Powered Customer Support', client: 'TechFlow Solutions',
      description: 'Built an intelligent chatbot system that handles 70% of customer queries automatically, reducing support costs by 40% while improving response times.',
      tags: ['AI', 'Automation', 'Chatbot'], color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
      challenge: 'TechFlow\'s support team was overwhelmed with repetitive queries, leading to long wait times and high operational costs. Customer satisfaction scores were dropping quarter over quarter.',
      solution: 'We designed and trained a custom AI chatbot using NLP models fine-tuned on TechFlow\'s knowledge base, with seamless handoff to human agents for complex issues.',
      results: [{ metric: '70%', label: 'Queries Auto-Resolved' }, { metric: '40%', label: 'Cost Reduction' }, { metric: '< 5s', label: 'Average Response Time' }],
      sortOrder: 1,
    },
    {
      number: '03', slug: 'healthcare-data-platform', title: 'Healthcare Data Platform', client: 'MedConnect',
      description: 'Developed a HIPAA-compliant data platform for managing patient records, appointments, and telemedicine sessions with end-to-end encryption.',
      tags: ['Healthcare', 'Security', 'Cloud'], color: '#059669', gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
      challenge: 'MedConnect needed a unified platform to manage patient data across multiple clinics while maintaining strict HIPAA compliance and enabling secure telemedicine capabilities.',
      solution: 'We built a cloud-native platform on AWS with end-to-end encryption, role-based access controls, integrated video conferencing, and automated compliance monitoring.',
      results: [{ metric: '100%', label: 'HIPAA Compliance' }, { metric: '50K+', label: 'Patient Records Managed' }, { metric: '99.9%', label: 'Platform Uptime' }],
      sortOrder: 2,
    },
    {
      number: '04', slug: 'corporate-learning-portal', title: 'Corporate Learning Portal', client: 'EduGrowth Academy',
      description: 'Custom LMS with interactive course builder, live video integration, and automated certification — serving 10,000+ learners across 5 countries.',
      tags: ['LMS', 'Education', 'Video'], color: '#D97706', gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
      challenge: 'EduGrowth was using multiple disconnected tools for content delivery, assessments, and certification. They needed a single platform to scale across countries and languages.',
      solution: 'We developed a custom LMS with drag-and-drop course builder, real-time video streaming, multi-language support, automated grading, and digital certificate generation.',
      results: [{ metric: '10K+', label: 'Active Learners' }, { metric: '5', label: 'Countries Served' }, { metric: '92%', label: 'Course Completion Rate' }],
      sortOrder: 3,
    },
    {
      number: '05', slug: 'whatsapp-business-automation', title: 'WhatsApp Business Automation', client: 'QuickServe Logistics',
      description: 'Implemented WhatsApp-based order tracking, delivery notifications, and customer feedback collection — processing 50,000+ messages monthly.',
      tags: ['WhatsApp', 'Automation', 'Logistics'], color: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626 0%, #F87171 100%)',
      challenge: 'QuickServe\'s customers had no real-time visibility into their deliveries, leading to high call volumes and customer frustration.',
      solution: 'We integrated WhatsApp Business API with their logistics system for automated order confirmations, real-time tracking updates, delivery notifications, and instant feedback collection.',
      results: [{ metric: '50K+', label: 'Messages Processed/Month' }, { metric: '75%', label: 'Fewer Support Calls' }, { metric: '4.8★', label: 'Customer Satisfaction' }],
      sortOrder: 4,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`Seeded ${caseStudies.length} case studies`);

  // Seed blog posts
  const blogPosts = [
    {
      slug: 'future-of-ai-in-business', title: 'The Future of AI in Business: Trends to Watch in 2026',
      excerpt: 'Artificial intelligence is reshaping industries at an unprecedented pace. Discover the key AI trends that will define business strategy this year and beyond.',
      content: 'Artificial intelligence is no longer a futuristic concept — it\'s the driving force behind today\'s most successful businesses. From automated customer service to predictive analytics, AI is transforming how companies operate, compete, and grow.\n\nIn 2026, we\'re seeing several groundbreaking trends emerge. Generative AI is moving beyond content creation into complex problem-solving, helping businesses design products, optimize supply chains, and personalize customer experiences at scale.\n\nEdge AI is another major trend, bringing intelligence directly to devices and reducing the need for cloud processing. This means faster decisions, better privacy, and new possibilities for IoT applications.\n\nFor businesses looking to stay competitive, the message is clear: AI adoption isn\'t optional anymore. The companies that invest in AI infrastructure today will be the market leaders of tomorrow.',
      tag: 'Artificial Intelligence', icon: '🤖', readTime: '5 min read', author: 'Sarah Chen', authorRole: 'AI Research Lead', authorInitials: 'SC',
      publishedAt: new Date('2026-02-20'),
    },
    {
      slug: 'cybersecurity-strategy-for-business', title: 'Why Every Business Needs a Cybersecurity Strategy',
      excerpt: 'With cyber threats evolving rapidly, having a robust security strategy isn\'t optional — it\'s essential. Learn how to protect your digital assets effectively.',
      content: 'In an era where data breaches make headlines almost daily, cybersecurity has become one of the most critical aspects of business operations. Yet many organizations still treat security as an afterthought, only investing after an incident occurs.\n\nA proactive cybersecurity strategy encompasses multiple layers of defense. It starts with understanding your threat landscape — what data do you hold, who might want it, and how could they get to it?\n\nZero-trust architecture is becoming the gold standard for modern security. Instead of assuming everything inside your network is safe, zero-trust requires verification for every user and device, regardless of their location.\n\nThe cost of prevention is always lower than the cost of a breach. Investing in cybersecurity today protects not just your data, but your reputation, customer trust, and bottom line.',
      tag: 'Cybersecurity', icon: '🔒', readTime: '4 min read', author: 'James Rivera', authorRole: 'Security Specialist', authorInitials: 'JR',
      publishedAt: new Date('2026-02-10'),
    },
    {
      slug: 'building-scalable-ecommerce', title: 'Building Scalable E-Commerce: Lessons from High-Growth Brands',
      excerpt: 'Scaling an online store requires more than just good products. Explore the technical and strategic foundations that power successful e-commerce platforms.',
      content: 'The difference between an e-commerce store that handles 100 orders a day and one that handles 10,000 isn\'t just about better servers — it\'s about architecture, strategy, and user experience working together.\n\nHigh-growth e-commerce brands share several common traits. First, they build on scalable architecture from day one. This means choosing platforms and technologies that can grow with demand.\n\nPerformance optimization is non-negotiable. Studies show that a one-second delay in page load time can reduce conversions by 7%. Top brands invest heavily in CDNs, image optimization, lazy loading, and caching strategies.\n\nThe brands that get these foundations right are the ones that scale successfully — turning small online stores into industry-leading platforms.',
      tag: 'E-Commerce', icon: '🛒', readTime: '6 min read', author: 'Priya Sharma', authorRole: 'E-Commerce Strategist', authorInitials: 'PS',
      publishedAt: new Date('2026-01-28'),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  // Seed jobs
  const jobs = [
    {
      slug: 'senior-react-developer', title: 'Senior React Developer', type: 'Full-time', location: 'Remote', dept: 'Engineering',
      experience: '5+ years', salary: '$120k – $160k',
      description: 'We are looking for an experienced React developer to lead the development of high-performance web applications for our clients.',
      responsibilities: ['Architect and build complex React applications with modern patterns', 'Lead code reviews and mentor junior developers', 'Collaborate with UI/UX designers to implement responsive interfaces', 'Optimize application performance and ensure cross-browser compatibility', 'Contribute to technical decisions and best practices', 'Write clean, maintainable, and well-tested code'],
      requirements: ['5+ years of experience with React and modern JavaScript', 'Strong proficiency in TypeScript, Next.js, and state management', 'Experience with RESTful APIs and GraphQL', 'Familiarity with CI/CD pipelines and version control (Git)', 'Excellent problem-solving and communication skills', 'Experience with testing frameworks (Jest, React Testing Library)'],
    },
    {
      slug: 'ui-ux-designer', title: 'UI/UX Designer', type: 'Full-time', location: 'Hybrid', dept: 'Design',
      experience: '3+ years', salary: '$90k – $130k',
      description: 'We are seeking a talented UI/UX designer to create beautiful, intuitive interfaces for web and mobile applications.',
      responsibilities: ['Create user flows, wireframes, and high-fidelity prototypes', 'Conduct user research and usability testing', 'Design responsive interfaces for web and mobile platforms', 'Build and maintain a consistent design system', 'Collaborate with developers to ensure design intent is preserved', 'Present design concepts to clients and stakeholders'],
      requirements: ['3+ years of experience in UI/UX design for digital products', 'Proficiency in Figma, Adobe Creative Suite, and prototyping tools', 'Strong portfolio showcasing web and mobile design work', 'Understanding of design systems and component-based design', 'Knowledge of accessibility standards and responsive design', 'Excellent visual design skills with attention to detail'],
    },
    {
      slug: 'digital-marketing-specialist', title: 'Digital Marketing Specialist', type: 'Full-time', location: 'Remote', dept: 'Marketing',
      experience: '3+ years', salary: '$70k – $100k',
      description: 'We are looking for a data-driven digital marketing specialist to develop and execute marketing strategies that drive growth for our clients.',
      responsibilities: ['Plan and execute SEO, SEM, and social media campaigns', 'Analyze campaign performance and provide actionable insights', 'Create compelling content for various digital channels', 'Manage advertising budgets and optimize ROI', 'Conduct market research and competitor analysis', 'Collaborate with design and development teams on landing pages'],
      requirements: ['3+ years of experience in digital marketing', 'Proficiency in Google Analytics, Google Ads, and Meta Ads Manager', 'Strong understanding of SEO, content marketing, and email marketing', 'Experience with marketing automation tools', 'Excellent analytical and data interpretation skills', 'Strong written and verbal communication skills'],
    },
    {
      slug: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', type: 'Full-time', location: 'On-site', dept: 'Security',
      experience: '4+ years', salary: '$110k – $150k',
      description: 'We are seeking a skilled cybersecurity analyst to help protect our clients\' digital assets.',
      responsibilities: ['Conduct vulnerability assessments and penetration testing', 'Monitor security systems and investigate incidents', 'Develop and implement security policies and procedures', 'Perform security audits and compliance assessments', 'Provide security awareness training to client teams', 'Stay current with emerging threats and security technologies'],
      requirements: ['4+ years of experience in cybersecurity or information security', 'Relevant certifications (CISSP, CEH, CompTIA Security+)', 'Experience with SIEM tools, firewalls, and IDS/IPS systems', 'Knowledge of compliance frameworks (SOC 2, ISO 27001, GDPR)', 'Strong analytical and incident response skills', 'Excellent documentation and communication abilities'],
    },
    {
      slug: 'devops-engineer', title: 'DevOps Engineer', type: 'Contract', location: 'Remote', dept: 'Engineering',
      experience: '4+ years', salary: '$100k – $140k',
      description: 'We are looking for an experienced DevOps engineer to design, build, and maintain our cloud infrastructure and CI/CD pipelines.',
      responsibilities: ['Design and manage cloud infrastructure on AWS/GCP/Azure', 'Build and maintain CI/CD pipelines for automated deployments', 'Implement infrastructure as code using Terraform or Pulumi', 'Monitor system performance and implement alerting solutions', 'Ensure security best practices across all infrastructure', 'Optimize costs and resource utilization in cloud environments'],
      requirements: ['4+ years of experience in DevOps or cloud engineering', 'Strong proficiency with AWS, Docker, and Kubernetes', 'Experience with CI/CD tools (GitHub Actions, Jenkins, GitLab CI)', 'Knowledge of infrastructure as code (Terraform, CloudFormation)', 'Familiarity with monitoring tools (Prometheus, Grafana, Datadog)', 'Strong scripting skills (Bash, Python)'],
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    });
  }
  console.log(`Seeded ${jobs.length} jobs`);

  // Seed FAQs
  const faqs = [
    { category: 'General', categoryIcon: '💡', question: 'What services does Havos offer?', answer: 'Havos provides a comprehensive range of digital services including web and app development, digital marketing, cybersecurity, IT consulting, AI automation, e-commerce solutions, WhatsApp automation, and custom LMS development.', sortOrder: 0 },
    { category: 'General', categoryIcon: '💡', question: 'How long does a typical project take?', answer: 'Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during the discovery phase.', sortOrder: 1 },
    { category: 'General', categoryIcon: '💡', question: 'Do you work with international clients?', answer: 'Yes! We serve clients globally and have experience working across different time zones. Our team is equipped to handle remote collaboration effectively.', sortOrder: 2 },
    { category: 'Technical', categoryIcon: '⚙️', question: 'What technologies do you use?', answer: 'We use modern technologies including React, Next.js, Node.js, Python, AWS, and more. Our tech stack is chosen based on project requirements to ensure the best performance and scalability.', sortOrder: 3 },
    { category: 'Technical', categoryIcon: '⚙️', question: 'Do you provide ongoing maintenance and support?', answer: 'Yes, we offer comprehensive maintenance and support packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements to keep your application running smoothly.', sortOrder: 4 },
    { category: 'Technical', categoryIcon: '⚙️', question: 'Can you integrate with existing systems?', answer: 'Absolutely. We have extensive experience integrating with various APIs, databases, CRMs, payment gateways, and third-party services. We ensure seamless data flow between systems.', sortOrder: 5 },
    { category: 'Pricing & Support', categoryIcon: '💰', question: 'How does your pricing work?', answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. After understanding your requirements, we provide a detailed proposal with transparent pricing.', sortOrder: 6 },
    { category: 'Pricing & Support', categoryIcon: '💰', question: 'What is your payment structure?', answer: 'Typically, we work with a milestone-based payment structure. An initial deposit is required to begin work, with subsequent payments tied to project milestones and deliverables.', sortOrder: 7 },
    { category: 'Pricing & Support', categoryIcon: '💰', question: 'Do you offer free consultations?', answer: 'Yes, we offer a free initial consultation to understand your project requirements, discuss potential solutions, and provide a preliminary estimate. Contact us to schedule yours.', sortOrder: 8 },
  ];

  for (let i = 0; i < faqs.length; i++) {
    await prisma.fAQ.create({ data: faqs[i] });
  }
  console.log(`Seeded ${faqs.length} FAQs`);

  // Seed testimonials
  const testimonials = [
    { text: 'Havos transformed our online presence completely. Their team delivered a stunning e-commerce platform that exceeded our expectations and boosted our sales by 45%.', author: 'Michael Torres', role: 'CEO, RetailMax', rating: 5, project: 'E-Commerce Platform', isFeatured: true, sortOrder: 0 },
    { text: 'The AI chatbot solution they built handles 70% of our customer queries automatically. Our support costs dropped by 40% and customer satisfaction actually improved.', author: 'Lisa Wang', role: 'CTO, TechFlow Solutions', rating: 5, project: 'AI Customer Support', isFeatured: true, sortOrder: 1 },
    { text: 'Working with Havos on our healthcare platform was exceptional. They understood HIPAA requirements deeply and delivered a secure, scalable solution on time.', author: 'Dr. Sarah Mitchell', role: 'Director, MedConnect', rating: 5, project: 'Healthcare Platform', isFeatured: true, sortOrder: 2 },
    { text: 'Our custom LMS now serves over 10,000 learners across 5 countries. The platform is intuitive, scalable, and exactly what we needed to grow our academy.', author: 'Raj Patel', role: 'Founder, EduGrowth Academy', rating: 5, project: 'Learning Platform', isFeatured: false, sortOrder: 3 },
    { text: 'The WhatsApp automation system processes 50,000+ messages monthly for us. It\'s reduced support calls by 75% and our customers love the real-time tracking updates.', author: 'Carlos Mendez', role: 'Operations Head, QuickServe', rating: 5, project: 'WhatsApp Automation', isFeatured: false, sortOrder: 4 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`Seeded ${testimonials.length} testimonials`);

  // Seed settings
  const settings = [
    { settingKey: 'site_name', settingValue: 'Havos' },
    { settingKey: 'contact_email', settingValue: 'hello@havos.com' },
    { settingKey: 'contact_phone', settingValue: '+1 (555) 123-4567' },
    { settingKey: 'contact_location', settingValue: 'Global — Remote First' },
    { settingKey: 'social_linkedin', settingValue: 'https://linkedin.com/company/havos' },
    { settingKey: 'social_twitter', settingValue: 'https://twitter.com/havos' },
    { settingKey: 'social_instagram', settingValue: 'https://instagram.com/havos' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { settingKey: s.settingKey },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded ${settings.length} settings`);

  // Seed page content
  const pageContents = [
    {
      pageSlug: 'home',
      sections: {
        heroEyebrow: 'Experience The Best IT Solutions',
        heroTitle: 'Where Creativity Meets Cutting-Edge Technology',
        heroTitleAccent: 'Cutting-Edge',
        heroDescription: 'We help businesses transform through cutting-edge technology, strategic design, and data-driven solutions that drive real growth.',
        heroPrimaryCta: 'Explore More',
        heroSecondaryCta: 'View All Services',
        aboutSectionChip: 'About Us',
        aboutSectionTitle: 'Transforming Ideas into Digital Reality',
        aboutSectionTitleAccent: 'Ideas',
        aboutSectionDescription: 'We are a team of passionate developers, designers, and strategists dedicated to helping businesses thrive in the digital age. With expertise spanning web development, AI, cybersecurity, and digital marketing, we deliver solutions that make an impact.',
        aboutStats: [
          { value: 150, suffix: '+', label: 'Team Members' },
          { value: 2000, suffix: '+', label: 'Happy Clients' },
          { value: 99, suffix: '%', label: 'Client Satisfaction' },
        ],
        servicesSectionChip: 'Our Services',
        servicesSectionTitle: 'What We Do Best',
        servicesSectionTitleAccent: 'Do Best',
        servicesSectionDescription: 'End-to-end digital services designed to accelerate your growth.',
        processSectionChip: 'How We Work',
        processSectionTitle: 'Our Process',
        processSectionTitleAccent: 'Process',
        processSteps: [
          { num: '01', title: 'Discovery', desc: 'We deep-dive into your business, users, and goals to define the perfect strategy.', icon: '🔍' },
          { num: '02', title: 'Design', desc: 'Pixel-perfect wireframes and prototypes crafted for maximum user engagement.', icon: '🎨' },
          { num: '03', title: 'Develop', desc: 'Clean, scalable code built with modern tech stacks and best practices.', icon: '⚙️' },
          { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and continuous optimization for growth.', icon: '🚀' },
        ],
        caseStudiesSectionChip: 'Our Work',
        caseStudiesSectionTitle: 'Featured Case Studies',
        caseStudiesSectionTitleAccent: 'Case Studies',
        testimonialsSectionChip: 'Testimonials',
        testimonialsSectionTitle: 'What Our Clients Say',
        testimonialsSectionTitleAccent: 'Say',
        clientsSectionChip: 'Our Clients',
        clientsSectionTitle: 'Trusted by Leading Brands',
        clientsSectionDescription: "We've partnered with innovative companies across industries to deliver impactful digital solutions.",
        ctaEyebrow: "Let's Work Together",
        ctaTitle: 'Ready to Build Something Great?',
        ctaTitleAccent: 'Something Great?',
        ctaDescription: 'Partner with us to transform your ideas into powerful digital solutions that drive real business growth.',
        ctaPrimaryCta: 'Start Your Project',
        ctaEmail: 'hello@havos.com',
        ctaTrustStats: [
          { num: '50+', label: 'Projects Delivered' },
          { num: '2,000+', label: 'Happy Clients' },
          { num: '98%', label: 'Client Satisfaction' },
          { num: '24/7', label: 'Support Available' },
        ],
      },
    },
    {
      pageSlug: 'about',
      sections: {
        heroEyebrow: 'About Havos',
        heroTitle: 'We Build Digital Excellence',
        heroTitleAccent: 'Digital Excellence',
        heroDescription: 'A team of passionate developers, designers, and strategists dedicated to helping businesses thrive in the digital age.',
        whoWeAreChip: 'Who We Are',
        whoWeAreTitle: 'Transforming Ideas into Digital Reality',
        whoWeAreTitleAccent: 'Ideas',
        whoWeAreText1: 'Havos is a digital transformation and IT services company dedicated to helping businesses grow through technology. We combine strategic thinking with technical expertise to deliver solutions that make a real impact.',
        whoWeAreText2: 'With expertise spanning web development, AI, cybersecurity, and digital marketing, we deliver comprehensive solutions that address the full spectrum of digital challenges.',
        stats: [
          { value: 50, suffix: '+', label: 'Projects Delivered' },
          { value: 2000, suffix: '+', label: 'Happy Clients' },
          { value: 98, suffix: '%', label: 'Client Satisfaction' },
          { value: 24, suffix: '/7', label: 'Support Available' },
        ],
        missionChip: 'Our Mission',
        missionTitle: 'Empowering Businesses with Technology',
        missionTitleAccent: 'Technology',
        missionDescription: 'To empower businesses of all sizes with innovative digital solutions that drive growth, improve efficiency, and create meaningful connections with their customers.',
        values: [
          { icon: '💡', title: 'Innovation', desc: 'We embrace cutting-edge technologies to deliver modern, future-proof solutions.' },
          { icon: '✨', title: 'Quality', desc: 'Every line of code, every pixel — crafted with precision and attention to detail.' },
          { icon: '🤝', title: 'Transparency', desc: 'Open communication and honest collaboration throughout every project.' },
          { icon: '📈', title: 'Results', desc: "We measure success by the impact we create for our clients' businesses." },
        ],
        processChip: 'How We Work',
        processTitle: 'Our Process',
        processTitleAccent: 'Process',
        processSteps: [
          { num: '01', title: 'Discovery', desc: 'We deep-dive into your business, users, and goals to define the perfect strategy.', icon: '🔍' },
          { num: '02', title: 'Design', desc: 'Pixel-perfect wireframes and prototypes crafted for maximum user engagement.', icon: '🎨' },
          { num: '03', title: 'Develop', desc: 'Clean, scalable code built with modern tech stacks and best practices.', icon: '⚙️' },
          { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and continuous optimization for growth.', icon: '🚀' },
        ],
        teamChip: 'Our Team',
        teamTitle: 'Meet the Experts',
        teamTitleAccent: 'Experts',
        teamDescription: 'Talented professionals who bring your vision to life.',
        ctaTitle: 'Ready to work with us?',
        ctaDescription: "Let's discuss how we can help transform your business with our digital expertise.",
        ctaButtonText: 'Get in Touch',
      },
    },
    {
      pageSlug: 'services',
      sections: {
        heroEyebrow: 'Our Services',
        heroTitle: 'What We Do Best',
        heroTitleAccent: 'Do Best',
        heroDescription: 'From web development to AI automation, we offer a comprehensive suite of digital services tailored to your business needs.',
        ctaTitle: 'Not sure which service you need?',
        ctaDescription: "Let's chat about your project and we'll recommend the best solution for your business.",
        ctaButtonText: 'Talk to Us',
      },
    },
    {
      pageSlug: 'careers',
      sections: {
        heroEyebrow: 'Careers',
        heroTitle: 'Join Our Team',
        heroTitleAccent: 'Team',
        heroDescription: "We're looking for talented people who want to build the future of digital technology.",
        perksChip: 'Why Havos',
        perksSectionTitle: "Why You'll Love It Here",
        perksSectionTitleAccent: 'Love It Here',
        perks: [
          { icon: '🌍', title: 'Remote First', desc: 'Work from anywhere in the world with flexible hours.' },
          { icon: '📈', title: 'Growth', desc: 'Learning budget, conferences, and career advancement paths.' },
          { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading compensation and performance bonuses.' },
          { icon: '🏥', title: 'Benefits', desc: 'Health insurance, paid time off, and wellness programs.' },
        ],
        openPositionsChip: 'Open Positions',
        openPositionsSectionTitle: 'Current Openings',
        openPositionsSectionTitleAccent: 'Openings',
        ctaNoteText: "Don't see a role that fits? We're always looking for great talent.",
        ctaButtonText: 'Send Your Resume',
        ctaEmail: 'careers@havos.com',
      },
    },
    {
      pageSlug: 'contact',
      sections: {
        heroEyebrow: 'Contact Us',
        heroTitle: 'Get in Touch',
        heroTitleAccent: 'Touch',
        heroDescription: "Have a project in mind? We'd love to hear about it. Reach out and let's start building.",
        infoTitle: "Let's discuss your project",
        infoDescription: 'Fill out the form and our team will get back to you within 24 hours.',
        contactEmail: 'hello@havos.com',
        contactPhone: '+1 (555) 123-4567',
        contactLocation: 'Global — Remote First',
        formTitle: 'Send us a message',
        formSubmitText: 'Send Message',
      },
    },
    {
      pageSlug: 'case-studies',
      sections: {
        heroEyebrow: 'Our Work',
        heroTitle: 'Case Studies',
        heroTitleAccent: 'Studies',
        heroDescription: "Real projects, real results. See how we've helped businesses transform through technology.",
        heroStats: [
          { value: '50+', label: 'Projects Delivered' },
          { value: '98%', label: 'Client Satisfaction' },
          { value: '12+', label: 'Industries Served' },
        ],
        ctaTitle: 'Have a project in mind?',
        ctaDescription: "Let's discuss how we can deliver similar results for your business.",
        ctaButtonText: 'Start Your Project',
      },
    },
    {
      pageSlug: 'blog',
      sections: {
        heroEyebrow: 'Our Blog',
        heroTitle: 'Insights & Updates',
        heroTitleAccent: 'Updates',
        heroDescription: 'Thoughts on technology, business, and the future of digital transformation.',
        allPostsChip: 'Latest Articles',
        allPostsSectionTitle: 'More Reading',
        allPostsSectionTitleAccent: 'Reading',
      },
    },
    {
      pageSlug: 'testimonials',
      sections: {
        heroEyebrow: 'Testimonials',
        heroTitle: 'What Our Clients Say',
        heroTitleAccent: 'Say',
        heroDescription: "Real feedback from real clients. See how we've helped businesses grow through digital transformation.",
        stats: [
          { number: '98%', label: 'Client Satisfaction' },
          { number: '50+', label: 'Projects Delivered' },
          { number: '4.9', label: 'Average Rating' },
          { number: '95%', label: 'Client Retention' },
        ],
        gridChip: 'Client Stories',
        gridSectionTitle: 'Trusted by Industry Leaders',
        gridSectionTitleAccent: 'Industry Leaders',
        ctaTitle: 'Ready to join our success stories?',
        ctaDescription: "Let's discuss how we can help transform your business with the right digital solutions.",
        ctaButtonText: 'Start Your Project',
      },
    },
  ];

  for (const pc of pageContents) {
    await prisma.pageContent.upsert({
      where: { pageSlug: pc.pageSlug },
      update: { sections: pc.sections },
      create: pc,
    });
  }
  console.log(`Seeded ${pageContents.length} page contents`);

  // Seed legal pages
  const legalPages = [
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      sections: [
        { title: 'Information We Collect', content: ['We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us via email or phone. This may include your name, email address, company name, phone number, and project details.', 'We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, pages visited, and referring URL. This data is collected through cookies and similar tracking technologies.'] },
        { title: 'How We Use Your Information', content: ['We use the information we collect to:'], list: ['Respond to your inquiries and provide our services', 'Send you updates, newsletters, and marketing communications (with your consent)', 'Improve our website experience and service offerings', 'Analyze website traffic and usage patterns', 'Comply with legal obligations and protect our rights'], footer: 'We do not sell your personal information to third parties.' },
        { title: 'Data Security', content: ['We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments.', 'However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.'] },
        { title: 'Cookies & Tracking', content: ['Our website uses cookies and similar tracking technologies to enhance your browsing experience.'], list: ['Essential cookies: Required for the website to function properly', 'Analytics cookies: Help us understand how visitors interact with our site', 'Marketing cookies: Used to deliver relevant advertisements'], footer: 'You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.' },
        { title: 'Third-Party Services', content: ['We may use third-party services (such as Google Analytics, hosting providers, and email platforms) that collect, monitor, and analyze data to improve our service.', 'We may also include links to third-party websites. We are not responsible for the privacy practices of these external sites.'] },
        { title: 'Data Retention', content: ['We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we securely delete or anonymize it.'] },
        { title: 'Your Rights', content: ['Depending on your jurisdiction, you may have the right to:'], list: ['Access the personal data we hold about you', 'Request correction of inaccurate information', 'Request deletion of your personal data', 'Object to or restrict the processing of your data', 'Request data portability', 'Withdraw consent at any time'], footer: 'To exercise any of these rights, please contact us at hello@havos.com.' },
        { title: 'Changes to This Policy', content: ['We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website with a new effective date.'] },
        { title: 'Contact Us', content: ['If you have any questions about this Privacy Policy or our data practices, please contact us:'], list: ['Email: hello@havos.com', 'Phone: +1 (234) 567-890'] },
      ],
    },
    {
      slug: 'terms',
      title: 'Terms of Service',
      sections: [
        { title: 'Acceptance of Terms', content: ['By accessing and using the Havos website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.', 'We reserve the right to modify these terms at any time. Continued use of our services after changes are posted constitutes your acceptance of the revised terms.'] },
        { title: 'Services', content: ['Havos provides digital transformation and IT services including web development, digital marketing, cybersecurity, IT consulting, AI automation, e-commerce solutions, and related technology services.', 'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.'] },
        { title: 'Client Obligations', content: ['As a client, you agree to:'], list: ['Provide accurate and complete information required for project execution', 'Respond to communications and approve deliverables in a timely manner', 'Ensure you have the rights to any content, materials, or data you provide to us', 'Not use our services for any unlawful or unauthorized purpose', 'Maintain the confidentiality of any login credentials or access we provide'] },
        { title: 'Intellectual Property', content: ['All content on this website, including text, graphics, logos, images, and software, is the property of Havos and is protected by applicable intellectual property laws.', 'Upon full payment as specified in the project agreement, clients receive ownership rights to custom deliverables created specifically for their project.'] },
        { title: 'Payment Terms', content: ['Payment terms are defined in individual project proposals and contracts. Unless otherwise specified:'], list: ['An initial deposit is required before work begins', 'Milestone payments are due upon completion of agreed-upon project phases', 'Final payment is due upon project delivery and acceptance', 'Late payments may incur interest at a rate of 1.5% per month', 'All prices are exclusive of applicable taxes unless stated otherwise'] },
        { title: 'Project Changes & Scope', content: ['Any changes to the agreed project scope must be documented in a change order signed by both parties. Additional work outside the original scope may result in additional charges and timeline adjustments.'] },
        { title: 'Confidentiality', content: ['Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement. This obligation survives the termination of the service agreement.'] },
        { title: 'Limitation of Liability', content: ['Havos shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services.', 'Our total liability for any claim related to our services shall not exceed the total amount paid by the client for the specific service in question during the twelve (12) months preceding the claim.'] },
        { title: 'Termination', content: ['Either party may terminate a service agreement with 30 days written notice. Upon termination:'], list: ['The client is responsible for payment of all work completed up to the termination date', 'Any pre-paid amounts for undelivered work will be refunded on a pro-rata basis', 'Havos will provide all completed deliverables and project files', 'Confidentiality obligations continue to apply after termination'] },
        { title: 'Governing Law', content: ['These Terms of Service shall be governed by and construed in accordance with the laws of the applicable jurisdiction. Any disputes arising under these terms shall be resolved through good-faith negotiation, and if necessary, binding arbitration.'] },
        { title: 'Contact', content: ['For questions about these Terms of Service, please contact us:'], list: ['Email: hello@havos.com', 'Phone: +1 (234) 567-890'] },
      ],
    },
  ];

  for (const lp of legalPages) {
    await prisma.legalPage.upsert({
      where: { slug: lp.slug },
      update: { title: lp.title, sections: lp.sections },
      create: lp,
    });
  }
  console.log(`Seeded ${legalPages.length} legal pages`);

  // Seed navigation
  const navigations = [
    {
      type: 'navbar',
      items: [
        { label: 'Work', href: '/case-studies' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services', hasDropdown: true },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      type: 'footer',
      items: {
        services: [
          { label: 'Web Development', href: '/services/web-app-development' },
          { label: 'Digital Marketing', href: '/services/digital-marketing' },
          { label: 'Cybersecurity', href: '/services/cybersecurity' },
          { label: 'AI Automation', href: '/services/ai-automation' },
        ],
        solutions: [
          { label: 'E-Commerce', href: '/services/ecommerce' },
          { label: 'WhatsApp Automation', href: '/services/whatsapp-automation' },
          { label: 'Custom LMS', href: '/services/custom-lms' },
          { label: 'IT Consulting', href: '/services/it-consulting' },
        ],
        company: [
          { label: 'About Us', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Contact', href: '/contact' },
        ],
        resources: [
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    },
  ];

  for (const nav of navigations) {
    await prisma.navigation.upsert({
      where: { type: nav.type },
      update: { items: nav.items },
      create: nav,
    });
  }
  console.log(`Seeded ${navigations.length} navigations`);

  // Seed client logos
  const clients = [
    'TechCorp', 'InnovateLab', 'CloudNine', 'DataFlow', 'CyberShield',
    'GrowthHub', 'NetSphere', 'QuantumEdge',
  ];
  for (let i = 0; i < clients.length; i++) {
    await prisma.clientLogo.create({
      data: { name: clients[i], sortOrder: i },
    });
  }
  console.log(`Seeded ${clients.length} client logos`);

  console.log('Seeding complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

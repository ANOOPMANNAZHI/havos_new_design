export const caseStudies = [
  {
    number: "01",
    title: "E-Commerce Platform Redesign",
    client: "RetailMax",
    description:
      "Complete redesign and development of a high-traffic e-commerce platform, resulting in a 45% increase in conversion rates and 60% faster page loads.",
    tags: ["E-Commerce", "UI/UX", "Performance"],
    color: "#2B5CFF",
    gradient: "linear-gradient(135deg, #2B5CFF 0%, #6B8CFF 100%)",
    challenge: "RetailMax's existing platform was built on legacy technology, causing slow load times, poor mobile experience, and declining conversion rates in an increasingly competitive market.",
    solution: "We rebuilt the entire platform using React and Next.js with a headless CMS, implemented server-side rendering for SEO, and designed a mobile-first checkout flow optimized for conversions.",
    results: [
      { metric: '45%', label: 'Increase in Conversions' },
      { metric: '60%', label: 'Faster Page Loads' },
      { metric: '3x', label: 'Mobile Revenue Growth' },
    ],
  },
  {
    number: "02",
    title: "AI-Powered Customer Support",
    client: "TechFlow Solutions",
    description:
      "Built an intelligent chatbot system that handles 70% of customer queries automatically, reducing support costs by 40% while improving response times.",
    tags: ["AI", "Automation", "Chatbot"],
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    challenge: "TechFlow's support team was overwhelmed with repetitive queries, leading to long wait times and high operational costs. Customer satisfaction scores were dropping quarter over quarter.",
    solution: "We designed and trained a custom AI chatbot using NLP models fine-tuned on TechFlow's knowledge base, with seamless handoff to human agents for complex issues.",
    results: [
      { metric: '70%', label: 'Queries Auto-Resolved' },
      { metric: '40%', label: 'Cost Reduction' },
      { metric: '< 5s', label: 'Average Response Time' },
    ],
  },
  {
    number: "03",
    title: "Healthcare Data Platform",
    client: "MedConnect",
    description:
      "Developed a HIPAA-compliant data platform for managing patient records, appointments, and telemedicine sessions with end-to-end encryption.",
    tags: ["Healthcare", "Security", "Cloud"],
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #34D399 100%)",
    challenge: "MedConnect needed a unified platform to manage patient data across multiple clinics while maintaining strict HIPAA compliance and enabling secure telemedicine capabilities.",
    solution: "We built a cloud-native platform on AWS with end-to-end encryption, role-based access controls, integrated video conferencing, and automated compliance monitoring.",
    results: [
      { metric: '100%', label: 'HIPAA Compliance' },
      { metric: '50K+', label: 'Patient Records Managed' },
      { metric: '99.9%', label: 'Platform Uptime' },
    ],
  },
  {
    number: "04",
    title: "Corporate Learning Portal",
    client: "EduGrowth Academy",
    description:
      "Custom LMS with interactive course builder, live video integration, and automated certification — serving 10,000+ learners across 5 countries.",
    tags: ["LMS", "Education", "Video"],
    color: "#D97706",
    gradient: "linear-gradient(135deg, #D97706 0%, #FBBF24 100%)",
    challenge: "EduGrowth was using multiple disconnected tools for content delivery, assessments, and certification. They needed a single platform to scale across countries and languages.",
    solution: "We developed a custom LMS with drag-and-drop course builder, real-time video streaming, multi-language support, automated grading, and digital certificate generation.",
    results: [
      { metric: '10K+', label: 'Active Learners' },
      { metric: '5', label: 'Countries Served' },
      { metric: '92%', label: 'Course Completion Rate' },
    ],
  },
  {
    number: "05",
    title: "WhatsApp Business Automation",
    client: "QuickServe Logistics",
    description:
      "Implemented WhatsApp-based order tracking, delivery notifications, and customer feedback collection — processing 50,000+ messages monthly.",
    tags: ["WhatsApp", "Automation", "Logistics"],
    color: "#DC2626",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F87171 100%)",
    challenge: "QuickServe's customers had no real-time visibility into their deliveries, leading to high call volumes and customer frustration. Their support team was spending most of their time on status updates.",
    solution: "We integrated WhatsApp Business API with their logistics system for automated order confirmations, real-time tracking updates, delivery notifications, and instant feedback collection.",
    results: [
      { metric: '50K+', label: 'Messages Processed/Month' },
      { metric: '75%', label: 'Fewer Support Calls' },
      { metric: '4.8★', label: 'Customer Satisfaction' },
    ],
  },
];

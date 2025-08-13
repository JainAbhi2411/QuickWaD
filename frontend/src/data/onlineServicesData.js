const onlineServices = [
  {
    id: 1,
    name: 'Online Consultation',
    icon: '💻',
    price: 25,
    duration: '30 min',
    rating: 4.9,
    description: 'Expert advice and consultation via video call',
    features: ['Video Call', 'Screen Sharing', 'Digital Reports'],
    badge: 'Popular',
    addons: [
      { id: 1, name: 'Extended Consultation', price: 15, description: 'Add 30 minutes to the consultation' },
      { id: 2, name: 'Recording of Session', price: 10, description: 'Get the session recorded for future reference' },
    ]
  },
  {
    id: 2,
    name: 'Virtual Interior Design',
    icon: '🏡',
    price: 150,
    duration: '2 hours',
    rating: 4.8,
    description: 'Design your space virtually with 3D visualization',
    features: ['3D Mockups', 'Color Schemes', 'Furniture Plans'],
    badge: 'Premium',
    addons: [
      { id: 1, name: 'Additional 3D Mockups', price: 50, description: 'Add more 3D mockups for your design' },
      { id: 2, name: 'Furniture Sourcing', price: 100, description: 'Get recommendations for furniture and decor' },
    ]
  },
  {
    id: 3,
    name: 'Online Tutoring',
    icon: '📚',
    price: 40,
    duration: '1 hour',
    rating: 4.9,
    description: 'Professional tutoring sessions online',
    features: ['Live Sessions', 'Study Materials', 'Progress Tracking'],
    addons: [
      { id: 1, name: 'Additional Study Materials', price: 20, description: 'Get extra study resources' },
      { id: 2, name: 'Progress Report', price: 10, description: 'Receive a detailed progress report after each session' },
    ]
  },
  {
    id: 4,
    name: 'Digital Marketing',
    icon: '📱',
    price: 200,
    duration: '1 week',
    rating: 4.7,
    description: 'Boost your business with digital marketing strategies',
    features: ['SEO Optimization', 'Social Media', 'Analytics'],
    badge: 'Business',
    addons: [
      { id: 1, name: 'Social Media Ads', price: 100, description: 'Add social media ad management to your campaign' },
      { id: 2, name: 'Additional SEO Reports', price: 50, description: 'Get weekly SEO performance reports' },
    ]
  },
  {
    id: 5,
    name: 'Online Fitness Training',
    icon: '💪',
    price: 60,
    duration: '45 min',
    rating: 4.8,
    description: 'Personal fitness training sessions via video',
    features: ['Custom Workouts', 'Nutrition Plans', 'Progress Tracking'],
    addons: [
      { id: 1, name: 'Personalized Nutrition Plan', price: 30, description: 'Get a tailored nutrition plan to complement your workouts' },
      { id: 2, name: 'Extended Session', price: 20, description: 'Add an extra 30 minutes to your workout session' },
    ]
  },
  {
    id: 6,
    name: 'Web Development',
    icon: '💻',
    price: 500,
    duration: '1-2 weeks',
    rating: 4.9,
    description: 'Professional website development services',
    features: ['Responsive Design', 'SEO Ready', 'Mobile Optimized'],
    badge: 'Tech',
    addons: [
      { id: 1, name: 'E-commerce Integration', price: 200, description: 'Add e-commerce functionality to your website' },
      { id: 2, name: 'SEO Optimization', price: 100, description: 'Get your site fully optimized for search engines' },
    ]
  },
  {
    id: 7,
    name: 'Online Language Classes',
    icon: '🗣️',
    price: 35,
    duration: '1 hour',
    rating: 4.8,
    description: 'Learn new languages with native speakers',
    features: ['Native Speakers', 'Interactive Lessons', 'Cultural Context'],
    addons: [
      { id: 1, name: 'Additional Language Level', price: 25, description: 'Move to the next level with additional sessions' },
      { id: 2, name: 'Certificate of Completion', price: 10, description: 'Receive a certificate after completing the course' },
    ]
  },
  {
    id: 8,
    name: 'Graphic Design',
    icon: '🎨',
    price: 120,
    duration: '2-3 days',
    rating: 4.9,
    description: 'Professional graphic design for your brand',
    features: ['Logo Design', 'Brand Identity', 'Print Materials'],
    badge: 'Creative',
    addons: [
      { id: 1, name: 'Brand Guidelines', price: 50, description: 'Receive a detailed brand guidelines document' },
      { id: 2, name: 'Extra Revisions', price: 40, description: 'Get additional revisions on your design work' },
    ]
  },
  {
    id: 9,
    name: 'Virtual Personal Shopping',
    icon: '🛍️',
    price: 75,
    duration: '1 hour',
    rating: 4.7,
    description: 'Personalized shopping experience tailored to your style and preferences',
    features: ['Personal Stylist', 'Online Store Recommendations', 'Outfit Planning'],
    badge: 'Luxury',
    addons: [
      { id: 1, name: 'Additional Styling Session', price: 40, description: 'Get an extra 30 minutes of styling advice' },
      { id: 2, name: 'Shopping List', price: 20, description: 'Get a detailed list of recommended products' },
    ]
  },
  {
    id: 10,
    name: 'Legal Consultation',
    icon: '⚖️',
    price: 150,
    duration: '1 hour',
    rating: 4.8,
    description: 'Get expert legal advice and consultation for your needs',
    features: ['Contract Review', 'Legal Advice', 'Document Drafting'],
    badge: 'Professional',
    addons: [
      { id: 1, name: 'Additional Consultation', price: 75, description: 'Get an additional 30-minute consultation' },
      { id: 2, name: 'Document Filing', price: 50, description: 'Help with filing legal documents' },
    ]
  },
  {
    id: 11,
    name: 'Career Coaching',
    icon: '💼',
    price: 100,
    duration: '1 hour',
    rating: 4.9,
    description: 'Personalized career guidance to help you achieve your professional goals',
    features: ['Resume Review', 'Interview Coaching', 'Job Search Strategies'],
    badge: 'Personal Growth',
    addons: [
      { id: 1, name: 'Resume Writing', price: 50, description: 'Get a professionally written resume' },
      { id: 2, name: 'LinkedIn Profile Review', price: 30, description: 'Review and optimize your LinkedIn profile' },
    ]
  },
  {
    id: 12,
    name: 'Online Meditation Sessions',
    icon: '🧘‍♀️',
    price: 30,
    duration: '30 min',
    rating: 4.8,
    description: 'Guided meditation to reduce stress and improve mindfulness',
    features: ['Guided Meditation', 'Breathing Exercises', 'Mindfulness Techniques'],
    badge: 'Wellness',
    addons: [
      { id: 1, name: 'Extended Session', price: 20, description: 'Add 30 minutes to your meditation session' },
      { id: 2, name: 'Personalized Meditation Plan', price: 40, description: 'Receive a custom meditation plan for your needs' },
    ]
  },
  {
    id: 13,
    name: 'Custom Software Development',
    icon: '🖥️',
    price: 1000,
    duration: '3-4 weeks',
    rating: 4.9,
    description: 'Develop custom software solutions tailored to your business needs',
    features: ['Custom Solutions', 'Integration', 'Scalable Systems'],
    badge: 'Tech',
    addons: [
      { id: 1, name: 'Cloud Integration', price: 300, description: 'Integrate your software with cloud services' },
      { id: 2, name: 'Mobile App Development', price: 500, description: 'Develop a mobile app to complement your software' },
    ]
  },
  {
    id: 14,
    name: 'Social Media Management',
    icon: '📱',
    price: 250,
    duration: '1 month',
    rating: 4.7,
    description: 'Expert management of your social media presence to boost engagement',
    features: ['Content Creation', 'Analytics', 'Strategy Development'],
    badge: 'Business',
    addons: [
      { id: 1, name: 'Social Media Ads', price: 100, description: 'Add social media ad management to your campaign' },
      { id: 2, name: 'Extra Post Creation', price: 50, description: 'Create additional posts per week for your profile' },
    ]
  },
  {
    id: 15,
    name: 'Online Music Lessons',
    icon: '🎶',
    price: 40,
    duration: '1 hour',
    rating: 4.8,
    description: 'Learn music theory or instruments from professional tutors',
    features: ['Live Lessons', 'Music Theory', 'Instrument Tutorials'],
    badge: 'Creative',
    addons: [
      { id: 1, name: 'Extra Instrument Lesson', price: 30, description: 'Add a lesson for another instrument' },
      { id: 2, name: 'Personalized Lesson Plan', price: 50, description: 'Get a custom lesson plan for your music goals' },
    ]
  },
  {
    id: 16,
    name: 'Virtual Reality Experiences',
    icon: '🕶️',
    price: 80,
    duration: '1 hour',
    rating: 4.9,
    description: 'Experience immersive virtual reality experiences in various genres',
    features: ['VR Experiences', 'Interactive Environments', 'Immersive Content'],
    badge: 'Entertainment',
    addons: [
      { id: 1, name: 'Extra VR Session', price: 50, description: 'Add another hour to your VR experience' },
      { id: 2, name: 'Exclusive VR Content', price: 100, description: 'Access exclusive VR worlds and content' },
    ]
  },
  {
    id: 17,
    name: 'Photography Editing Services',
    icon: '📸',
    price: 50,
    duration: '1-2 days',
    rating: 4.7,
    description: 'Professional photo editing to enhance your images',
    features: ['Color Correction', 'Background Removal', 'Retouching'],
    badge: 'Creative',
    addons: [
      { id: 1, name: 'Additional Photo Editing', price: 30, description: 'Edit more photos in the same session' },
      { id: 2, name: 'Extended Editing Session', price: 40, description: 'Get extra time to refine your photos' },
    ]
  },
  {
    id: 18,
    name: 'Event Planning Services',
    icon: '🎉',
    price: 300,
    duration: '2-3 weeks',
    rating: 4.8,
    description: 'Plan and organize your events with expert help',
    features: ['Event Coordination', 'Venue Sourcing', 'Vendor Management'],
    badge: 'Luxury',
    addons: [
      { id: 1, name: 'Additional Event Day', price: 200, description: 'Add another day to your event for more activities' },
      { id: 2, name: 'Photography & Videography', price: 400, description: 'Hire a photographer and videographer for the event' },
    ]
  }
];

export default onlineServices;
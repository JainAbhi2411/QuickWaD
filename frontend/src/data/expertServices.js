const expertServices = [
  {
    id: 1,
    name: 'Choreographer',
    icon: '💃',
    price: 200,
    duration: '2 hours',
    rating: 4.9,
    description: 'Professional choreography for events like weddings, parties, and performances.',
    features: [
      'Custom Choreography',
      'Dance Rehearsals',
      'Group and Solo Choreography',
      'Specialized Dance Styles (Bollywood, Contemporary, etc.)'
    ],
    badge: 'Creative',
    image: 'https://static.vecteezy.com/system/resources/previews/015/908/650/non_2x/senior-female-choreographer-free-vector.jpg', // Sample Image
    addons: [
      { id: 1, name: 'Extra Rehearsal Hour', price: 50, description: 'Add an additional hour of rehearsal.' },
      { id: 2, name: 'Customized Dance Costume', price: 100, description: 'Get a specially designed costume for the performance.' }
    ]
  },
  {
    id: 2,
    name: 'Anchor',
    icon: '🎤',
    price: 300,
    duration: '4 hours',
    rating: 4.8,
    description: 'Professional anchor for events, weddings, and corporate functions.',
    features: [
      'Event Hosting',
      'Audience Engagement',
      'Script Writing Assistance',
      'Entertainment Management'
    ],
    badge: 'Entertainment',
    image: 'https://i.pinimg.com/736x/a1/e7/00/a1e7004fbfb497a2a78fc93f4062660e.jpg', // Sample Image
    addons: [
      { id: 1, name: 'Extra 1 Hour of Hosting', price: 75, description: 'Add one more hour of event hosting.' },
      { id: 2, name: 'Video Message for Guests', price: 150, description: 'Pre-record a personalized message for guests.' }
    ]
  },
  {
    id: 3,
    name: 'Mehndi Artist',
    icon: '🌸',
    price: 100,
    duration: '2 hours',
    rating: 4.7,
    description: 'Traditional henna designs for brides, bridesmaids, and guests.',
    features: [
      'Bridal Mehndi Designs',
      'Custom Henna Art',
      'Traditional and Modern Designs',
      'Temporary Henna Tattoos'
    ],
    badge: 'Cultural',
    image: 'https://thumbs.dreamstime.com/b/female-hands-mehendi-pattern-flowers-artist-painting-henna-mehndi-artist-drawing-floral-henna-tattoo-women-hand-228288566.jpg', // Sample Image
    addons: [
      { id: 1, name: 'Henna Design for Bridal Party', price: 50, description: 'Designs for bridesmaids and family members.' },
      { id: 2, name: 'Extended Henna Session', price: 40, description: 'Additional time for more intricate designs.' }
    ]
  },
  {
    id: 4,
    name: 'Event Planner',
    icon: '🎉',
    price: 500,
    duration: '1 month',
    rating: 4.9,
    description: 'Complete event planning and coordination for weddings, corporate events, and parties.',
    features: [
      'Full Event Coordination',
      'Venue Selection & Booking',
      'Vendor Management',
      'Theme and Decor Selection',
      'Budget Management'
    ],
    badge: 'Luxury',
    image: 'https://www.theweddingschool.in/wp-content/uploads/2022/04/blog-53-3.jpg', // Sample Image
    addons: [
      { id: 1, name: 'Event Photography', price: 300, description: 'Photography for the event, including candid and posed shots.' },
      { id: 2, name: 'Live Event Music', price: 400, description: 'Add live music or a DJ to your event.' }
    ]
  },
  {
    id: 5,
    name: 'Painter',
    icon: '🎨',
    price: 150,
    duration: '2-3 hours',
    rating: 4.8,
    description: 'Custom painting for home decor, portraits, or special occasions.',
    features: [
      'Custom Portraits',
      'Landscape Paintings',
      'Abstract Art',
      'Home Decor Painting'
    ],
    badge: 'Creative',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/70/Bob_at_Easel.jpg', // Sample Image
    addons: [
      { id: 1, name: 'Frame for Painting', price: 50, description: 'Get your painting framed for display.' },
      { id: 2, name: 'Multiple Paintings Discount', price: 250, description: 'Order more than 2 paintings and get a discount.' }
    ]
  },
  {
    id: 6,
    name: 'Cook',
    icon: '🍳',
    price: 100,
    duration: '4 hours',
    rating: 4.9,
    description: 'Hire a professional cook for home events, parties, or daily meal preparation.',
    features: [
      'Catering for Events',
      'Customized Meal Plans',
      'Healthy Meal Options',
      'Private Chef Services'
    ],
    badge: 'Luxury',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLFIgLoTTjYH-xwohMRKXFjdvuCCGLBr2Aw&s', // Sample Image
    addons: [
      { id: 1, name: 'Additional Dish for Event', price: 50, description: 'Add one more dish to the menu.' },
      { id: 2, name: 'Special Dietary Requirements', price: 40, description: 'Customized meals for special dietary needs.' }
    ]
  },
  {
    id: 7,
    name: 'Maid',
    icon: '🧹',
    price: 30,
    duration: '2 hours',
    rating: 4.7,
    description: 'Professional cleaning services for your home or office.',
    features: [
      'House Cleaning',
      'Deep Cleaning',
      'Office Cleaning',
      'Laundry Services'
    ],
    badge: 'Professional',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLFIgLoTTjYH-xwohMRKXFjdvuCCGLBr2Aw&s', // Sample Image
    addons: [
      { id: 1, name: 'Deep Cleaning Add-on', price: 40, description: 'Add deep cleaning for additional cleaning services.' },
      { id: 2, name: 'Laundry Service', price: 25, description: 'Get laundry service for your clothes.' }
    ]
  }
];

export default expertServices;

export const serviceCategories = [
  {
    id: 1,
    name: 'Home Cleaning',
    icon: '🏠',
    description: 'Professional home cleaning services',
    serviceCount: 12,
    services: [
      { 
        id: 101, 
        name: 'Deep House Cleaning', 
        price: 120, 
        rating: 4.8, 
        duration: '3-4 hours', 
        description: 'Complete deep cleaning of your entire home', 
        image: '🏡', 
        features: ['All rooms cleaned', 'Kitchen appliances', 'Bathroom sanitization', 'Floor mopping & vacuuming'],
        addons: [
          {id: 1, name: 'Fridge Cleaning', price: 15, description: 'Cleaning the interior of your fridge.' },
          {id: 2, name: 'Window Cleaning', price: 10, description: 'Interior and exterior window cleaning.' },
          { id:3,name: 'Carpet Steam Cleaning', price: 25, description: 'Steam clean your carpets for a fresher look.' },
          {id: 4, name: 'Laundry Services', price: 20, description: 'Wash and fold laundry.' },
          {id: 5,name: 'Post-Cleaning Air Freshener', price: 5, description: 'Spray a pleasant air freshener in the home.' }
        ]
      },
      { 
        id: 102, 
        name: 'Regular House Cleaning', 
        price: 80, 
        rating: 4.7, 
        duration: '2-3 hours', 
        description: 'Weekly/bi-weekly house cleaning', 
        image: '🧹', 
        features: ['Dusting & wiping', 'Floor cleaning', 'Trash removal', 'Basic organization'],
        addons: [
          {id:1 , name: 'Window Cleaning', price: 10, description: 'Interior and exterior window cleaning.' },
          {id: 2, name: 'Fridge Cleaning', price: 15, description: 'Clean the interior of your fridge.' },
          {id: 3, name: 'Laundry Services', price: 20, description: 'Wash and fold laundry.' },
          {id: 4, name: 'Deep Carpet Cleaning', price: 30, description: 'Steam clean your carpets for deep cleaning.' },
          {id: 5, name: 'Bathroom Scrub', price: 25, description: 'Deep clean the bathroom sinks and toilets.' }
        ]
      },
      { 
        id: 103, 
        name: 'Kitchen Deep Clean', 
        price: 60, 
        rating: 4.9, 
        duration: '2 hours', 
        description: 'Thorough kitchen cleaning including appliances', 
        image: '🍳', 
        features: ['Oven & microwave cleaning', 'Cabinet wiping', 'Sink & faucet polish', 'Countertop sanitization'],
        addons: [
          {id: 1, name: 'Refrigerator Cleaning', price: 15, description: 'Clean the interior of the fridge.' },
          {id: 2, name: 'Dishwasher Cleaning', price: 12, description: 'Clean and sanitize the dishwasher.' },
          {id: 3, name: 'Pantry Organization', price: 20, description: 'Organize and clean the pantry area.' },
          {id: 4, name: 'Floor Deep Cleaning', price: 18, description: 'Deep clean kitchen floors with scrubbing.' },
          {id: 5, name: 'Wall Spot Cleaning', price: 10, description: 'Spot clean stains from kitchen walls.' }
        ]
      },
      { 
        id: 104, 
        name: 'Bathroom Deep Clean', 
        price: 45, 
        rating: 4.8, 
        duration: '1.5 hours', 
        description: 'Complete bathroom sanitization', 
        image: '🚿', 
        features: ['Toilet deep clean', 'Shower & tub scrubbing', 'Mirror & fixture polish', 'Floor disinfection'],
        addons: [
          {id:1 , name: 'Shower Door Cleaning', price: 10, description: 'Clean and shine the shower doors.' },
          {id: 2, name: 'Tile Grout Cleaning', price: 20, description: 'Deep clean grout between tiles.' },
          {id: 3, name: 'Ventilation Cleaning', price: 15, description: 'Clean exhaust vents and fans.' },
          {id: 4, name: 'Water Stain Removal', price: 8, description: 'Remove water stains from surfaces.' },
          {id: 5, name: 'Toilet Descaling', price: 12, description: 'Remove mineral buildup from toilet.' }
        ]
      },
      { 
        id: 105, 
        name: 'Carpet Cleaning', 
        price: 80, 
        rating: 4.6, 
        duration: '2 hours', 
        description: 'Professional carpet steam cleaning', 
        image: '🟫', 
        features: ['Steam cleaning', 'Stain removal', 'Deodorization', 'Fast drying technique'],
        addons: [
          {id: 1, name: 'Rug Cleaning', price: 25, description: 'Steam clean and deodorize rugs.' },
          {id: 2, name: 'Upholstery Cleaning', price: 30, description: 'Clean upholstery to remove stains and dirt.' },
          {id: 3, name: 'Odor Removal', price: 10, description: 'Special treatment to remove odors from carpet.' },
          {id: 4, name: 'Stain Guard Treatment', price: 15, description: 'Apply a stain-resistant coating to your carpets.' },
          {id: 5, name: 'Pet Hair Removal', price: 12, description: 'Remove pet hair from the carpet.' }
        ]
      },
      { 
        id: 106, 
        name: 'Window Cleaning', 
        price: 40, 
        rating: 4.7, 
        duration: '1 hour', 
        description: 'Interior and exterior window cleaning', 
        image: '🪟', 
        features: ['Streak-free cleaning', 'Frame wiping', 'Sill cleaning', 'Safety assured'],
        addons: [
          {id:1 , name: 'Screen Cleaning', price: 10, description: 'Clean and restore window screens.' },
          {id:2 , name: 'Glass Polishing', price: 15, description: 'Polish window glass for extra shine.' },
          {id:3 , name: 'Balcony Cleaning', price: 25, description: 'Clean the balcony and windows around it.' },
          {id:4 , name: 'Gutter Cleaning', price: 30, description: 'Clean gutters and downspouts.' },
          {id:5 , name: 'Bird Deterrent Installation', price: 20, description: 'Install bird deterrents to prevent nesting.' }
        ]
      },
      { 
        id: 107, 
        name: 'Sofa & Upholstery Cleaning', 
        price: 70, 
        rating: 4.8, 
        duration: '2 hours', 
        description: 'Professional furniture cleaning', 
        image: '🛋️', 
        features: ['Fabric-specific cleaning', 'Stain treatment', 'Odor removal', 'Quick drying'],
        addons: [
          {id: 1, name: 'Stain Protector', price: 15, description: 'Apply a protective layer to prevent stains.' },
          {id: 2, name: 'Leather Conditioning', price: 20, description: 'Condition and restore leather upholstery.' },
          {id: 3, name: 'Pet Odor Treatment', price: 12, description: 'Special treatment to remove pet odors.' },
          {id: 4, name: 'Fabric Freshener', price: 10, description: 'Spray a freshener to leave a pleasant scent.' },
          {id: 5, name: 'Cushion Cleaning', price: 25, description: 'Clean and refresh sofa cushions.' }
        ]
      },
      { 
        id: 108, 
        name: 'Post-Construction Cleaning', 
        price: 150, 
        rating: 4.9, 
        duration: '4-5 hours', 
        description: 'Complete cleanup after renovation', 
        image: '🏗️', 
        features: ['Dust removal', 'Paint splatter cleanup', 'Debris clearing', 'Deep sanitization'],
        addons: [
          {id:1 , name: 'Window Polishing', price: 30, description: 'Polish windows for a spotless look.' },
          {id: 2, name: 'Floor Sealing', price: 50, description: 'Seal floors to protect from future stains.' },
          {id: 3, name: 'Furniture Cleaning', price: 40, description: 'Clean and restore furniture post-renovation.' },
          {id: 4, name: 'Exterior Pressure Washing', price: 80, description: 'Pressure wash the exterior surfaces of the home.' },
          {id: 5, name: 'Air Vent Cleaning', price: 25, description: 'Clean air vents and ducts.' }
        ]
      }
    ]
  },
{
    id: 2,
    name: 'Home Repairs',
    icon: '🔧',
    description: 'Expert repair and maintenance services',
    serviceCount: 15,
    services: [
      { 
        id: 201, 
        name: 'Plumbing Repair', 
        price: 90, 
        rating: 4.8, 
        duration: '1-2 hours', 
        description: 'Fix leaks, unclog drains, repair fixtures', 
        image: '🔧', 
        features: ['Leak detection & repair', 'Drain unclogging', 'Fixture installation', 'Emergency service'],
        addons: [
          {id:1 , name: 'Pipe Insulation', price: 20, description: 'Insulate pipes to prevent freezing.' },
          {id: 2, name: 'Water Heater Flush', price: 30, description: 'Flush out sediment from your water heater.' },
          {id: 3, name: 'Garbage Disposal Repair', price: 25, description: 'Repair or replace faulty garbage disposals.' },
          {id: 4, name: 'Faucet Replacement', price: 40, description: 'Replace old faucets with new ones.' },
          {id: 5, name: 'Water Filter Installation', price: 50, description: 'Install a water filtration system.' }
        ]
      },
      { 
        id: 202, 
        name: 'Electrical Work', 
        price: 100, 
        rating: 4.9, 
        duration: '1-3 hours', 
        description: 'Wiring, switches, outlet installation', 
        image: '⚡', 
        features: ['Safety certified', 'Switch installation', 'Outlet repair', 'Wiring solutions'],
        addons: [
          {id: 1, name: 'Ceiling Fan Installation', price: 70, description: 'Install ceiling fans in rooms.' },
          {id: 2, name: 'Circuit Breaker Replacement', price: 80, description: 'Replace faulty circuit breakers.' },
          {id: 3, name: 'Electrical Panel Upgrade', price: 150, description: 'Upgrade your electrical panel for better capacity.' },
          {id: 4, name: 'Security Lighting Installation', price: 60, description: 'Install outdoor security lighting.' },
          {id: 5, name: 'Smart Home Automation', price: 120, description: 'Install smart lighting and switches.' }
        ]
      },
      { 
        id: 203, 
        name: 'AC Service & Repair', 
        price: 120, 
        rating: 4.7, 
        duration: '2-3 hours', 
        description: 'AC maintenance and repair services', 
        image: '❄️', 
        features: ['Filter replacement', 'Gas refilling', 'Coil cleaning', 'Temperature calibration'],
        addons: [
          {id:1 , name: 'Duct Cleaning', price: 50, description: 'Clean air ducts to improve airflow.' },
          {id:2 , name: 'AC Cover Installation', price: 20, description: 'Install covers for seasonal storage.' },
          {id:3 , name: 'Deodorizing Treatment', price: 15, description: 'Deodorize your AC to eliminate bad smells.' },
          {id:4 , name: 'Freon Recharge', price: 40, description: 'Recharge Freon for enhanced cooling.' },
          {id:5 , name: 'Smart Thermostat Installation', price: 100, description: 'Install a smart thermostat for energy efficiency.' }
        ]
      },
      { 
        id: 204, 
        name: 'Appliance Repair', 
        price: 85, 
        rating: 4.6, 
        duration: '1-2 hours', 
        description: 'Repair washing machines, refrigerators, etc.', 
        image: '🔌', 
        features: ['Multi-brand service', 'Genuine parts', 'Warranty included', 'Home visit'],
        addons: [
          {id:1 , name: 'Washing Machine Drum Cleaning', price: 30, description: 'Deep clean the washing machine drum.' },
          {id: 2, name: 'Fridge Gas Refill', price: 50, description: 'Refill gas in your refrigerator for better cooling.' },
          {id: 3, name: 'Dishwasher Repair', price: 40, description: 'Fix any issues with your dishwasher.' },
          {id: 4, name: 'Oven Repair', price: 55, description: 'Repair or replace faulty oven parts.' },
          {id: 5, name: 'Dryer Vent Cleaning', price: 25, description: 'Clean the dryer vent for safety.' }
        ]
      },
      { 
        id: 205, 
        name: 'Painting Services', 
        price: 200, 
        rating: 4.8, 
        duration: '4-6 hours', 
        description: 'Interior and exterior painting', 
        image: '🎨', 
        features: ['Premium paints', 'Surface preparation', 'Clean finish', 'Color consultation'],
        addons: [
          {id:1 , name: 'Wall Patching', price: 30, description: 'Patch holes and cracks in walls before painting.' },
          {id:2 , name: 'Custom Color Consultation', price: 40, description: 'Get advice on the best colors for your space.' },
          {id:3 , name: 'Wallpaper Removal', price: 50, description: 'Remove old wallpaper before painting.' },
          {id:4 , name: 'Trim Painting', price: 20, description: 'Paint trim and molding for a polished look.' },
          {id:5 , name: 'Exterior Power Wash', price: 70, description: 'Power wash exterior surfaces before painting.' }
        ]
      },
      { 
        id: 206, 
        name: 'Furniture Assembly', 
        price: 50, 
        rating: 4.7, 
        duration: '1-2 hours', 
        description: 'Assembly of furniture and fixtures', 
        image: '🪑', 
        features: ['Expert assembly', 'Tool provided', 'Cleanup included', 'Installation support'],
        addons: [
          {id:1 , name: 'Disposal of Old Furniture', price: 20, description: 'Dispose of your old furniture in an eco-friendly manner.' },
          {id:2 , name: 'Furniture Protection Plan', price: 15, description: 'Provide extra protection for newly assembled furniture.' },
          {id:3 , name: 'Furniture Moving', price: 30, description: 'Move assembled furniture to different rooms.' },
          {id:4 , name: 'Furniture Reassembly', price: 40, description: 'Reassemble disassembled furniture for relocation.' },
          {id:5 , name: 'Custom Furniture Setup', price: 60, description: 'Customize furniture arrangements in your home.' }
        ]
      },
      { 
        id: 207, 
        name: 'Tile & Flooring Repair', 
        price: 80, 
        rating: 4.8, 
        duration: '2-3 hours', 
        description: 'Tile replacement and flooring solutions', 
        image: '🟫', 
        features: ['Tile matching', 'Grout repair', 'Floor leveling', 'Quality materials'],
        addons: [
          {id:1 , name: 'Tile Sealing', price: 25, description: 'Seal tiles for long-lasting protection.' },
          {id:2 , name: 'Floor Polishing', price: 40, description: 'Polish floors for extra shine.' },
          {id:3 , name: 'Underlayment Installation', price: 50, description: 'Install underlayment for better floor support.' },
          {id:4 , name: 'Tile Re-grouting', price: 30, description: 'Re-grout tiles to restore their look.' },
          {id:5 , name: 'Carpet Installation', price: 60, description: 'Install carpets for added comfort.' }
        ]
      },
      { 
        id: 208, 
        name: 'Door & Window Repair', 
        price: 75, 
        rating: 4.7, 
        duration: '1-2 hours', 
        description: 'Fix doors, windows, and locks', 
        image: '🚪', 
        features: ['Lock repair', 'Hinge adjustment', 'Weather sealing', 'Security upgrade'],
        addons: [
          {id:1, name: 'Window Tinting', price: 40, description: 'Tint windows for privacy and sun protection.' },
          {id:2 , name: 'Security Lock Installation', price: 60, description: 'Install high-security locks for doors and windows.' },
          {id:3 , name: 'Sliding Door Repair', price: 50, description: 'Repair or replace sliding door mechanisms.' },
          {id:4 , name: 'Weatherproofing', price: 20, description: 'Weatherproof doors and windows for better insulation.' },
          {id:5 , name: 'Pet Door Installation', price: 30, description: 'Install a door for your pets.' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Beauty & Wellness',
    icon: '💆‍♀️',
    description: 'Professional beauty and wellness services',
    serviceCount: 18,
    services: [
      { 
        id: 301, 
        name: 'Hair Cut & Styling', 
        price: 45, 
        rating: 4.9, 
        duration: '1 hour', 
        description: 'Professional haircut and styling at home', 
        image: '✂️', 
        features: ['Expert stylists', 'Latest trends', 'Hair wash included', 'Style consultation'],
        addons: [
          {id:1 , name: 'Hair Color', price: 60, description: 'Full head hair coloring for a fresh look.' },
          {id:2 , name: 'Beard Trim', price: 15, description: 'Professional beard trimming.' },
          {id:3 , name: 'Hair Spa', price: 25, description: 'Deep conditioning treatment for healthy hair.' },
          {id:4 , name: 'Blow Dry', price: 20, description: 'Professional blow-dry service.' },
          {id:5 , name: 'Hair Treatment', price: 30, description: 'Keratin or other hair treatments.' }
        ]
      },
      { 
        id: 302, 
        name: 'Facial Treatment', 
        price: 80, 
        rating: 4.8, 
        duration: '1.5 hours', 
        description: 'Relaxing facial treatment at your doorstep', 
        image: '💆‍♀️', 
        features: ['Deep cleansing', 'Anti-aging treatment', 'Natural products', 'Skin analysis'],
        addons: [
          {id: 1, name: 'Anti-aging Mask', price: 40, description: 'Use an anti-aging mask for enhanced results.' },
          {id: 2, name: 'Neck & Shoulder Massage', price: 20, description: 'Relax your neck and shoulder muscles.' },
          {id: 3, name: 'Eye Treatment', price: 25, description: 'Treat puffiness and dark circles under your eyes.' },
          {id: 4, name: 'Exfoliation Treatment', price: 30, description: 'Deep exfoliation for smooth skin.' },
          {id: 5, name: 'Collagen Boosting', price: 35, description: 'Boost your skin’s collagen production.' }
        ]
      }
    ]
  },
   {
    id: 4,
    name: 'Appliance Services',
    icon: '📱',
    description: 'Device repair and maintenance',
    serviceCount: 10,
    services: [
      { 
        id: 401, 
        name: 'Phone Screen Repair', 
        price: 80, 
        rating: 4.7, 
        duration: '1 hour', 
        description: 'Screen replacement for all phone models', 
        image: '📱', 
        features: ['All brands supported', 'Original quality screen', 'Data protection', 'Warranty included'],
        addons: [
          {id: 1, name: 'Battery Replacement', price: 30, description: 'Replace your phone battery with a new one.' },
          {id: 2, name: 'Phone Case Installation', price: 10, description: 'Install a protective case on your phone.' },
          {id: 3, name: 'Phone Cleaning', price: 15, description: 'Clean the exterior and internal components of your phone.' },
          {id: 4, name: 'Waterproofing', price: 20, description: 'Waterproof coating for extra protection.' },
          {id: 5, name: 'Screen Protector', price: 5, description: 'Install a screen protector to prevent scratches.' }
        ]
      },
      { 
        id: 402, 
        name: 'Laptop Repair', 
        price: 120, 
        rating: 4.8, 
        duration: '2-3 hours', 
        description: 'Hardware and software laptop repairs', 
        image: '💻', 
        features: ['Hardware diagnosis', 'Software troubleshooting', 'Data recovery', 'Performance optimization'],
        addons: [
          {id: 1, name: 'Battery Replacement', price: 50, description: 'Replace laptop battery for better performance.' },
          {id: 2, name: 'Keyboard Repair', price: 30, description: 'Repair or replace faulty laptop keyboards.' },
          {id: 3, name: 'Laptop Cleaning', price: 25, description: 'Clean internal and external parts of your laptop.' },
          {id: 4, name: 'Data Backup', price: 40, description: 'Backup your important data before repair.' },
          {id: 5, name: 'RAM Upgrade', price: 60, description: 'Upgrade your laptop’s RAM for better performance.' }
        ]
      },
      { 
        id: 403, 
        name: 'TV Wall Mounting', 
        price: 60, 
        rating: 4.9, 
        duration: '1 hour', 
        description: 'Professional TV mounting service', 
        image: '📺', 
        features: ['Wall type assessment', 'Cable management', 'Secure mounting', 'Angle adjustment'],
        addons: [
          {id: 1, name: 'Soundbar Installation', price: 30, description: 'Install a soundbar along with your TV.' },
          {id: 2, name: 'TV Calibration', price: 20, description: 'Calibrate TV settings for the best picture.' },
          {id: 3, name: 'Remote Control Setup', price: 10, description: 'Set up the remote control for all devices.' },
          {id: 4, name: 'Power Outlet Installation', price: 40, description: 'Install an extra power outlet near the TV.' },
          {id: 5, name: 'Custom TV Mount', price: 50, description: 'Install a custom wall mount for your TV.' }
        ]
      },
      { 
        id: 404, 
        name: 'Microwave Repair', 
        price: 70, 
        rating: 4.6, 
        duration: '1 hour', 
        description: 'Microwave troubleshooting and repair', 
        image: '📡', 
        features: ['Common issues fixed', 'Safety testing', 'Genuine parts', 'Quick turnaround'],
        addons: [
          {id:1 , name: 'Microwave Cleaning', price: 15, description: 'Clean interior parts of the microwave.' },
          {id:2 , name: 'Turntable Replacement', price: 20, description: 'Replace the turntable for smoother operation.' },
          {id:3 , name: 'Microwave Test Run', price: 10, description: 'Test the microwave after repair for proper functioning.' },
          {id:4 , name: 'Microwave Filter Change', price: 12, description: 'Change the filter to ensure proper ventilation.' },
          {id:5 , name: 'Microwave Parts Warranty', price: 20, description: 'Provide an extended warranty on parts replaced.' }
        ]
      },
      { 
        id: 405, 
        name: 'Washing Machine Service', 
        price: 90, 
        rating: 4.7, 
        duration: '1-2 hours', 
        description: 'Washing machine repair and maintenance', 
        image: '🧺', 
        features: ['All brands serviced', 'Drum cleaning', 'Filter replacement', 'Performance check'],
        addons: [
          {id:1 , name: 'Drain Pump Replacement', price: 25, description: 'Replace faulty drain pump for smooth drainage.' },
          {id: 2, name: 'Water Leak Detection', price: 15, description: 'Detect and fix any water leaks from the machine.' },
          {id: 3, name: 'Door Seal Replacement', price: 20, description: 'Replace damaged door seals to prevent leaks.' },
          {id: 4, name: 'Washing Machine Cleaning', price: 20, description: 'Clean and sanitize your washing machine.' },
          {id: 5, name: 'Water Softener Installation', price: 30, description: 'Install a water softener to prevent damage from hard water.' }
        ]
      },
      { 
        id: 406, 
        name: 'Refrigerator Repair', 
        price: 110, 
        rating: 4.8, 
        duration: '1-2 hours', 
        description: 'Complete refrigerator maintenance', 
        image: '🧊', 
        features: ['Cooling system repair', 'Thermostat calibration', 'Gas refilling', 'Energy efficiency'],
        addons: [
          {id:1 , name: 'Filter Replacement', price: 20, description: 'Replace the refrigerator filter for better water quality.' },
          {id:2 , name: 'Door Seal Replacement', price: 30, description: 'Replace damaged seals to improve cooling efficiency.' },
          {id:3 , name: 'Frost Removal', price: 25, description: 'Remove any frost build-up from the fridge or freezer.' },
          {id:4 , name: 'Refrigerator Cleaning', price: 15, description: 'Clean both the interior and exterior of the fridge.' },
          {id:5 , name: 'Temperature Calibration', price: 10, description: 'Calibrate your refrigerator’s temperature settings.' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Pest Control',
    icon: '🐛',
    description: 'Professional pest control solutions',
    serviceCount: 8,
    services: [
      { 
        id: 501, 
        name: 'General Pest Control', 
        price: 100, 
        rating: 4.8, 
        duration: '2 hours', 
        description: 'Complete pest control treatment', 
        image: '🏠', 
        features: ['Safe chemicals', 'All pest types', 'Long-lasting effect', 'Follow-up service'],
        addons: [
          {id:1 , name: 'Rodent Trap Setup', price: 15, description: 'Setup traps to catch rodents in your home.' },
          {id:2 , name: 'Insect Barrier Treatment', price: 20, description: 'Apply a barrier to prevent insects from entering your home.' },
          {id: 3, name: 'Rodent Exclusion', price: 30, description: 'Seal entry points to prevent rodent access.' },
          {id: 4, name: 'Pest Monitoring', price: 25, description: 'Set up monitoring systems to track pest activity.' },
          {id: 5, name: 'Organic Pest Control', price: 40, description: 'Use non-toxic, organic pest control solutions.' }
        ]
      },
      { 
        id: 502, 
        name: 'Termite Treatment', 
        price: 150, 
        rating: 4.9, 
        duration: '3 hours', 
        description: 'Professional termite elimination', 
        image: '🐜', 
        features: ['Pre & post construction', 'Chemical barrier', 'Wood protection', '5-year warranty'],
        addons: [
          {id:1 , name: 'Wood Sealing', price: 25, description: 'Seal wood to prevent termite infestations.' },
          {id:2 , name: 'Termite Monitoring', price: 30, description: 'Monitor areas for future termite activity.' },
          {id:3 , name: 'Termite Baiting System', price: 50, description: 'Install a baiting system to eliminate termites.' },
          {id:4 , name: 'Termite Inspection', price: 20, description: 'Inspect your property for any early signs of termites.' },
          {id:5 , name: 'Foundation Treatment', price: 40, description: 'Treat the foundation to prevent termite entry.' }
        ]
      },
      { 
        id: 503, 
        name: 'Cockroach Control', 
        price: 80, 
        rating: 4.7, 
        duration: '1.5 hours', 
        description: 'Targeted cockroach elimination', 
        image: '🪳', 
        features: ['Gel treatment', 'Kitchen-safe methods', 'Breeding control', 'Prevention tips'],
        addons: [
          {id:1 , name: 'Extermination Guarantee', price: 10, description: 'Provide a guarantee for complete extermination.' },
          {id:2 , name: 'Sanitation Service', price: 15, description: 'Sanitize areas where cockroaches are found.' },
          {id:3 , name: 'Sticky Trap Installation', price: 5, description: 'Install traps to monitor and catch cockroaches.' },
          {id:4 , name: 'Cockroach Monitoring', price: 20, description: 'Monitor areas for cockroach activity.' },
          {id: 5, name: 'Rodent Control', price: 25, description: 'Include rodent control with your pest service.' }
        ]
      },
      { 
        id: 504, 
        name: 'Bed Bug Treatment', 
        price: 120, 
        rating: 4.6, 
        duration: '2-3 hours', 
        description: 'Complete bed bug removal', 
        image: '🛏️', 
        features: ['Heat treatment', 'Mattress protection', 'Multiple sessions', 'Effective elimination'],
        addons: [
          {id:1 , name: 'Mattress Steam Cleaning', price: 30, description: 'Deep steam clean your mattress to remove bed bugs.' },
          {id: 2, name: 'Bed Frame Inspection', price: 20, description: 'Inspect your bed frame for bed bug infestation.' },
          {id: 3, name: 'Pest Proofing', price: 25, description: 'Seal any cracks or gaps to prevent bed bug entry.' },
          {id: 4, name: 'Follow-up Inspection', price: 40, description: 'Ensure that bed bugs have been completely eradicated.' },
          {id: 5, name: 'Bed Bug Mattress Encasement', price: 15, description: 'Provide encasements for mattresses to prevent further infestation.' }
        ]
      },
      { 
        id: 505, 
        name: 'Mosquito Control', 
        price: 60, 
        rating: 4.7, 
        duration: '1 hour', 
        description: 'Indoor and outdoor mosquito control', 
        image: '🦟', 
        features: ['Fogging treatment', 'Breeding source elimination', 'Safe for family', 'Seasonal packages'],
        addons: [
          {id: 1, name: 'Outdoor Mosquito Trap', price: 30, description: 'Install traps around your property to capture mosquitoes.' },
          {id: 2, name: 'Mosquito Repellent', price: 15, description: 'Apply mosquito-repellent treatments to keep mosquitoes away.' },
          {id: 3, name: 'Mosquito Netting', price: 25, description: 'Install mosquito netting around patios or outdoor areas.' },
          {id: 4, name: 'Larvicidal Treatment', price: 20, description: 'Apply treatments to eliminate mosquito larvae.' },
          {id: 5, name: 'Fogging System Installation', price: 40, description: 'Install a fogging system to treat large areas for mosquitoes.' }
        ]
      }
    ]
  },
    {
    id: 6,
    name: 'Home Security',
    icon: '🔒',
    description: 'Security system installation and maintenance',
    serviceCount: 6,
    services: [
      { 
        id: 601, 
        name: 'CCTV Installation', 
        price: 200, 
        rating: 4.9, 
        duration: '3-4 hours', 
        description: 'Professional security camera setup', 
        image: '📹', 
        features: ['HD cameras', 'Night vision', 'Mobile app access', 'Cloud storage'],
        addons: [
          {id:1 , name: 'Additional Camera Setup', price: 50, description: 'Install additional cameras for better coverage.' },
          {id:2 , name: 'Camera DVR Setup', price: 60, description: 'Set up DVR system for camera footage storage.' },
          {id:3 , name: 'Camera Cleaning & Maintenance', price: 25, description: 'Clean and maintain cameras to ensure optimal performance.' },
          {id:4 , name: 'Remote Monitoring Setup', price: 40, description: 'Set up remote monitoring for access on your mobile or PC.' },
          {id:5 , name: 'Motion Detection Setup', price: 30, description: 'Install motion detection feature for enhanced security.' }
        ]
      },
      { 
        id: 602, 
        name: 'Smart Lock Installation', 
        price: 120, 
        rating: 4.8, 
        duration: '1 hour', 
        description: 'Smart door lock installation', 
        image: '🔐', 
        features: ['Biometric access', 'Mobile control', 'Multiple users', 'Emergency backup'],
        addons: [
          {id:1 , name: 'Backup Key System', price: 20, description: 'Provide a physical key backup for emergency situations.' },
          {id:2 , name: 'Remote Access Setup', price: 30, description: 'Enable remote access control via mobile app.' },
          {id:3 , name: 'Multiple User Profiles', price: 25, description: 'Set up access for multiple users with personalized profiles.' },
          {id:4 , name: 'Smart Lock Battery Replacement', price: 15, description: 'Replace batteries to ensure continued functionality.' },
          {id:5 , name: 'Lock Installation Service', price: 40, description: 'Install additional locks for other doors or windows.' }
        ]
      },
      { 
        id: 603, 
        name: 'Alarm System Setup', 
        price: 180, 
        rating: 4.7, 
        duration: '2-3 hours', 
        description: 'Home security alarm installation', 
        image: '🚨', 
        features: ['Motion sensors', '24/7 monitoring', 'Mobile alerts', 'Professional monitoring'],
        addons: [
          {id:1 , name: 'Panic Button Setup', price: 25, description: 'Install a panic button for emergency situations.' },
          {id:2 , name: 'Door/Window Contact Sensors', price: 15, description: 'Install sensors on doors or windows for security alerts.' },
          {id:3 , name: 'Additional Siren Setup', price: 30, description: 'Install an additional siren for louder alarm sounds.' },
          {id:4 , name: 'Smartphone Alerts', price: 20, description: 'Set up smartphone alerts for any security breach.' },
          {id:5 , name: 'Battery Backup', price: 40, description: 'Install battery backup for uninterrupted system operation.' }
        ]
      },
      { 
        id: 604, 
        name: 'Intercom System', 
        price: 150, 
        rating: 4.8, 
        duration: '2 hours', 
        description: 'Video intercom installation', 
        image: '📞', 
        features: ['Video calling', 'Door unlock', 'Visitor recording', 'Multi-unit support'],
        addons: [
          {id:1 , name: 'Wireless Intercom Setup', price: 50, description: 'Install a wireless system for easier installation and mobility.' },
          {id: 2, name: 'Additional Units Installation', price: 80, description: 'Install additional intercom units for multi-unit homes.' },
          {id: 3, name: 'Cloud Storage Integration', price: 40, description: 'Store video footage in the cloud for easy access.' },
          {id: 4, name: 'Smartphone App Integration', price: 30, description: 'Enable app control to unlock doors or communicate with visitors.' },
          {id: 5, name: 'Security Camera Integration', price: 60, description: 'Integrate security cameras into the intercom system for visual access.' }
        ]
      }
    ]
  }
];


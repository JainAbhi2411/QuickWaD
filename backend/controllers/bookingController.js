const Booking = require('../models/Bookings');
const User  = require('../models/User'); // Assuming the User model is imported correctly
const ExpertService = require('../models/ExpertService');
const OnlineService = require('../models/OnlineService');
const PremiumService = require('../models/PremiumService');
const ServiceCategory = require('../models/serviceCategory');
 // Importing various services

exports.createBooking = async (req, res) => {
  const {
    userId,
    serviceName,
    date,
    time,
    address,
    phone,
    instructions,
    paymentMethod,
    paymentDetails,
    totalPrice
  } = req.body;

  try {
    // Log the userId being passed in the request
    console.log("userId:", userId);

    // 1. Fetch the user from the database
    const user = await User.findById(userId);

    // Log the fetched user data
    console.log("user:", user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Fetch the service based on the serviceName
    let service = await OnlineService.findOne({ name: serviceName })
  || await PremiumService.findOne({ name: serviceName })
  || await ExpertService.findOne({ name: serviceName });

// If the service was not found in other collections, check in the ServiceCategory
if (!service) {
  const serviceCategory = await ServiceCategory.findOne({ "services.name": serviceName });
  
  // If the ServiceCategory was found, find the specific service inside the category
  if (serviceCategory) {
    service = serviceCategory.services.find(s => s.name === serviceName);
  }
}

if (!service) {
  return res.status(404).json({ message: 'Service not found' });
}

    // 3. Prepare the service details to be stored in the booking
    const serviceDetails = {
      price: service.price,
      duration: service.duration,
    };

    // 4. Create the booking object
    const newBooking = new Booking({
      user: userId,
      serviceName: service.name,
      serviceDetails: serviceDetails,
      date: new Date(date),  // Ensure the date is converted into a Date object
      time,
      address,
      phone,
      instructions,
      paymentMethod,
      paymentDetails,
      totalPrice,
      status: 'pending', // Set default status to pending
    });

    // 5. Save the booking to the database
    await newBooking.save();

    // 6. Return a response with the created booking
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Confirm a booking (e.g., after payment is processed)
exports.confirmBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by its ID
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Update the booking status to confirmed
    booking.status = 'confirmed';

    // Save the updated booking
    await booking.save();

    res.status(200).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).populate('user');
    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Controller to change the status of a booking
exports.changeBookingStatus = async (req, res) => {
  const { id } = req.params; // Booking ID from URL parameter
  const { status } = req.body; // New status from the request body

  if (!status || !['confirmed', 'pending', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Find the booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    return res.status(200).json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch tracking data
exports.getTrackingData = async (req, res) => {
  const { id } = req.params; // Booking ID from URL

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Initialize steps dynamically
    const steps = [
      { id: 1, title: 'Booking Confirmed', completed: false, time: '' },
      { id: 2, title: 'Professional Assigned', completed: false, time: '' },
      { id: 3, title: 'Professional En Route', completed: false, time: '' },
      { id: 4, title: 'Service Started', completed: false, time: '' },
      { id: 5, title: 'Service Completed', completed: false, time: '' }
    ];

    // Logic to mark steps as completed based on the booking status and use dynamic times
    switch (booking.status) {
      case 'confirmed':
        steps[0].completed = true;
        steps[0].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[1].completed = true;
        steps[1].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        break;
      case 'in_progress':
        steps[0].completed = true;
        steps[0].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[1].completed = true;
        steps[1].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[2].completed = true;
        steps[2].time = new Date(booking.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[3].completed = true;
        steps[3].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        break;
      case 'started':
        steps[0].completed = true;
        steps[0].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[1].completed = true;
        steps[1].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[2].completed = true;
        steps[2].time = new Date(booking.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[3].completed = true;
        steps[3].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        break;
      case 'completed':
        steps[0].completed = true;
        steps[0].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[1].completed = true;
        steps[1].time = new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[2].completed = true;
        steps[2].time = new Date(booking.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[3].completed = true;
        steps[3].time = new Date(booking.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        steps[4].completed = true;
        steps[4].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // After all steps are completed, update the booking status to 'completed' in the database if not already done
        if (booking.status !== 'completed') {
          booking.status = 'completed';
          await booking.save();
        }
        break;
      default:
        break;
    }

    // Prepare the response with updated tracking data
    const trackingData = {
      status: booking.status,
      estimatedArrival: new Date(Date.now() + Math.random() * 300000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      location: 'En route to your location',
      steps: steps
    };

    return res.status(200).json({ trackingData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


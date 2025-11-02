// In-memory "database" for events
let events = []; // Array to store event objects
let nextId = 1;  // Simple ID counter

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
exports.createEvent = (req, res) => {
    const { title, description, location, date, maxParticipants } = req.body;

    if (!title || !description || !location || !date || !maxParticipants) {
        return res.status(400).json({ message: 'Please enter all required fields: title, description, location, date, maxParticipants' });
    }

    const newEvent = {
        id: nextId++, // Assign unique ID
        title,
        description,
        location,
        date,
        maxParticipants: parseInt(maxParticipants, 10), // Ensure it's a number
        currentParticipants: 0, // Start with 0 participants
        createdAt: new Date()
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
};

// @desc    List all events (with optional location filter)
// @route   GET /api/events
// @access  Public
exports.listEvents = (req, res) => {
    const { location } = req.query; // Get location from query parameter

    let filteredEvents = events;

    if (location) {
        filteredEvents = events.filter(event =>
            event.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    res.status(200).json(filteredEvents);
};

// @desc    Get event details by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventDetails = (req, res) => {
    const eventId = parseInt(req.params.id, 10); // Convert ID to number
    const event = events.find(e => e.id === eventId);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
};
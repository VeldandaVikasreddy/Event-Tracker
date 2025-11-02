const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// POST /api/events - Create an event
router.post('/', eventController.createEvent);

// GET /api/events - List all events (with optional location filter)
router.get('/', eventController.listEvents);

// GET /api/events/:id - Get event details
router.get('/:id', eventController.getEventDetails);

module.exports = router;

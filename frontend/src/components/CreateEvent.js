import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newEvent = await response.json();
      // Update localStorage with the new event
      const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
      localStorage.setItem('events', JSON.stringify([...existingEvents, newEvent]));
      
      setSuccess(true);
      setFormData({ // Clear form
        title: '',
        description: '',
        location: '',
        date: '',
        maxParticipants: ''
      });
      // Optionally redirect to the new event's detail page or event list
      navigate('/');
    } catch (e) {
      setError("Failed to create event: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 lg:p-10 max-w-2xl mx-auto my-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 text-left mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 text-left mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location" className="block text-lg font-medium text-gray-700 text-left mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="block text-lg font-medium text-gray-700 text-left mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxParticipants" className="block text-lg font-medium text-gray-700 text-left mb-1">Max Participants</label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
        {error && <p className="mt-4 text-center text-red-600 text-base">{error}</p>}
        {success && <p className="mt-4 text-center text-green-600 text-base">Event created successfully!</p>}
      </form>
    </div>
  );
}

export default CreateEvent;
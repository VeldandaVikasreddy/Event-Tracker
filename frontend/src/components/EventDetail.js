import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (e) {
        setError("Failed to fetch event details. " + e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center py-8 text-xl text-gray-600">Loading event details...</div>;
  if (error) return <div className="text-center py-8 text-xl text-red-600">Error: {error}</div>;
  if (!event) return <div className="text-center py-8 text-xl text-gray-600">Event not found.</div>;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto my-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
      >
        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Events
      </button>

      <div className="event-detail-header mb-6">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{event.title}</h1>
        <p className="text-gray-600 text-lg">
          <span className="font-semibold text-blue-600">Location:</span> {event.location} &bull;
          <span className="font-semibold text-blue-600 ml-4">Date:</span> {new Date(event.date).toLocaleDateString()}
        </p>
      </div>

      <div className="w-full h-80 bg-gray-200 rounded-md overflow-hidden mb-6">
         <img
            src={`https://via.placeholder.com/800x400?text=Detailed+Image+for+${encodeURIComponent(event.title)}`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
      </div>

      <div className="event-detail-body">
        <p className="text-gray-700 text-xl leading-relaxed mb-6">{event.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg mb-6">
          <p><strong className="text-gray-800">Max Participants:</strong> <span className="text-blue-600">{event.maxParticipants}</span></p>
          <p><strong className="text-gray-800">Current Participants:</strong> <span className="text-blue-600">{event.currentParticipants}</span></p>
        </div>
        {/* Potentially add a "Join Event" button here */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 w-full md:w-auto">
          Join This Event
        </button>
      </div>
    </div>
  );
}

export default EventDetail;
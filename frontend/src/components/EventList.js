import React, { useEffect, useState, useCallback } from 'react';
import EventCard from './EventCard';

function EventList() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch events only once when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllEvents(data);
        setFilteredEvents(data);
      } catch (e) {
        setError("Failed to fetch events. " + e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []); // Only run once on mount

  // Filter events when search terms change
  useEffect(() => {
    if (!allEvents.length) return;
    
    const filtered = allEvents.filter(event => {
      const matchesLocation = !locationFilter || 
        event.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesSearch = !searchTerm || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLocation && matchesSearch;
    });
    
    setFilteredEvents(filtered);
  }, [locationFilter, searchTerm, allEvents]);
  

  if (loading) return <div className="text-center py-8 text-xl text-gray-600">Loading events...</div>;
  if (error) return <div className="text-center py-8 text-xl text-red-600">Error: {error}</div>;

  return (
    <div className="py-4">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Upcoming Events</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Filter by location..."
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by title or description..."
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => { setLocationFilter(''); setSearchTerm(''); }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-md shadow-sm transition duration-300 w-full md:w-auto"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default EventList;
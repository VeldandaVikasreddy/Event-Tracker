import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const progressPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  
  return (
    <Link to={`/event/${event.id}`} className="group block transform hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
          <img
            src={`https://via.placeholder.com/400x300?text=${encodeURIComponent(event.title)}`}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Participants</span>
              <span className="font-medium">
                {event.currentParticipants}/{event.maxParticipants}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
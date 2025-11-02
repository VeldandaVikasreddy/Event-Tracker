import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// We'll create these components next
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300">
            Event Explorer
          </Link>
          <div className="space-x-4">
            <Link to="/create" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300">
              Create Event
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create" element={<CreateEvent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Trash2, CalendarDays, 
  Plus, Edit, Save, Loader2, ChevronDown,
  CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:8080/api';

const fetchRoutine = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/routine`, {
      method: 'GET',
      headers: {
        
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(localStorage.getItem('token'))
    console.log(response)
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      throw new Error('Failed to fetch routine');
    }
    
    const data = await response.json();
    console.log('data aa rha hai ' + data)
    return data || {
      Monday: [], Tuesday: [], Wednesday: [], 
      Thursday: [], Friday: [], Saturday: [], Sunday: []
    };
  } catch (error) {
    console.error('Fetch routine error:', error);
    throw error;
  }
};

const saveRoutine = async (routine) => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-routine`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ schedule: routine })
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      throw new Error('Failed to save routine');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Save routine error:', error);
    throw error;
  }
};

const EditableRoutine = () => {
  const [routine, setRoutine] = useState({
    Monday: [], Tuesday: [], Wednesday: [], 
    Thursday: [], Friday: [], Saturday: [], Sunday: []
  });
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClass, setNewClass] = useState({ 
    day: 'Monday', 
    startTime: '', 
    endTime: '', 
    subject: '' 
  });
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const loadRoutine = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const savedRoutine = await fetchRoutine();
        console.log('fetch function called...')
        setRoutine(savedRoutine);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRoutine();
  }, []);

  const handleAddClass = () => {
    if (!newClass.startTime || !newClass.endTime || !newClass.subject) {
      toast.warning('Please fill all fields');
      return;
    }

    if (newClass.startTime >= newClass.endTime) {
      toast.warning('End time must be after start time');
      return;
    }

    const timeSlot = `${newClass.startTime} - ${newClass.endTime}`;
    
    setRoutine(prev => ({
      ...prev,
      [newClass.day]: [...prev[newClass.day], { 
        time: timeSlot, 
        subject: newClass.subject,
        startTime: newClass.startTime,
        endTime: newClass.endTime
      }].sort((a, b) => a.startTime.localeCompare(b.startTime))
    }));

    setNewClass({ ...newClass, startTime: '', endTime: '', subject: '' });
    toast.success('Class added successfully');
  };

  const handleDeleteClass = (day, index) => {
    setRoutine(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
    toast.info('Class removed');
  };

  const handleSaveRoutine = async () => {
    try {
      setIsLoading(true);
      await saveRoutine(routine);
      toast.success('Routine saved successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (error && !editMode && Object.values(routine).every(day => day.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 text-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-md w-full">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Routine</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mx-auto"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!editMode && Object.values(routine).every(day => day.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 text-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-md w-full">
          <CalendarDays className="w-16 h-16 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Routine Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You haven't created your weekly routine yet. Let's set up your schedule!
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Routine
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
              <CalendarDays className="w-6 h-6 md:w-8 md:h-8 text-indigo-600 dark:text-indigo-400" />
              Weekly Routine
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {editMode ? 'Editing mode' : 'Viewing mode'}
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            {editMode ? (
              <>
                <button
                  onClick={() => {
                    setEditMode(false);
                    fetchRoutine().then(savedRoutine => {
                      if (savedRoutine) setRoutine(savedRoutine);
                    });
                  }}
                  className="flex-1 md:flex-none flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-gray-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRoutine}
                  disabled={isLoading}
                  className="flex-1 md:flex-none flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 md:flex-none flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
              >
                <Edit className="w-4 h-4" />
                Edit Routine
              </button>
            )}
          </div>
        </div>

        {editMode && (
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Add New Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                <select
                  value={newClass.day}
                  onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {Object.keys(routine).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                <input
                  type="time"
                  value={newClass.startTime}
                  onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                <input
                  type="time"
                  value={newClass.endTime}
                  onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newClass.subject}
                    onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                    className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter subject name"
                  />
                  <button
                    onClick={handleAddClass}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden md:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(routine).map(([day, schedule]) => (
            <div 
              key={day} 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                editMode ? 'border border-indigo-500/30 hover:border-indigo-500/50' : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              <button
                onClick={() => toggleDay(day)}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {day}
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    schedule.length > 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {schedule.length} {schedule.length === 1 ? 'class' : 'classes'}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedDay === day ? 'rotate-180' : ''
                }`} />
              </button>
              
              {(expandedDay === day || window.innerWidth > 768) && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  {schedule.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No classes scheduled for {day}
                      </p>
                      {editMode && (
                        <button
                          onClick={() => setNewClass(prev => ({ ...prev, day }))}
                          className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Add a class
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {schedule.map((item, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg transition-all flex justify-between items-center ${
                            editMode 
                              ? 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30' 
                              : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700/70'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                              <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                              <span className="font-medium">{item.subject}</span>
                            </div>
                          </div>
                          {editMode && (
                            <button
                              onClick={() => handleDeleteClass(day, index)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors p-1"
                              aria-label="Delete class"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default EditableRoutine;
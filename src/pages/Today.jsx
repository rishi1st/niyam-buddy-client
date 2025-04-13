import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiCheckCircle, FiXCircle, FiPlus } from 'react-icons/fi';
import { FaRegCalendarCheck, FaChartLine } from 'react-icons/fa';
import { BsGraphUp, BsHourglassSplit } from 'react-icons/bs';

const Today = () => {
  const [todayData, setTodayData] = useState({ time: '', message: '' });
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date();
  const day = currentDate.getDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentDate.getDate() - diffToMonday);
  const currentWeekEnd = new Date(currentDate);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/todaylog/all', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { data } = res.data;
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddbutton() {
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/todaylog/add',
        todayData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('✅ Log added successfully!');
      setTodayData({ time: '', message: '' });
      fetchLogs();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong!');
      }
    }
  }

  const currentWeekLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= currentWeekStart && logDate <= currentWeekEnd;
  });

  const weekLogsByDay = {};
  currentWeekLogs.forEach(log => {
    const date = new Date(log.date).toDateString();
    weekLogsByDay[date] = log;
  });

  // Calculate weekly stats
  const totalWeeklyHours = currentWeekLogs.reduce((sum, log) => sum + parseFloat(log.time || 0), 0);
  const averageDailyHours = (totalWeeklyHours / (diffToMonday + 1)).toFixed(1);
  const daysCompleted = currentWeekLogs.length;
  const completionRate = Math.round((daysCompleted / (diffToMonday + 1)) * 100);

  const getFormattedWeekLogs = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let d = new Date(currentWeekStart); d <= currentWeekEnd; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toDateString();
      const log = weekLogsByDay[dateStr];
      const isToday = d.toDateString() === currentDate.toDateString();

      days.push(
        <motion.li 
          key={dateStr}
          className={`mb-3 p-3 rounded-lg ${log ? 'bg-green-900 bg-opacity-20 border-l-4 border-green-500' : 'bg-red-900 bg-opacity-20 border-l-4 border-red-500'}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: d.getDay() * 0.1 }}
        >
          <div className="flex items-center">
            <div className={`mr-3 p-2 rounded-full ${log ? 'bg-green-900 bg-opacity-30 text-green-400' : 'bg-red-900 bg-opacity-30 text-red-400'}`}>
              {log ? <FiCheckCircle size={20} /> : <FiXCircle size={20} />}
            </div>
            <div>
              <div className="font-medium flex items-center">
                <span className={`${isToday ? 'font-bold text-blue-400' : 'text-gray-200'}`}>
                  {dayNames[d.getDay()]} {d.getDate()}
                </span>
                {isToday && <span className="ml-2 text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded-full">Today</span>}
              </div>
              <div className="text-sm">
                {log ? (
                  <span className="text-gray-300">
                    <span className="font-semibold">{log.time} hours</span> – {log.message}
                  </span>
                ) : (
                  <span className="text-gray-400">didn't study</span>
                )}
              </div>
            </div>
          </div>
        </motion.li>
      );
    }

    return days;
  };

  return (
    <>
     <div className='w-[100%] bg-gray-900'>
     <div className="p-4 max-w-4xl mx-auto bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-100 mb-2 flex items-center justify-center">
          <BsHourglassSplit className="mr-3 text-blue-400" /> Study Tracker Dashboard
        </h1>
        <p className="text-gray-400">Track your daily learning progress</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-900 bg-opacity-50 rounded-lg mr-3">
              <FiClock className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Hours</p>
              <p className="text-xl font-semibold text-gray-100">
                {weekLogsByDay[currentDate.toDateString()]?.time || '0'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-900 bg-opacity-50 rounded-lg mr-3">
              <FaChartLine className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Weekly Hours</p>
              <p className="text-xl font-semibold text-gray-100">{totalWeeklyHours}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-900 bg-opacity-50 rounded-lg mr-3">
              <BsGraphUp className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Daily</p>
              <p className="text-xl font-semibold text-gray-100">{averageDailyHours}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700"
        >
          <div className="flex items-center">
            <div className="p-3 bg-amber-900 bg-opacity-50 rounded-lg mr-3">
              <FaRegCalendarCheck className="text-amber-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completion</p>
              <p className="text-xl font-semibold text-gray-100">{completionRate}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Log Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 shadow-lg rounded-2xl p-6 mb-8 border border-gray-700"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-100">
          <FiPlus className="mr-2 text-blue-400" /> Add Today's Study Log
        </h2>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900 bg-opacity-30 text-red-400 rounded-lg flex items-center"
          >
            <FiXCircle className="mr-2" /> {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-900 bg-opacity-30 text-green-400 rounded-lg flex items-center"
          >
            <FiCheckCircle className="mr-2" /> {success}
          </motion.div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Study Duration (hours)</label>
            <input
              type="text"
              placeholder="e.g. 3.5"
              value={todayData.time}
              onChange={(e) => setTodayData({ ...todayData, time: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">What did you study?</label>
            <textarea
              placeholder="Describe what you learned today..."
              value={todayData.message}
              onChange={(e) => setTodayData({ ...todayData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-100"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddbutton}
            className="w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Save Today's Progress
          </motion.button>
        </div>
      </motion.div>

      {/* Weekly Logs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center text-gray-100">
            <FiCalendar className="mr-2 text-blue-400" /> Your progress in this Week 
          </h3>
          <div className="text-sm bg-blue-900 bg-opacity-50 text-blue-300 px-3 py-1 rounded-full">
            {currentWeekStart.toLocaleDateString()} - {currentWeekEnd.toLocaleDateString()}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-700">
            {getFormattedWeekLogs()}
          </ul>
        )}
      </motion.div>
    </div>
     </div>
    </>
  );
};

export default Today;
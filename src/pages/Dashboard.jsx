import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCalendar, FiClock, FiTrendingUp, FiAward, FiBarChart2, FiTarget } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProgressChart from '../components/ProgressChart';
import StudyCalendar from '../components/StudyCalendar';
import GoalTracker from '../components/GoalTracker';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalHours: 0,
    weeklyAverage: 0,
    streak: 0,
    monthlyHours: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

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
      calculateStats(data);
    } catch (err) {
      console.error(err);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }

  function calculateStats(logsData) {
    if (!Array.isArray(logsData)) return;

    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    // Calculate total hours
    const totalHours = logsData.reduce((sum, log) => sum + parseFloat(log.time || 0), 0);

    // Calculate weekly average
    const weeklyLogs = logsData.filter(log => new Date(log.date) >= oneWeekAgo);
    const weeklyHours = weeklyLogs.reduce((sum, log) => sum + parseFloat(log.time || 0), 0);
    const weeklyAverage = weeklyLogs.length > 0 ? (weeklyHours / weeklyLogs.length).toFixed(1) : 0;

    // Calculate monthly hours
    const monthlyLogs = logsData.filter(log => new Date(log.date) >= oneMonthAgo);
    const monthlyHours = monthlyLogs.reduce((sum, log) => sum + parseFloat(log.time || 0), 0);

    // Calculate current streak
    let streak = 0;
    const sortedLogs = [...logsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const today = new Date().toDateString();
    let currentDate = new Date();
    
    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].date).toDateString();
      if (logDate === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (i === 0 && logDate !== today) {
        // First log isn't today, no streak
        break;
      } else {
        break;
      }
    }

    setStats({
      totalHours,
      weeklyAverage,
      streak,
      monthlyHours
    });
  }

  const getWeeklyHoursByDay = () => {
    const days = [];
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const weeklyLogs = logs.filter(log => new Date(log.date) >= oneWeekAgo);
    
    // Create array for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      
      const dayLogs = weeklyLogs.filter(log => {
        const logDate = new Date(log.date);
        return logDate.toDateString() === date.toDateString();
      });
      
      const dayHours = dayLogs.reduce((sum, log) => sum + parseFloat(log.time || 0), 0);
      
      days.push({
        day: dayOfWeek + 1, // Convert to 1-7 (Mon-Sun)
        hours: dayHours
      });
    }

    return days;
  };

  return (
    <>
    <div className='w-[100%] bg-gray-900'>
    <div className="p-4 max-w-7xl mx-auto bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Study Dashboard</h1>
        <p className="text-gray-400">Track your learning progress over time</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-900 bg-opacity-50 rounded-lg mr-3 text-blue-400">
              <FiClock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Hours</p>
              <p className="text-2xl font-semibold text-gray-100">{stats.totalHours.toFixed(1)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-900 bg-opacity-50 rounded-lg mr-3 text-green-400">
              <FiTrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Weekly Average</p>
              <p className="text-2xl font-semibold text-gray-100">{stats.weeklyAverage}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-900 bg-opacity-50 rounded-lg mr-3 text-purple-400">
              <FiAward size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Streak</p>
              <p className="text-2xl font-semibold text-gray-100">{stats.streak} days</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 bg-amber-900 bg-opacity-50 rounded-lg mr-3 text-amber-400">
              <FiBarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Monthly Hours</p>
              <p className="text-2xl font-semibold text-gray-100">{stats.monthlyHours.toFixed(1)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-100">
            <FiTrendingUp className="mr-2 text-blue-400" /> Weekly Progress
          </h3>
          <ProgressChart weeklyHours={getWeeklyHoursByDay()} darkMode={true} />
        </div>

        {/* Study Calendar */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
          <StudyCalendar logs={logs} darkMode={true} />
        </div>
      </div>

      {/* Goals and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Goals Tracker */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
          <GoalTracker darkMode={true} />
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-100">
            <FiCalendar className="mr-2 text-blue-400" /> Recent Study Sessions
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No study sessions logged yet</div>
          ) : (
            <div className="space-y-3">
              {logs.slice(0, 5).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-200">
                        {new Date(log.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">{log.message}</p>
                    </div>
                    <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      {log.time} hours
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Dashboard;
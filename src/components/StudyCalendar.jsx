import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  getYear,
  getMonth,
  getDate,
  parseISO,
  isValid,
  differenceInCalendarDays
} from 'date-fns';
import { FiCheck, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const StudyCalendar = ({ logs = [] }) => {
  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Parse registration date with fallbacks
  const registrationDate = user?.createdAt ? parseISO(user.createdAt) : new Date();
  const isValidRegistration = isValid(registrationDate);
  const registrationYear = isValidRegistration ? getYear(registrationDate) : getYear(new Date());

  // Calculate days since registration
  const daysSinceRegistration = isValidRegistration ? 
    differenceInCalendarDays(new Date(), registrationDate) : 0;

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  // Calendar calculations
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Process study logs
  const studyDays = {};
  logs.forEach(log => {
    try {
      const logDate = new Date(log.date).toDateString();
      studyDays[logDate] = {
        hours: parseFloat(log.time) || 0,
        message: log.message || '',
        date: log.date
      };
    } catch (e) {
      console.error('Error processing log entry:', e);
    }
  });

  // Navigation handlers
  const navigateMonth = (direction) => {
    setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
  };

  const jumpToYear = (year) => {
    setCurrentDate(new Date(year, getMonth(currentDate), 1));
  };

  // Status checks
  const isCurrentYear = getYear(currentDate) === getYear(new Date());
  const isRegistrationYear = getYear(currentDate) === registrationYear;
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          disabled={isRegistrationYear && currentMonth === 0 && currentYear <= registrationYear}
          className={`p-2 rounded-full transition-colors ${
            isRegistrationYear && currentMonth === 0 && currentYear <= registrationYear
              ? 'text-gray-600 cursor-not-allowed'
              : 'hover:bg-gray-700 text-gray-300 hover:text-white'
          }`}
        >
          <FiChevronLeft size={20} />
        </button>

        <h3 className="text-xl font-bold text-gray-100">
          {format(currentDate, 'MMMM yyyy')}
        </h3>

        <button
          onClick={() => navigateMonth('next')}
          disabled={isCurrentYear && currentMonth >= getMonth(new Date())}
          className={`p-2 rounded-full transition-colors ${
            isCurrentYear && currentMonth >= getMonth(new Date())
              ? 'text-gray-600 cursor-not-allowed'
              : 'hover:bg-gray-700 text-gray-300 hover:text-white'
          }`}
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-sm text-gray-400 font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day) => {
          const dayKey = day.toDateString();
          const hasStudied = studyDays[dayKey];
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          const dayNumber = getDate(day);

          return (
            <motion.div
              key={dayKey}
              whileHover={{ scale: 1.05 }}
              className={`relative p-1 text-center rounded-lg h-12 flex flex-col items-center justify-center mx-auto cursor-pointer transition-colors ${
                !isCurrentMonth ? 'text-gray-600' : ''
              } ${
                isCurrentDay ? 'ring-2 ring-blue-500 font-bold' : ''
              } ${
                hasStudied
                  ? parseFloat(hasStudied.hours) >= 4
                    ? 'bg-green-900 bg-opacity-30 text-green-300 border border-green-700'
                    : parseFloat(hasStudied.hours) >= 2
                    ? 'bg-yellow-900 bg-opacity-30 text-yellow-300 border border-yellow-700'
                    : 'bg-orange-900 bg-opacity-30 text-orange-300 border border-orange-700'
                  : isCurrentMonth
                  ? 'bg-red-900 bg-opacity-30 text-red-300 border border-red-700'
                  : 'bg-gray-700'
              }`}
              title={
                hasStudied
                  ? `${hasStudied.hours} hours studied on ${format(
                      new Date(hasStudied.date),
                      'MMM dd, yyyy'
                    )}: ${hasStudied.message}`
                  : 'No study logged'
              }
            >
              <div className="text-sm">{dayNumber}</div>
              <div className="absolute bottom-1 text-xs">
                {hasStudied ? (
                  <FiCheck className="text-green-400" size={10} />
                ) : isCurrentMonth ? (
                  <FiX className="text-red-400" size={10} />
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats and Navigation */}
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-900 bg-opacity-30 border border-green-700 rounded mr-2"></div>
            <span className="text-gray-300">4+ hours</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded mr-2"></div>
            <span className="text-gray-300">2-4 hours</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-900 bg-opacity-30 border border-orange-700 rounded mr-2"></div>
            <span className="text-gray-300">1-2 hours</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-900 bg-opacity-30 border border-red-700 rounded mr-2"></div>
            <span className="text-gray-300">No study</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Registered: {format(registrationDate, 'MMM yyyy')}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => jumpToYear(registrationYear)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                isRegistrationYear
                  ? 'bg-blue-900 bg-opacity-50 text-blue-300'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {registrationYear}
            </button>
            <button
              onClick={() => jumpToYear(getYear(new Date()))}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                isCurrentYear
                  ? 'bg-blue-900 bg-opacity-50 text-blue-300'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {getYear(new Date())}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyCalendar;
import React, { useState, useEffect } from 'react';
import { FiTarget, FiCheckCircle, FiXCircle, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDays: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/goal';

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGoals(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch goals. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching goals:', err);
      }
    };

    fetchGoals();
  }, [goals]);

  const calculateDaysRemaining = (createdAt, targetDays) => {
    const createdDate = new Date(createdAt);
    const targetDate = new Date(createdDate);
    targetDate.setDate(createdDate.getDate() + parseInt(targetDays));
    
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.targetDays) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_BASE_URL, {
        title: newGoal.title,
        description: newGoal.description,
        targetDays: parseInt(newGoal.targetDays),
        completed: false,
        progress: 0
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setGoals([...goals, response.data]);
      setNewGoal({ title: '', description: '', targetDays: '' });
      setIsAdding(false);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError(err.response?.data?.message || 'Failed to add goal. Please try again.');
      }
      console.error('Error adding goal:', err);
    }
  };

  const handleUpdateGoal = async (_id, updates) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/${_id}`, updates, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setGoals(goals.map(goal => 
        goal._id === _id ? { ...goal, ...updates } : goal
      ));
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError(err.response?.data?.message || 'Failed to update goal. Please try again.');
      }
      console.error('Error updating goal:', err);
    }
  };

  const handleDeleteGoal = async (_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setGoals(goals.filter(goal => goal._id !== _id));
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError(err.response?.data?.message || 'Failed to delete goal. Please try again.');
      }
      console.error('Error deleting goal:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-md p-6 text-center text-gray-300">
        <p>Loading your goals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-md p-6">
        <div className="text-red-400 mb-4">{error}</div>
        <button 
          onClick={() => setError(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-100">
          <FiTarget className="mr-2 text-blue-400" /> Study Goals
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FiPlus className="mr-1" /> Add Goal
        </motion.button>
      </div>

      {/* Add Goal Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-gray-700 rounded-lg"
        >
          <h3 className="font-medium mb-3 text-gray-200">Create New Goal</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Goal Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Master React Hooks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="What do you want to achieve?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Target Days</label>
              <input
                type="number"
                value={newGoal.targetDays}
                onChange={(e) => setNewGoal({...newGoal, targetDays: e.target.value})}
                className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 30 (days)"
                min="1"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Save Goal
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No goals set yet. Add your first study goal!
          </div>
        ) : (
          goals.map((goal) => (
            <motion.div
              key={goal._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-lg p-4 ${
                goal.completed 
                  ? 'border-green-800 bg-green-900 bg-opacity-30' 
                  : 'border-gray-700 bg-gray-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg flex items-center text-gray-100">
                      {goal.title}
                      {goal.completed && (
                        <FiCheckCircle className="ml-2 text-green-400" />
                      )}
                    </h3>
                  </div>
                  <p className="text-gray-400 mt-1">{goal.description}</p>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">
                        {goal.progress}% completed
                      </span>
                      <span className={`font-medium ${
                        calculateDaysRemaining(goal.createdAt, goal.targetDays) < 3 
                          ? 'text-red-400' 
                          : 'text-gray-400'
                      }`}>
                        {calculateDaysRemaining(goal.createdAt, goal.targetDays)} days remaining
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          goal.progress < 30 ? 'bg-red-500' :
                          goal.progress < 70 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-3">
                  {!goal.completed && (
                    <>
                      <button
                        onClick={() => setEditingId(goal._id === editingId ? null : goal._id)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleUpdateGoal(goal._id, { completed: true, progress: 100 })}
                        className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                        title="Mark as complete"
                      >
                        <FiCheckCircle />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteGoal(goal._id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              
              {/* Edit Form */}
              {editingId === goal._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-700"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Progress (%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) => handleUpdateGoal(goal._id, { progress: parseInt(e.target.value) })}
                        className="w-full bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 text-sm bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
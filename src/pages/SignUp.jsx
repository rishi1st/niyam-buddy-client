import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiClock } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number: ''
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
  };

  const startCountdown = (seconds = 300) => {
    setCountdown(seconds);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = 'Phone must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.post('http://localhost:8080/api/user/auth/send-otp', formData);
      toast.success('OTP sent to your email! Valid for 5 minutes');
      startCountdown();
      setStep(2);
    } catch (error) {
      handleApiError(error, 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8080/api/user/auth/send-otp', formData);
      toast.success('New OTP sent to your email!');
      startCountdown();
    } catch (error) {
      handleApiError(error, 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/user/auth/verify-otp', {
        email: formData.email,
        otp
      });
      toast.success('Registration successful! Please sign in.');
      setIsLogin(true);
    } catch (error) {
      handleApiError(error, 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (error, defaultMessage) => {
    const message = error.response?.data?.message || defaultMessage;
    if (error.response?.status === 400) {
      if (message.includes('email')) setErrors(prev => ({ ...prev, email: message }));
      if (message.includes('phone')) setErrors(prev => ({ ...prev, number: message }));
    }
    toast.error(message);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {step === 1 ? 'Create Account' : 'Verify Email'}
        </h2>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full pl-10 pr-3 py-2 bg-gray-700 text-white border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full pl-10 pr-3 py-2 bg-gray-700 text-white border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="1234567890"
                maxLength="10"
                className={`w-full pl-10 pr-3 py-2 bg-gray-700 text-white border rounded-md ${errors.number ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            {errors.number && <p className="text-red-400 text-sm mt-1">{errors.number}</p>}
            <p className="text-xs text-gray-400 mt-1">10 digits without country code</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 bg-gray-700 text-white border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-gray-300" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-75 flex justify-center items-center"
          >
            {isLoading ? 'Sending OTP...' : 'Continue'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="text-center">
            <FiMail className="mx-auto h-12 w-12 text-purple-500 mb-3" />
            <h3 className="text-lg font-medium text-white">Verify Your Email</h3>
            <p className="text-sm text-gray-300 mt-1">
              We sent a code to <span className="font-semibold text-purple-300">{formData.email}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Enter OTP</label>
            <input
              value={otp}
              onChange={handleOtpChange}
              placeholder="123456"
              maxLength="6"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md text-center text-xl tracking-widest"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={`text-sm flex items-center ${countdown > 0 ? 'text-gray-500' : 'text-purple-400 hover:text-purple-300'}`}
            >
              <FiClock className="mr-1" />
              {countdown > 0 ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}` : 'Resend OTP'}
            </button>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-75 flex items-center"
            >
              {isLoading ? 'Verifying...' : (
                <>
                  Verify <FiCheckCircle className="ml-2" />
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              ← Back to registration
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
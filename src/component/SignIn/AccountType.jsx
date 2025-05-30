import { useState } from 'react';
import { GraduationCap, Users, Calendar, Shield, Zap, BookOpen, UserCheck, MessageCircle, BarChart3, Star, Clock, Target } from 'lucide-react';

const AccountType = ({ setPage }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900" style={{ backgroundColor: '#0a0e1a' }}>
      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Account Type
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Select the option that best describes your role
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24">
          {/* Teacher Card */}
          <div
            className="relative group"
            onMouseEnter={() => setHoveredCard('teacher')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 h-full transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">I'm a Teacher</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Create and manage classes, share resources, and track student progress
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span className="text-sm">Create unlimited classes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span className="text-sm">Schedule and manage sessions</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span className="text-sm">Share resources and attachments</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span className="text-sm">Track student attendance</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span className="text-sm">Generate invite codes</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setPage(3)}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Create Teacher Account
              </button>
            </div>
          </div>

          {/* Student Card */}
          <div
            className="relative group"
            onMouseEnter={() => setHoveredCard('student')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 h-full transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">I'm a Student</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Join classes, attend sessions, and access learning resources
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm">Join classes with invite codes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm">View upcoming sessions</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm">Access shared resources</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm">Track your progress</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm">Receive notifications</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setPage(2)}
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Create Student Account
              </button>
            </div>
          </div>
        </div>

        {/* Why Choose EduConnect Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose EduConnect?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful features designed for modern education
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Scheduling</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Intelligent scheduling system that works around everyone's availability
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enterprise-grade security to protect your data and privacy
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Optimized performance for seamless learning experiences
            </p>
          </div>
        </div>

        {/* Ready to Get Started Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students already using EduConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPage(3)}
              className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100"
            >
              Start as Teacher
            </button>
            <button
              onClick={() => setPage(2)}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-teal-700"
            >
              Start as Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountType;
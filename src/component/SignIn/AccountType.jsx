import { useState } from 'react';
import { GraduationCap, Users, Calendar, Shield, Zap } from 'lucide-react';

const AccountType = () => {
  const [selectedType, setSelectedType] = useState(null);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber === 2) {
      setSelectedType('student');
    } else if (pageNumber === 3) {
      setSelectedType('teacher');
    }
  };

  if (selectedType) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {selectedType === 'teacher' ? 'Teacher' : 'Student'} Account Selected!
          </h1>
          <p className="text-gray-400 mb-8">
            This would redirect to the {selectedType} registration form.
          </p>
          <button
            onClick={() => setSelectedType(null)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Choose Your Account Type
          </h1>
          <p className="text-xl text-gray-400">
            Select the option that best describes your role
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-20">
          
          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-10 hover:border-emerald-500 transition-all duration-300 group">
            <div className="flex items-center justify-center w-20 h-20 bg-emerald-900 rounded-2xl mb-8">
              <Users className="w-10 h-10 text-emerald-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">I'm a Teacher</h2>
            <p className="text-gray-300 text-lg mb-8">
              Create and manage classes, share resources, and track student progress
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                Create unlimited classes
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                Schedule and manage sessions
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                Share resources and attachments
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                Track student attendance
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                Generate invite codes
              </li>
            </ul>
            
            <button
              onClick={() => handlePageChange(3)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 text-lg"
            >
              Create Teacher Account
            </button>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-10 hover:border-blue-500 transition-all duration-300 group">
            <div className="flex items-center justify-center w-20 h-20 bg-blue-900 rounded-2xl mb-8">
              <GraduationCap className="w-10 h-10 text-blue-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">I'm a Student</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join classes, attend sessions, and access learning resources
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                Join classes with invite codes
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                View upcoming sessions
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                Access shared resources
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                Track your progress
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                Receive notifications
              </li>
            </ul>
            
            <button
              onClick={() => handlePageChange(2)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 text-lg"
            >
              Create Student Account
            </button>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose EduConnect?</h2>
          <p className="text-xl text-gray-400">
            Powerful features designed for modern education
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl mx-auto mb-6">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Scheduling</h3>
            <p className="text-gray-400">
              Intelligent scheduling system that works around everyone's availability
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl mx-auto mb-6">
              <Shield className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure & Private</h3>
            <p className="text-gray-400">
              Enterprise-grade security to protect your data and privacy
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl mx-auto mb-6">
              <Zap className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-400">
              Optimized performance for seamless learning experiences
            </p>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of educators and students already using EduConnect
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => handlePageChange(3)}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl transition-all duration-300 text-lg"
            >
              Start as Teacher
            </button>
            <button
              onClick={() => handlePageChange(2)}
              className="px-10 py-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 text-lg"
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
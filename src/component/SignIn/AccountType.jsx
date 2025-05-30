import { useState } from 'react';
import { GraduationCap, Users, Calendar, Shield, Zap } from 'lucide-react';

const AccountType = ({ setPage }) => {
  return (
    <div className="min-h-screen bg-slate-900" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Choose Your Account Type
          </h1>
          <p className="text-xl text-slate-400 font-light">
            Select the option that best describes your role
          </p>
        </div>

        {/* Main Cards */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-20">
          
          {/* Teacher Card */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group">
            <div className="flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-2xl mb-8 group-hover:bg-emerald-500/20 transition-colors">
              <Users className="w-10 h-10 text-emerald-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">I'm a Teacher</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Create and manage classes, share resources, and track student progress
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>Create unlimited classes</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>Schedule and manage sessions</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>Share resources and attachments</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>Track student attendance</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>Generate invite codes</li>
            </ul>
            
            <button
              onClick={() => setPage(3)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 text-lg"
            >
              Create Teacher Account
            </button>
          </div>

          {/* Student Card */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group">
            <div className="flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-2xl mb-8 group-hover:bg-blue-500/20 transition-colors">
              <GraduationCap className="w-10 h-10 text-blue-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">I'm a Student</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Join classes, attend sessions, and access learning resources
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>Join classes with invite codes</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>View upcoming sessions</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>Access shared resources</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>Track your progress</li>
              <li className="flex items-center text-slate-300"><div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>Receive notifications</li>
            </ul>
            
            <button
              onClick={() => setPage(2)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 text-lg"
            >
              Create Student Account
            </button>
          </div>
        </div>

        {/* Why Choose EduConnect */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose EduConnect?</h2>
          <p className="text-xl text-slate-400 font-light">
            Powerful features designed for modern education
          </p>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl mx-auto mb-6">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Scheduling</h3>
            <p className="text-slate-400 leading-relaxed">
              Intelligent scheduling system that works around everyone's availability
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl mx-auto mb-6">
              <Shield className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure & Private</h3>
            <p className="text-slate-400 leading-relaxed">
              Enterprise-grade security to protect your data and privacy
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl mx-auto mb-6">
              <Zap className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-slate-400 leading-relaxed">
              Optimized performance for seamless learning experiences
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of educators and students already using EduConnect
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setPage(3)}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 text-lg"
            >
              Start as Teacher
            </button>
            <button
              onClick={() => setPage(2)}
              className="px-10 py-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white font-semibold rounded-2xl transition-all duration-300 text-lg"
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

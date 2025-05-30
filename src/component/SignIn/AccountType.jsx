import { useState } from 'react';
import { GraduationCap, Users, Calendar, Shield, Zap, BookOpen, UserCheck, MessageCircle, BarChart3, Star, Clock, Target } from 'lucide-react';

const AccountType = ({ setPage }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const accountTypes = [
    {
      id: 'teacher',
      title: "I'm a Teacher",
      subtitle: "Create and manage classes, share resources, and track student progress",
      icon: Users,
      color: 'emerald',
      features: [
        { icon: BookOpen, text: "Create unlimited classes" },
        { icon: Calendar, text: "Schedule and manage sessions" },
        { icon: BarChart3, text: "Share resources and attachments" },
        { icon: Target, text: "Track student attendance" },
        { icon: MessageCircle, text: "Generate invite codes" }
      ],
      buttonText: "Create Teacher Account",
      page: 3
    },
    {
      id: 'student',
      title: "I'm a Student",
      subtitle: "Join classes, attend sessions, and access learning resources",
      icon: GraduationCap,
      color: 'blue',
      features: [
        { icon: UserCheck, text: "Join classes with invite codes" },
        { icon: Clock, text: "View upcoming sessions" },
        { icon: BookOpen, text: "Access shared resources" },
        { icon: BarChart3, text: "Track your progress" },
        { icon: Star, text: "Receive notifications" }
      ],
      buttonText: "Create Student Account",
      page: 2
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent scheduling system that works around everyone's availability"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security to protect your data and privacy"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for seamless learning experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Account Type
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Select the option that best describes your role
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {accountTypes.map((type) => {
            const IconComponent = type.icon;
            const isHovered = hoveredCard === type.id;
            
            return (
              <div
                key={type.id}
                className={`relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:border-${type.color}-500/50 hover:shadow-2xl hover:shadow-${type.color}-500/20 cursor-pointer`}
                onMouseEnter={() => setHoveredCard(type.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${type.color}-500/10 to-transparent rounded-2xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-${type.color}-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${isHovered ? `bg-${type.color}-500/30` : ''}`}>
                    <IconComponent className={`w-8 h-8 text-${type.color}-400`} />
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-2xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-slate-300 mb-8">{type.subtitle}</p>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {type.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={index} className="flex items-center text-slate-200">
                          <FeatureIcon className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setPage(type.page)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                      type.color === 'emerald' 
                        ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/25' 
                        : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25'
                    } hover:shadow-xl transform hover:-translate-y-0.5`}
                  >
                    {type.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose EduConnect Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose EduConnect?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Powerful features designed for modern education
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-600/50 transition-colors duration-300">
                  <FeatureIcon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Ready to Get Started Section */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-600/30">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students already using EduConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPage(3)}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
            >
              Start as Teacher
            </button>
            <button
              onClick={() => setPage(2)}
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg border border-slate-600 hover:border-slate-500"
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
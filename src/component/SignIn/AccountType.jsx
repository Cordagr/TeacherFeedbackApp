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
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#1a202c', // bg-gray-900
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          textAlign: 'center', // text-center
        }}>
          <h1 style={{
            fontSize: '2.25rem', // text-4xl
            fontWeight: 'bold', // font-bold
            color: '#ffffff', // text-white
            marginBottom: '1rem', // mb-4
          }}>
            {selectedType === 'teacher' ? 'Teacher' : 'Student'} Account Selected!
          </h1>
          <p style={{
            color: '#a0aec0', // text-gray-400
            marginBottom: '2rem', // mb-8
          }}>
            This would redirect to the {selectedType} registration form.
          </p>
          <button
            onClick={() => setSelectedType(null)}
            // Note: Hover effects are not directly possible with inline styles.
            // You'd need a separate solution (e.g., useState for hover state)
            // or external CSS for true hover effects.
            style={{
              paddingLeft: '1.5rem', // px-6
              paddingRight: '1.5rem', // px-6
              paddingTop: '0.75rem', // py-3
              paddingBottom: '0.75rem', // py-3
              backgroundColor: '#4a5568', // bg-gray-700
              color: '#ffffff', // text-white
              borderRadius: '0.5rem', // rounded-lg
              transition: 'background-color 0.3s ease-in-out', // transition-colors
              border: 'none', // Remove default button border
              cursor: 'pointer', // Indicate it's clickable
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a202c', // bg-gray-900
    }}>
      <div style={{
        maxWidth: '1280px', // container equivalent, assuming max-w-7xl
        margin: '0 auto', // mx-auto
        paddingLeft: '1rem', // px-4
        paddingRight: '1rem', // px-4
        paddingTop: '4rem', // py-16
        paddingBottom: '4rem', // py-16
      }}>

        <div style={{
          textAlign: 'center', // text-center
          marginBottom: '4rem', // mb-16
        }}>
          <h1 style={{
            fontSize: '3rem', // text-5xl
            fontWeight: 'bold', // font-bold
            color: '#ffffff', // text-white
            marginBottom: '1.5rem', // mb-6
          }}>
            Choose Your Account Type
          </h1>
          <p style={{
            fontSize: '1.25rem', // text-xl
            color: '#a0aec0', // text-gray-400
          }}>
            Select the option that best describes your role
          </p>
        </div>

        <div style={{
          maxWidth: '72rem', // max-w-6xl
          margin: '0 auto', // mx-auto
          display: 'grid', // grid
          // For responsive grid: lg:grid-cols-2, this would require media queries
          // which are not directly supported by inline styles.
          // You'd need to manually check screen size with JavaScript
          // or use a different styling approach.
          gap: '2rem', // gap-8
          marginBottom: '5rem', // mb-20
        }}>

          {/* Teacher Card */}
          <div style={{
            backgroundColor: '#2d3748', // bg-gray-800
            border: '1px solid #4a5568', // border border-gray-700
            borderRadius: '1.5rem', // rounded-3xl
            padding: '2.5rem', // p-10
            // Hover effect for border-emerald-500 is not directly inline.
            // You could use onMouseEnter/onMouseLeave to change the border style.
            transition: 'border-color 0.3s ease-in-out', // transition-all duration-300
          }}>
            <div style={{
              display: 'flex', // flex
              alignItems: 'center', // items-center
              justifyContent: 'center', // justify-center
              width: '5rem', // w-20
              height: '5rem', // h-20
              backgroundColor: '#064e3b', // bg-emerald-900
              borderRadius: '1rem', // rounded-2xl
              marginBottom: '2rem', // mb-8
            }}>
              <Users style={{
                width: '2.5rem', // w-10
                height: '2.5rem', // h-10
                color: '#6ee7b7', // text-emerald-400
              }} />
            </div>

            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: 'bold', // font-bold
              color: '#ffffff', // text-white
              marginBottom: '1rem', // mb-4
            }}>I'm a Teacher</h2>
            <p style={{
              color: '#cbd5e0', // text-gray-300
              fontSize: '1.125rem', // text-lg
              marginBottom: '2rem', // mb-8
            }}>
              Create and manage classes, share resources, and track student progress
            </p>

            <ul style={{
              listStyleType: 'none', // Remove default list styling
              padding: 0,
              // space-y-4 is for margin-bottom on direct children,
              // handled by adding marginBottom to each li
            }}>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}> {/* space-y-4 */}
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#6ee7b7', borderRadius: '9999px', marginRight: '1rem' }}></div> {/* w-2 h-2 bg-emerald-400 rounded-full mr-4 */}
                Create unlimited classes
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#6ee7b7', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Schedule and manage sessions
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#6ee7b7', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Share resources and attachments
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#6ee7b7', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Track student attendance
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0' }}> {/* No mb on last item for space-y-4 */}
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#6ee7b7', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Generate invite codes
              </li>
            </ul>

            <button
              onClick={() => handlePageChange(3)}
              style={{
                width: '100%', // w-full
                backgroundColor: '#059669', // bg-emerald-600
                color: '#ffffff', // text-white
                fontWeight: 'semibold', // font-semibold
                paddingTop: '1rem', // py-4
                paddingBottom: '1rem', // py-4
                paddingLeft: '2rem', // px-8
                paddingRight: '2rem', // px-8
                borderRadius: '1rem', // rounded-2xl
                transition: 'background-color 0.3s ease-in-out', // transition-all duration-300
                fontSize: '1.125rem', // text-lg
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Create Teacher Account
            </button>
          </div>

          {/* Student Card - This will follow the same pattern as Teacher Card */}
          <div style={{
            backgroundColor: '#2d3748', // bg-gray-800
            border: '1px solid #4a5568', // border border-gray-700
            borderRadius: '1.5rem', // rounded-3xl
            padding: '2.5rem', // p-10
            transition: 'border-color 0.3s ease-in-out',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '5rem', height: '5rem',
              backgroundColor: '#1e3a8a', // bg-blue-900
              borderRadius: '1rem',
              marginBottom: '2rem',
            }}>
              <GraduationCap style={{ width: '2.5rem', height: '2.5rem', color: '#60a5fa' }} /> {/* text-blue-400 */}
            </div>

            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem' }}>I'm a Student</h2>
            <p style={{ color: '#cbd5e0', fontSize: '1.125rem', marginBottom: '2rem' }}>
              Join classes, attend sessions, and access learning resources
            </p>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#60a5fa', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Join classes with invite codes
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#60a5fa', borderRadius: '9999px', marginRight: '1rem' }}></div>
                View upcoming sessions
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#60a5fa', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Access shared resources
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0', marginBottom: '1rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#60a5fa', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Track your progress
              </li>
              <li style={{ display: 'flex', alignItems: 'center', color: '#cbd5e0' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#60a5fa', borderRadius: '9999px', marginRight: '1rem' }}></div>
                Receive notifications
              </li>
            </ul>

            <button
              onClick={() => handlePageChange(2)}
              style={{
                width: '100%',
                backgroundColor: '#2563eb', // bg-blue-600
                color: '#ffffff',
                fontWeight: 'semibold',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                borderRadius: '1rem',
                transition: 'background-color 0.3s ease-in-out',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Create Student Account
            </button>
          </div>
        </div>

        {/* Why Choose EduConnect? Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
        }}>
          <h2 style={{
            fontSize: '2.25rem', // text-4xl
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '1.5rem',
          }}>Why Choose EduConnect?</h2>
          <p style={{
            fontSize: '1.25rem', // text-xl
            color: '#a0aec0',
          }}>
            Powerful features designed for modern education
          </p>
        </div>

        <div style={{
          maxWidth: '64rem', // max-w-5xl
          margin: '0 auto',
          display: 'grid',
          // md:grid-cols-3 requires media queries for responsive layout
          gap: '3rem', // gap-12
          marginBottom: '5rem',
        }}>
          {/* Smart Scheduling */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '4rem', height: '4rem',
              backgroundColor: '#2d3748', // bg-gray-800
              border: '1px solid #4a5568', // border border-gray-700
              borderRadius: '1rem', // rounded-2xl
              margin: '0 auto', // mx-auto
              marginBottom: '1.5rem', // mb-6
            }}>
              <Calendar style={{ width: '2rem', height: '2rem', color: '#a0aec0' }} /> {/* text-gray-400 */}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem' }}>Smart Scheduling</h3>
            <p style={{ color: '#a0aec0' }}>
              Intelligent scheduling system that works around everyone's availability
            </p>
          </div>

          {/* Secure & Private */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '4rem', height: '4rem',
              backgroundColor: '#2d3748',
              border: '1px solid #4a5568',
              borderRadius: '1rem',
              margin: '0 auto',
              marginBottom: '1.5rem',
            }}>
              <Shield style={{ width: '2rem', height: '2rem', color: '#a0aec0' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem' }}>Secure & Private</h3>
            <p style={{ color: '#a0aec0' }}>
              Enterprise-grade security to protect your data and privacy
            </p>
          </div>

          {/* Lightning Fast */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '4rem', height: '4rem',
              backgroundColor: '#2d3748',
              border: '1px solid #4a5568',
              borderRadius: '1rem',
              margin: '0 auto',
              marginBottom: '1.5rem',
            }}>
              <Zap style={{ width: '2rem', height: '2rem', color: '#a0aec0' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem' }}>Lightning Fast</h3>
            <p style={{ color: '#a0aec0' }}>
              Optimized performance for seamless learning experiences
            </p>
          </div>
        </div>

        {/* Ready to Get Started? */}
        <div style={{
          backgroundColor: '#2d3748', // bg-gray-800
          border: '1px solid #718096', // border border-gray-600
          borderRadius: '1.5rem', // rounded-3xl
          padding: '3rem', // p-12
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '2.25rem', // text-4xl
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '1.5rem',
          }}>Ready to Get Started?</h2>
          <p style={{
            fontSize: '1.25rem', // text-xl
            color: '#cbd5e0', // text-gray-300
            marginBottom: '2.5rem', // mb-10
            maxWidth: '42rem', // max-w-2xl
            margin: '0 auto', // mx-auto (for text block)
          }}>
            Join thousands of educators and students already using EduConnect
          </p>

          <div style={{
            display: 'flex', // flex
            flexDirection: 'column', // flex-col
            gap: '1.5rem', // gap-6
            justifyContent: 'center', // justify-center
          }}>
            <button
              onClick={() => handlePageChange(3)}
              style={{
                paddingLeft: '2.5rem', // px-10
                paddingRight: '2.5rem', // px-10
                paddingTop: '1rem', // py-4
                paddingBottom: '1rem', // py-4
                backgroundColor: '#059669', // bg-emerald-600
                color: '#ffffff',
                fontWeight: 'semibold',
                borderRadius: '1rem', // rounded-2xl
                transition: 'background-color 0.3s ease-in-out',
                fontSize: '1.125rem', // text-lg
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Start as Teacher
            </button>
            <button
              onClick={() => handlePageChange(2)}
              style={{
                paddingLeft: '2.5rem', // px-10
                paddingRight: '2.5rem', // px-10
                paddingTop: '1rem', // py-4
                paddingBottom: '1rem', // py-4
                backgroundColor: '#4a5568', // bg-gray-700
                color: '#ffffff',
                fontWeight: 'semibold',
                borderRadius: '1rem', // rounded-2xl
                transition: 'background-color 0.3s ease-in-out',
                fontSize: '1.125rem', // text-lg
                border: '1px solid #718096', // border border-gray-600
                cursor: 'pointer',
              }}
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
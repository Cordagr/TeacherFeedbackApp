import React, { useState } from 'react';
import { GraduationCap, Users } from 'lucide-react';
import StudentFields from './StudentFields';  // Adjust path as needed
import CollegeFields from './CollegeFields';  // Adjust path as needed

const AccountType = () => {
  const [page, setPage] = useState(1); // 1: selection, 2: student, 3: teacher

  if (page === 2) return <StudentFields onBack={() => setPage(1)} />;
  if (page === 3) return <CollegeFields onBack={() => setPage(1)} />;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a202c',
      padding: '4rem 1rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: '4rem',
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '1.5rem',
        }}>
          Choose Your Account Type
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#a0aec0',
        }}>
          Select the option that best describes your role
        </p>
      </div>

      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
      }}>
        {/* Teacher Card */}
        <div style={{
          backgroundColor: '#2d3748',
          border: '1px solid #4a5568',
          borderRadius: '1.5rem',
          padding: '2.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '5rem',
            height: '5rem',
            backgroundColor: '#064e3b',
            borderRadius: '1rem',
            marginBottom: '2rem',
          }}>
            <Users style={{
              width: '2.5rem',
              height: '2.5rem',
              color: '#6ee7b7',
            }} />
          </div>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '1rem',
          }}>I'm a Teacher</h2>
          <p style={{
            color: '#cbd5e0',
            fontSize: '1.125rem',
            marginBottom: '2rem',
          }}>
            Create and manage classes, share resources, and track student progress
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            {[
              'Create unlimited classes',
              'Schedule and manage sessions',
              'Share resources and attachments',
              'Track student attendance',
              'Generate invite codes',
            ].map((item, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'center',
                color: '#cbd5e0',
                marginBottom: index !== 4 ? '1rem' : 0,
              }}>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: '#6ee7b7',
                  borderRadius: '9999px',
                  marginRight: '1rem',
                }}></div>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setPage(3)}
            style={{
              width: '100%',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontWeight: '600',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create Teacher Account
          </button>
        </div>

        {/* Student Card */}
        <div style={{
          backgroundColor: '#2d3748',
          border: '1px solid #4a5568',
          borderRadius: '1.5rem',
          padding: '2.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '5rem',
            height: '5rem',
            backgroundColor: '#1e3a8a',
            borderRadius: '1rem',
            marginBottom: '2rem',
          }}>
            <GraduationCap style={{
              width: '2.5rem',
              height: '2.5rem',
              color: '#60a5fa',
            }} />
          </div>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '1rem',
          }}>I'm a Student</h2>
          <p style={{
            color: '#cbd5e0',
            fontSize: '1.125rem',
            marginBottom: '2rem',
          }}>
            Join classes, submit feedback, and access shared learning materials
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            {[
              'Join classes via invite code',
              'View session schedules',
              'Give feedback to instructors',
              'Access shared documents',
              'Track your progress',
            ].map((item, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'center',
                color: '#cbd5e0',
                marginBottom: index !== 4 ? '1rem' : 0,
              }}>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: '#60a5fa',
                  borderRadius: '9999px',
                  marginRight: '1rem',
                }}></div>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setPage(2)}
            style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              fontWeight: '600',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create Student Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountType;

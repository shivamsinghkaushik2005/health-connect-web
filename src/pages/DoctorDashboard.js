import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaVideo, FaFilePrescription, FaUserMd, FaBell } from 'react-icons/fa';
import '../styles/Dashboard.css';

const DoctorDashboard = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
          // In a real app, we would fetch data from Firestore
          // fetchDoctorData(user.uid);
          fetchMockData();
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    };

    checkAuth();
  }, []);

  const fetchMockData = () => {
    // Mock upcoming appointments
    setActiveAppointments([
      {
        id: '1',
        patientName: 'राजेश कुमार',
        patientAge: 45,
        date: '2023-05-15',
        time: '10:00 AM',
        type: 'वीडियो',
        issue: 'सिरदर्द और बुखार',
        status: 'pending'
      },
      {
        id: '2',
        patientName: 'सुनीता देवी',
        patientAge: 35,
        date: '2023-05-15',
        time: '11:30 AM',
        type: 'वीडियो',
        issue: 'पेट दर्द',
        status: 'confirmed'
      },
      {
        id: '3',
        patientName: 'अमित शर्मा',
        patientAge: 28,
        date: '2023-05-16',
        time: '9:00 AM',
        type: 'क्लिनिक',
        issue: 'त्वचा की समस्या',
        status: 'confirmed'
      }
    ]);

    // Mock completed appointments
    setCompletedAppointments([
      {
        id: '4',
        patientName: 'प्रिया सिंह',
        patientAge: 32,
        date: '2023-05-10',
        time: '3:00 PM',
        type: 'वीडियो',
        issue: 'एलर्जी',
        hasPrescription: true
      },
      {
        id: '5',
        patientName: 'मोहन लाल',
        patientAge: 56,
        date: '2023-05-12',
        time: '5:30 PM',
        type: 'क्लिनिक',
        issue: 'जोड़ों का दर्द',
        hasPrescription: true
      }
    ]);

    // Mock notifications
    setNotifications([
      {
        id: '1',
        message: 'नई अपॉइंटमेंट अनुरोध - राजेश कुमार',
        time: '10 मिनट पहले',
        read: false
      },
      {
        id: '2',
        message: 'रोगी सुनीता देवी ने अपनी दवा के बारे में प्रश्न पूछा है',
        time: '1 घंटा पहले',
        read: false
      },
      {
        id: '3',
        message: 'आज 11:30 AM पर वीडियो कंसल्टेशन',
        time: '2 घंटे पहले',
        read: true
      }
    ]);
  };

  const handleAcceptAppointment = (id) => {
    setActiveAppointments(
      activeAppointments.map(app => 
        app.id === id ? { ...app, status: 'confirmed' } : app
      )
    );
  };

  const handleRejectAppointment = (id) => {
    setActiveAppointments(
      activeAppointments.filter(app => app.id !== id)
    );
  };

  const handleStartConsultation = (appointmentId) => {
    // In a real app, redirect to video consultation room
    console.log(`Starting consultation for appointment ${appointmentId}`);
  };

  const handleCreatePrescription = (appointmentId) => {
    // In a real app, redirect to prescription form
    console.log(`Creating prescription for appointment ${appointmentId}`);
  };

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  if (!user) {
    return (
      <div className="auth-redirect">
        <p>{t('pleaseLogin')}</p>
        <Link to="/auth" className="btn primary-btn">
          {t('login')}
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard doctor-dashboard">
      <div className="dashboard-header">
        <h1>{t('doctorDashboard')}</h1>
        <div className="notifications-icon">
          <FaBell />
          <span className="notification-badge">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <FaCalendarAlt className="stat-icon" />
          <div className="stat-content">
            <h3>{activeAppointments.length}</h3>
            <p>{t('upcomingAppointments')}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaVideo className="stat-icon" />
          <div className="stat-content">
            <h3>{activeAppointments.filter(app => app.type === 'वीडियो').length}</h3>
            <p>{t('videoConsultations')}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUserMd className="stat-icon" />
          <div className="stat-content">
            <h3>{completedAppointments.length}</h3>
            <p>{t('patientsAttended')}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>{t('todaysAppointments')}</h2>
        <div className="appointment-list">
          {activeAppointments.filter(app => app.date === '2023-05-15').length > 0 ? (
            activeAppointments
              .filter(app => app.date === '2023-05-15')
              .map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-details">
                    <h3>{appointment.patientName}, {appointment.patientAge}</h3>
                    <p><strong>{t('time')}:</strong> {appointment.time}</p>
                    <p><strong>{t('type')}:</strong> {appointment.type}</p>
                    <p><strong>{t('issue')}:</strong> {appointment.issue}</p>
                  </div>
                  <div className="appointment-actions">
                    {appointment.status === 'pending' ? (
                      <>
                        <button 
                          className="btn accept-btn" 
                          onClick={() => handleAcceptAppointment(appointment.id)}
                        >
                          {t('accept')}
                        </button>
                        <button 
                          className="btn reject-btn" 
                          onClick={() => handleRejectAppointment(appointment.id)}
                        >
                          {t('reject')}
                        </button>
                      </>
                    ) : (
                      <>
                        {appointment.type === 'वीडियो' && (
                          <Link 
                            to={`/video-consultation/${appointment.id}`}
                            className="btn video-btn"
                          >
                            <FaVideo /> {t('startConsultation')}
                          </Link>
                        )}
                        <Link 
                          to={`/prescription/new?patient=${encodeURIComponent(appointment.patientName)}`}
                          className="btn prescription-btn"
                        >
                          <FaFilePrescription /> {t('createPrescription')}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <p className="no-data-message">{t('noAppointmentsToday')}</p>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>{t('upcomingAppointments')}</h2>
        <div className="appointment-list">
          {activeAppointments.filter(app => app.date !== '2023-05-15').length > 0 ? (
            activeAppointments
              .filter(app => app.date !== '2023-05-15')
              .map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-details">
                    <h3>{appointment.patientName}, {appointment.patientAge}</h3>
                    <p><strong>{t('date')}:</strong> {appointment.date}</p>
                    <p><strong>{t('time')}:</strong> {appointment.time}</p>
                    <p><strong>{t('type')}:</strong> {appointment.type}</p>
                    <p><strong>{t('issue')}:</strong> {appointment.issue}</p>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status === 'confirmed' ? t('confirmed') : t('pending')}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <p className="no-data-message">{t('noUpcomingAppointments')}</p>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>{t('pastConsultations')}</h2>
        <div className="appointment-list">
          {completedAppointments.length > 0 ? (
            completedAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card completed">
                <div className="appointment-details">
                  <h3>{appointment.patientName}, {appointment.patientAge}</h3>
                  <p><strong>{t('date')}:</strong> {appointment.date}</p>
                  <p><strong>{t('issue')}:</strong> {appointment.issue}</p>
                </div>
                <div className="appointment-actions">
                  {appointment.hasPrescription ? (
                    <Link 
                      to={`/prescription/${appointment.id}`} 
                      className="btn view-prescription-btn"
                    >
                      <FaFilePrescription /> {t('viewPrescription')}
                    </Link>
                  ) : (
                    <Link 
                      to={`/prescription/new?patient=${encodeURIComponent(appointment.patientName)}`} 
                      className="btn prescription-btn"
                    >
                      <FaFilePrescription /> {t('createPrescription')}
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-data-message">{t('noPastConsultations')}</p>
          )}
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="dashboard-section">
        <h2>{t('notifications')}</h2>
        <div className="notifications-list">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              >
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
            ))
          ) : (
            <p className="no-data-message">{t('noNotifications')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 
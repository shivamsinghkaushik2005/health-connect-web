import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const PatientDashboard = ({ user, notifications = [], upcomingAppointments = [] }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [recentReports, setRecentReports] = useState([]);

  useEffect(() => {
    // In a real app, we would fetch data from Firebase
    // For now, let's use mock data
    const mockPrescriptions = [
      {
        id: 'p1',
        date: '2023-07-15',
        doctor: 'Dr. Rahul Sharma',
        speciality: 'Cardiologist',
        medications: [
          { name: 'Atenolol', dosage: '50mg', frequency: 'Once daily', duration: '30 days' },
          { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days' }
        ]
      },
      {
        id: 'p2',
        date: '2023-06-28',
        doctor: 'Dr. Priya Patel',
        speciality: 'General Physician',
        medications: [
          { name: 'Paracetamol', dosage: '500mg', frequency: 'As needed', duration: '7 days' },
          { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '5 days' }
        ]
      }
    ];

    const mockReports = [
      {
        id: 'r1',
        date: '2023-07-10',
        name: 'Complete Blood Count',
        lab: 'City Diagnostics',
        status: 'completed'
      },
      {
        id: 'r2',
        date: '2023-06-25',
        name: 'Lipid Profile',
        lab: 'Health Labs',
        status: 'completed'
      }
    ];

    setRecentPrescriptions(mockPrescriptions);
    setRecentReports(mockReports);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  const vitalStats = [
    { label: t('upcomingAppointments'), value: upcomingAppointments.length },
    { label: t('activePrescriptions'), value: recentPrescriptions.length },
    { label: t('recentReports'), value: recentReports.length }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{t('patientDashboard')}</h1>
        <div className="notifications-icon">
          <span className="material-icons">notifications</span>
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </div>
      </div>

      <div className="stats-container">
        {vitalStats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>{t('quickActions')}</h2>
        <div className="action-buttons">
          <Link to="/find-doctors" className="action-button">
            <span className="material-icons">search</span>
            {t('findDoctors')}
          </Link>
          <Link to="/appointments/new" className="action-button">
            <span className="material-icons">event</span>
            {t('bookAppointment')}
          </Link>
          <Link to="/reports/upload" className="action-button">
            <span className="material-icons">upload_file</span>
            {t('uploadReport')}
          </Link>
        </div>
      </div>

      <div className="appointments-section">
        <div className="section-header">
          <h2>{t('upcomingAppointments')}</h2>
          <Link to="/appointments" className="view-all">{t('viewAll')}</Link>
        </div>
        
        {upcomingAppointments.length === 0 ? (
          <p className="no-data-message">{t('noUpcomingAppointments')}</p>
        ) : (
          <div className="appointment-cards">
            {upcomingAppointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-info">
                  <h3>{appointment.doctorName}</h3>
                  <p>{appointment.speciality}</p>
                  <div className="appointment-details">
                    <span>
                      <span className="material-icons">event</span>
                      {appointment.date}
                    </span>
                    <span>
                      <span className="material-icons">schedule</span>
                      {appointment.time}
                    </span>
                  </div>
                </div>
                <div className="appointment-actions">
                  {appointment.isVideoConsultation && (
                    <Link to={`/video-consultation/${appointment.id}`} className="action-btn video-btn">
                      <span className="material-icons">videocam</span>
                      {t('videoConsultation')}
                    </Link>
                  )}
                  <button className="action-btn cancel-btn">
                    <span className="material-icons">close</span>
                    {t('cancel')}
                  </button>
                  <button className="action-btn reschedule-btn">
                    <span className="material-icons">update</span>
                    {t('reschedule')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="prescriptions-section">
        <div className="section-header">
          <h2>{t('recentPrescriptions')}</h2>
          <Link to="/prescriptions" className="view-all">{t('viewAll')}</Link>
        </div>
        
        {recentPrescriptions.length === 0 ? (
          <p className="no-data-message">{t('noPrescriptions')}</p>
        ) : (
          <div className="prescription-cards">
            {recentPrescriptions.map((prescription) => (
              <div className="prescription-card" key={prescription.id}>
                <div className="prescription-info">
                  <h3>{prescription.doctor}</h3>
                  <p>{prescription.speciality}</p>
                  <div className="prescription-date">
                    <span className="material-icons">event</span>
                    {prescription.date}
                  </div>
                  <div className="prescription-meds">
                    <h4>{t('medications')}:</h4>
                    <ul>
                      {prescription.medications.map((med, index) => (
                        <li key={index}>{med.name} - {med.dosage}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="prescription-actions">
                  <Link to={`/prescription/${prescription.id}`} className="action-btn view-btn">
                    <span className="material-icons">visibility</span>
                    {t('viewPrescription')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="reports-section">
        <div className="section-header">
          <h2>{t('recentReports')}</h2>
          <Link to="/reports" className="view-all">{t('viewAll')}</Link>
        </div>
        
        {recentReports.length === 0 ? (
          <p className="no-data-message">{t('noReports')}</p>
        ) : (
          <div className="report-cards">
            {recentReports.map((report) => (
              <div className="report-card" key={report.id}>
                <div className="report-info">
                  <h3>{report.name}</h3>
                  <p>{report.lab}</p>
                  <div className="report-date">
                    <span className="material-icons">event</span>
                    {report.date}
                  </div>
                </div>
                <div className="report-actions">
                  <Link to={`/report/${report.id}`} className="action-btn download-btn">
                    <span className="material-icons">cloud_download</span>
                    {t('downloadReport')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard; 
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DoctorSearch from './pages/DoctorSearch';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PharmacyDashboard from './pages/PharmacyDashboard';
import LabDashboard from './pages/LabDashboard';
import HealthCamps from './pages/HealthCamps';
import WomensHealthPage from './pages/WomensHealthPage';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import mockNotifications from './data/mockNotifications';
import mockUpcomingAppointments from './data/mockAppointments';

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // In a real app, you would fetch user type from Firestore
        // For now, we'll simulate by getting it from localStorage
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType || 'patient');
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }
  
  const getDashboardComponent = () => {
    switch(userType) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'pharmacy':
        return <PharmacyDashboard />;
      case 'lab':
        return <LabDashboard />;
      case 'patient':
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} auth={auth} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/find-doctors" element={<DoctorSearch />} />
          <Route 
            path="/patient-dashboard" 
            element={user ? <PatientDashboard user={user} notifications={mockNotifications} upcomingAppointments={mockUpcomingAppointments} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/doctor-dashboard" 
            element={user ? <DoctorDashboard /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/pharmacy-dashboard" 
            element={user ? <PharmacyDashboard /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/lab-dashboard" 
            element={user ? <LabDashboard /> : <Navigate to="/auth" />} 
          />
          <Route path="/health-camps" element={<HealthCamps />} />
          <Route path="/womens-health" element={<WomensHealthPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                userType ? getDashboardComponent() : <PatientDashboard />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
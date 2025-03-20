import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // States
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get patients (users with userType = 'patient')
        const patientsRes = await fetch('http://localhost:5000/api/users');
        if (!patientsRes.ok) throw new Error('Failed to fetch patients');
        const patientsData = await patientsRes.json();
        setPatients(patientsData.filter(user => user.userType === 'patient'));
        
        // Get doctors
        const doctorsRes = await fetch('http://localhost:5000/api/doctors');
        if (!doctorsRes.ok) throw new Error('Failed to fetch doctors');
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData);
        
        // Get pharmacies
        const pharmaciesRes = await fetch('http://localhost:5000/api/pharmacies');
        if (!pharmaciesRes.ok) throw new Error('Failed to fetch pharmacies');
        const pharmaciesData = await pharmaciesRes.json();
        setPharmacies(pharmaciesData);
        
        // Get labs
        const labsRes = await fetch('http://localhost:5000/api/labs');
        if (!labsRes.ok) throw new Error('Failed to fetch labs');
        const labsData = await labsRes.json();
        setLabs(labsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Error fetching data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Render patient list
  const renderPatientsList = () => {
    if (patients.length === 0) {
      return <p className="no-data">No patients found</p>;
    }
    
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.email || '-'}</td>
              <td>{patient.age || '-'}</td>
              <td>{patient.gender || '-'}</td>
              <td>
                <button 
                  className="action-button view-button"
                  onClick={() => alert(`View patient ${patient.name}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Render doctors list
  const renderDoctorsList = () => {
    if (doctors.length === 0) {
      return <p className="no-data">No doctors found</p>;
    }
    
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Speciality</th>
            <th>License Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.speciality || '-'}</td>
              <td>{doctor.licenseNumber || '-'}</td>
              <td>
                <span className={`status-badge ${doctor.isVerified ? 'verified' : 'pending'}`}>
                  {doctor.status}
                </span>
              </td>
              <td>
                <button 
                  className="action-button view-button"
                  onClick={() => alert(`View doctor ${doctor.name}`)}
                >
                  View
                </button>
                {!doctor.isVerified && (
                  <button 
                    className="action-button approve-button"
                    onClick={() => alert(`Approve doctor ${doctor.name}`)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Render pharmacies list
  const renderPharmaciesList = () => {
    if (pharmacies.length === 0) {
      return <p className="no-data">No pharmacies found</p>;
    }
    
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>License Number</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map(pharmacy => (
            <tr key={pharmacy._id}>
              <td>{pharmacy.name}</td>
              <td>{pharmacy.phoneNumber}</td>
              <td>{pharmacy.licenseNumber || '-'}</td>
              <td>{pharmacy.address || '-'}</td>
              <td>
                <span className={`status-badge ${pharmacy.isVerified ? 'verified' : 'pending'}`}>
                  {pharmacy.status}
                </span>
              </td>
              <td>
                <button 
                  className="action-button view-button"
                  onClick={() => alert(`View pharmacy ${pharmacy.name}`)}
                >
                  View
                </button>
                {!pharmacy.isVerified && (
                  <button 
                    className="action-button approve-button"
                    onClick={() => alert(`Approve pharmacy ${pharmacy.name}`)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Render labs list
  const renderLabsList = () => {
    if (labs.length === 0) {
      return <p className="no-data">No labs found</p>;
    }
    
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>License Number</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labs.map(lab => (
            <tr key={lab._id}>
              <td>{lab.name}</td>
              <td>{lab.phoneNumber}</td>
              <td>{lab.licenseNumber || '-'}</td>
              <td>{lab.address || '-'}</td>
              <td>
                <span className={`status-badge ${lab.isVerified ? 'verified' : 'pending'}`}>
                  {lab.status}
                </span>
              </td>
              <td>
                <button 
                  className="action-button view-button"
                  onClick={() => alert(`View lab ${lab.name}`)}
                >
                  View
                </button>
                {!lab.isVerified && (
                  <button 
                    className="action-button approve-button"
                    onClick={() => alert(`Approve lab ${lab.name}`)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users, doctors, pharmacies, and labs</p>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button 
          className={`tab-button ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button 
          className={`tab-button ${activeTab === 'pharmacies' ? 'active' : ''}`}
          onClick={() => setActiveTab('pharmacies')}
        >
          Pharmacies
        </button>
        <button 
          className={`tab-button ${activeTab === 'labs' ? 'active' : ''}`}
          onClick={() => setActiveTab('labs')}
        >
          Diagnostic Labs
        </button>
      </div>
      
      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading data...</div>
        ) : error ? (
          <div className="error-message">
            {error}
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="data-container">
            {activeTab === 'patients' && renderPatientsList()}
            {activeTab === 'doctors' && renderDoctorsList()}
            {activeTab === 'pharmacies' && renderPharmaciesList()}
            {activeTab === 'labs' && renderLabsList()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 
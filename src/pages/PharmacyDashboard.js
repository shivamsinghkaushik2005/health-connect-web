import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { useTranslation } from 'react-i18next';
import { FaPills, FaClipboardList, FaBoxes, FaSearch, FaShippingFast, FaBell } from 'react-icons/fa';
import '../styles/Dashboard.css';

const PharmacyDashboard = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('prescriptions');

  useEffect(() => {
    const checkAuth = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
          // In a real app, we would fetch data from Firestore
          // fetchPharmacyData(user.uid);
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
    // Mock prescriptions
    setPrescriptions([
      {
        id: '1',
        patientName: 'राजेश कुमार',
        doctorName: 'डॉ. आनंद शर्मा',
        date: '2023-05-14',
        status: 'pending',
        medications: [
          { name: 'पेरासिटामोल 500mg', dosage: '1-0-1', duration: '5 दिन', quantity: 10 },
          { name: 'सेट्रिजीन 10mg', dosage: '0-0-1', duration: '7 दिन', quantity: 7 }
        ]
      },
      {
        id: '2',
        patientName: 'सुनीता देवी',
        doctorName: 'डॉ. प्रीति सिंह',
        date: '2023-05-15',
        status: 'processing',
        medications: [
          { name: 'एमॉक्सिसिलिन 500mg', dosage: '1-0-1', duration: '7 दिन', quantity: 14 },
          { name: 'आइबुप्रोफेन 400mg', dosage: '1-1-1', duration: '3 दिन', quantity: 9 }
        ]
      },
      {
        id: '3',
        patientName: 'मोहन लाल',
        doctorName: 'डॉ. विकास गुप्ता',
        date: '2023-05-13',
        status: 'completed',
        medications: [
          { name: 'एस्पिरिन 75mg', dosage: '0-1-0', duration: '30 दिन', quantity: 30 },
          { name: 'अटोरवास्टेटिन 10mg', dosage: '0-0-1', duration: '30 दिन', quantity: 30 }
        ]
      }
    ]);

    // Mock inventory
    setInventory([
      { id: '1', name: 'पेरासिटामोल 500mg', category: 'दर्द निवारक', stock: 120, unit: 'टैबलेट', price: 2.5, expiryDate: '2024-11-30' },
      { id: '2', name: 'सेट्रिजीन 10mg', category: 'एंटीहिस्टामाइन', stock: 85, unit: 'टैबलेट', price: 5, expiryDate: '2024-08-15' },
      { id: '3', name: 'एमॉक्सिसिलिन 500mg', category: 'एंटीबायोटिक', stock: 45, unit: 'कैप्सूल', price: 8.5, expiryDate: '2023-12-30' },
      { id: '4', name: 'आइबुप्रोफेन 400mg', category: 'दर्द निवारक', stock: 75, unit: 'टैबलेट', price: 3.2, expiryDate: '2024-10-20' },
      { id: '5', name: 'एस्पिरिन 75mg', category: 'एंटी-प्लेटलेट', stock: 15, unit: 'टैबलेट', price: 1.8, expiryDate: '2023-09-30' },
      { id: '6', name: 'अटोरवास्टेटिन 10mg', category: 'स्टैटिन', stock: 8, unit: 'टैबलेट', price: 12, expiryDate: '2024-05-15' },
      { id: '7', name: 'ओमेप्राज़ोल 20mg', category: 'पीपीआई', stock: 60, unit: 'कैप्सूल', price: 6.5, expiryDate: '2024-07-10' }
    ]);

    // Set low stock items (stock less than 20)
    setLowStockItems(inventory.filter(item => item.stock < 20));

    // Mock notifications
    setNotifications([
      {
        id: '1',
        message: 'नई प्रिस्क्रिप्शन प्राप्त हुई - राजेश कुमार',
        time: '10 मिनट पहले',
        read: false
      },
      {
        id: '2',
        message: '6 दवाइयों का स्टॉक कम है',
        time: '1 घंटा पहले',
        read: false
      },
      {
        id: '3',
        message: '3 दवाइयां अगले महीने समाप्त हो रही हैं',
        time: '3 घंटे पहले',
        read: true
      }
    ]);
  };

  const handlePrescriptionStatusChange = (id, newStatus) => {
    setPrescriptions(
      prescriptions.map(prescription => 
        prescription.id === id ? { ...prescription, status: newStatus } : prescription
      )
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="dashboard pharmacy-dashboard">
      <div className="dashboard-header">
        <h1>{t('pharmacyDashboard')}</h1>
        <div className="notifications-icon">
          <FaBell />
          <span className="notification-badge">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <div className="stat-content">
            <h3>{prescriptions.filter(p => p.status === 'pending' || p.status === 'processing').length}</h3>
            <p>{t('activePrescriptions')}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBoxes className="stat-icon" />
          <div className="stat-content">
            <h3>{lowStockItems.length}</h3>
            <p>{t('lowStockItems')}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaPills className="stat-icon" />
          <div className="stat-content">
            <h3>{inventory.length}</h3>
            <p>{t('medicinesInInventory')}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          <FaClipboardList /> {t('prescriptions')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <FaBoxes /> {t('inventory')}
        </button>
      </div>

      {activeTab === 'prescriptions' && (
        <div className="dashboard-section">
          <h2>{t('prescriptionManagement')}</h2>
          
          <div className="prescription-list">
            {prescriptions.length > 0 ? (
              prescriptions.map(prescription => (
                <div key={prescription.id} className="prescription-card">
                  <div className="prescription-header">
                    <h3>{prescription.patientName}</h3>
                    <span className={`status-badge ${prescription.status}`}>
                      {prescription.status === 'pending' 
                        ? t('pending') 
                        : prescription.status === 'processing'
                        ? t('processing')
                        : t('completed')}
                    </span>
                  </div>
                  
                  <div className="prescription-details">
                    <p><strong>{t('doctor')}:</strong> {prescription.doctorName}</p>
                    <p><strong>{t('date')}:</strong> {prescription.date}</p>
                  </div>
                  
                  <div className="prescription-medications">
                    <h4>{t('medications')}</h4>
                    <ul>
                      {prescription.medications.map((med, index) => (
                        <li key={index}>
                          <strong>{med.name}</strong> - {med.dosage}, {med.duration}, {t('quantity')}: {med.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="prescription-actions">
                    {prescription.status === 'pending' && (
                      <button 
                        className="btn process-btn"
                        onClick={() => handlePrescriptionStatusChange(prescription.id, 'processing')}
                      >
                        {t('startProcessing')}
                      </button>
                    )}
                    
                    {prescription.status === 'processing' && (
                      <button 
                        className="btn complete-btn"
                        onClick={() => handlePrescriptionStatusChange(prescription.id, 'completed')}
                      >
                        {t('markAsCompleted')}
                      </button>
                    )}
                    
                    {prescription.status === 'completed' && (
                      <div className="delivery-options">
                        <button className="btn delivery-btn">
                          <FaShippingFast /> {t('arrangeDelivery')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message">{t('noPrescriptions')}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="dashboard-section">
          <h2>{t('inventoryManagement')}</h2>
          
          <div className="inventory-search">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder={t('searchMedicines')} 
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <button className="btn add-item-btn">
              + {t('addNewItem')}
            </button>
          </div>
          
          {lowStockItems.length > 0 && (
            <div className="low-stock-alert">
              <h3>{t('lowStockAlert')}</h3>
              <ul className="low-stock-list">
                {lowStockItems.map(item => (
                  <li key={item.id}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-stock">{t('currentStock')}: <strong>{item.stock} {item.unit}</strong></span>
                  </li>
                ))}
              </ul>
              <button className="btn restock-btn">
                {t('reorderItems')}
              </button>
            </div>
          )}
          
          <div className="inventory-table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>{t('medicineName')}</th>
                  <th>{t('category')}</th>
                  <th>{t('currentStock')}</th>
                  <th>{t('price')} (₹)</th>
                  <th>{t('expiryDate')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id} className={item.stock < 20 ? 'low-stock' : ''}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.stock} {item.unit}</td>
                    <td>{item.price}</td>
                    <td>{item.expiryDate}</td>
                    <td>
                      <button className="btn edit-btn">{t('edit')}</button>
                      <button className="btn restock-btn">{t('restock')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

export default PharmacyDashboard; 
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [consultationHistory, setConsultationHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [chronicConditions, setChronicConditions] = useState('');
  const [address, setAddress] = useState('');
  
  // Emergency contact states
  const [contactName, setContactName] = useState('');
  const [contactRelation, setContactRelation] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAddMode, setContactAddMode] = useState(false);
  
  // Mock user profile data
  const mockUserProfile = {
    id: 'user123',
    name: 'सरिता देवी',
    age: '35',
    gender: 'महिला',
    bloodGroup: 'O+',
    allergies: 'पेनिसिलिन',
    chronicConditions: 'उच्च रक्तचाप',
    address: 'ग्राम: पटना जिला, बिहार',
    phone: '+919876543210',
    registrationDate: '2023-10-05'
  };
  
  // Mock emergency contacts
  const mockEmergencyContacts = [
    {
      id: 'contact1',
      name: 'रामेश्वर यादव',
      relation: 'पति',
      phone: '+919876543211'
    },
    {
      id: 'contact2',
      name: 'ASHA कार्यकर्ता (सुनीता)',
      relation: 'स्वास्थ्य कार्यकर्ता',
      phone: '+919876543212'
    }
  ];
  
  // Mock consultation history
  const mockConsultationHistory = [
    {
      id: 'cons1',
      doctorName: 'डॉ. अमिता शर्मा',
      specialty: 'स्त्री रोग विशेषज्ञ',
      date: '2023-11-15',
      type: 'वीडियो परामर्श',
      primaryComplaint: 'पेट में दर्द',
      diagnosis: 'सामान्य गर्भावस्था संबंधित परेशानी',
      hasPrescription: true
    },
    {
      id: 'cons2',
      doctorName: 'डॉ. राजेश कुमार',
      specialty: 'सामान्य चिकित्सक',
      date: '2023-10-28',
      type: 'वीडियो परामर्श',
      primaryComplaint: 'बुखार और सिरदर्द',
      diagnosis: 'वायरल बुखार',
      hasPrescription: true
    }
  ];
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // In a real app, fetch from Firestore
        // const userId = auth.currentUser.uid;
        // const profileDoc = await getDoc(doc(db, 'user-profiles', userId));
        // if (profileDoc.exists()) {
        //   setUserProfile(profileDoc.data());
        //   setFormDataFromProfile(profileDoc.data());
        // }
        
        // For demo, use mock data
        setUserProfile(mockUserProfile);
        setFormDataFromProfile(mockUserProfile);
        setEmergencyContacts(mockEmergencyContacts);
        setConsultationHistory(mockConsultationHistory);
        
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('प्रोफाइल लोड करने में समस्या हुई। कृपया पुन: प्रयास करें।');
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Set form data from profile
  const setFormDataFromProfile = (profile) => {
    setName(profile.name || '');
    setAge(profile.age || '');
    setGender(profile.gender || '');
    setBloodGroup(profile.bloodGroup || '');
    setAllergies(profile.allergies || '');
    setChronicConditions(profile.chronicConditions || '');
    setAddress(profile.address || '');
  };
  
  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const updatedProfile = {
        ...userProfile,
        name,
        age,
        gender,
        bloodGroup,
        allergies,
        chronicConditions,
        address,
        updatedAt: new Date().toISOString()
      };
      
      // In a real app, update Firestore
      // const userId = auth.currentUser.uid;
      // await updateDoc(doc(db, 'user-profiles', userId), updatedProfile);
      
      // Update local state
      setUserProfile(updatedProfile);
      setEditMode(false);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('प्रोफाइल अपडेट करने में समस्या हुई। कृपया पुन: प्रयास करें।');
    }
  };
  
  // Cancel edit mode
  const handleCancelEdit = () => {
    setFormDataFromProfile(userProfile);
    setEditMode(false);
  };
  
  // Add emergency contact
  const handleAddContact = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!contactName.trim() || !contactPhone || !contactRelation.trim()) {
      setError('कृपया सभी आवश्यक जानकारी भरें।');
      return;
    }
    
    try {
      const newContact = {
        id: `contact${Date.now()}`,
        name: contactName,
        relation: contactRelation,
        phone: contactPhone
      };
      
      // In a real app, add to Firestore
      // const userId = auth.currentUser.uid;
      // await addDoc(collection(db, 'emergency-contacts'), {
      //   userId,
      //   ...newContact
      // });
      
      // Update local state
      setEmergencyContacts([...emergencyContacts, newContact]);
      setContactName('');
      setContactRelation('');
      setContactPhone('');
      setContactAddMode(false);
      
    } catch (error) {
      console.error('Error adding contact:', error);
      setError('आपातकालीन संपर्क जोड़ने में समस्या हुई। कृपया पुन: प्रयास करें।');
    }
  };
  
  // Cancel add contact
  const handleCancelAddContact = () => {
    setContactName('');
    setContactRelation('');
    setContactPhone('');
    setContactAddMode(false);
  };
  
  // Delete emergency contact
  const handleDeleteContact = async (contactId) => {
    try {
      // In a real app, delete from Firestore
      // await deleteDoc(doc(db, 'emergency-contacts', contactId));
      
      // Update local state
      setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== contactId));
      
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('आपातकालीन संपर्क हटाने में समस्या हुई। कृपया पुन: प्रयास करें।');
    }
  };
  
  // View prescription
  const handleViewPrescription = (consultationId) => {
    navigate(`/prescription/${consultationId}`);
  };
  
  if (loading) {
    return <div className="loading">प्रोफाइल लोड हो रहा है...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">मेरा प्रोफाइल</h1>
        
        {/* Personal Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>{t('personal_info')}</h2>
            {!editMode ? (
              <button
                className="btn btn-outline edit-btn"
                onClick={() => setEditMode(true)}
              >
                संपादित करें
              </button>
            ) : null}
          </div>
          
          {!editMode ? (
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">{t('name')}:</span>
                <span className="info-value">{userProfile.name}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">{t('age')}:</span>
                <span className="info-value">{userProfile.age} वर्ष</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">लिंग:</span>
                <span className="info-value">{userProfile.gender}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">{t('blood_group')}:</span>
                <span className="info-value">{userProfile.bloodGroup}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">{t('allergies')}:</span>
                <span className="info-value">{userProfile.allergies || 'कोई नहीं'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">पुरानी बीमारियां:</span>
                <span className="info-value">{userProfile.chronicConditions || 'कोई नहीं'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">पता:</span>
                <span className="info-value">{userProfile.address}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">मोबाइल:</span>
                <span className="info-value">{userProfile.phone}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">{t('name')}</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age" className="form-label">{t('age')}</label>
                  <input
                    type="number"
                    id="age"
                    className="form-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="gender" className="form-label">लिंग</label>
                  <select
                    id="gender"
                    className="form-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">-- चुनें --</option>
                    <option value="पुरुष">पुरुष</option>
                    <option value="महिला">महिला</option>
                    <option value="अन्य">अन्य</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bloodGroup" className="form-label">{t('blood_group')}</label>
                  <select
                    id="bloodGroup"
                    className="form-input"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="">-- चुनें --</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="allergies" className="form-label">{t('allergies')}</label>
                <input
                  type="text"
                  id="allergies"
                  className="form-input"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="कोई नहीं"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="chronicConditions" className="form-label">पुरानी बीमारियां</label>
                <input
                  type="text"
                  id="chronicConditions"
                  className="form-input"
                  value={chronicConditions}
                  onChange={(e) => setChronicConditions(e.target.value)}
                  placeholder="कोई नहीं"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address" className="form-label">पता</label>
                <textarea
                  id="address"
                  className="form-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={handleCancelEdit}
                >
                  रद्द करें
                </button>
                <button type="submit" className="btn btn-primary">
                  सेव करें
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Emergency Contacts Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>{t('emergency_contacts')}</h2>
            {!contactAddMode ? (
              <button
                className="btn btn-outline add-btn"
                onClick={() => setContactAddMode(true)}
              >
                नया संपर्क जोड़ें
              </button>
            ) : null}
          </div>
          
          {contactAddMode ? (
            <form onSubmit={handleAddContact} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName" className="form-label">संपर्क का नाम</label>
                  <input
                    type="text"
                    id="contactName"
                    className="form-input"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contactRelation" className="form-label">रिश्ता</label>
                  <input
                    type="text"
                    id="contactRelation"
                    className="form-input"
                    value={contactRelation}
                    onChange={(e) => setContactRelation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contactPhone" className="form-label">मोबाइल नंबर</label>
                  <div className="phone-input-container">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      id="contactPhone"
                      className="form-input"
                      value={contactPhone.startsWith('+91') ? contactPhone.slice(3) : contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={handleCancelAddContact}
                >
                  रद्द करें
                </button>
                <button type="submit" className="btn btn-primary">
                  जोड़ें
                </button>
              </div>
            </form>
          ) : (
            <div className="contacts-list">
              {emergencyContacts.length > 0 ? (
                emergencyContacts.map((contact) => (
                  <div key={contact.id} className="contact-card">
                    <div className="contact-info">
                      <div className="contact-name">{contact.name}</div>
                      <div className="contact-relation">{contact.relation}</div>
                      <div className="contact-phone">
                        <a href={`tel:${contact.phone}`}>
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="contact-actions">
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        हटाएं
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-contacts">
                  कोई आपातकालीन संपर्क नहीं। कृपया अपना पहला संपर्क जोड़ें।
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Consultation History Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>{t('consultation_history')}</h2>
          </div>
          
          <div className="consultations-list">
            {consultationHistory.length > 0 ? (
              <div className="consultation-table-container">
                <table className="consultation-table">
                  <thead>
                    <tr>
                      <th>तारीख</th>
                      <th>डॉक्टर</th>
                      <th>विशेषज्ञता</th>
                      <th>समस्या</th>
                      <th>निदान</th>
                      <th>ई-पर्ची</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultationHistory.map((consultation) => (
                      <tr key={consultation.id}>
                        <td>{new Date(consultation.date).toLocaleDateString('hi-IN')}</td>
                        <td>{consultation.doctorName}</td>
                        <td>{consultation.specialty}</td>
                        <td>{consultation.primaryComplaint}</td>
                        <td>{consultation.diagnosis}</td>
                        <td>
                          {consultation.hasPrescription ? (
                            <button 
                              className="btn btn-small btn-outline"
                              onClick={() => handleViewPrescription(consultation.id)}
                            >
                              देखें
                            </button>
                          ) : (
                            'N/A'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-consultations">
                अभी तक कोई परामर्श इतिहास नहीं है।
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 
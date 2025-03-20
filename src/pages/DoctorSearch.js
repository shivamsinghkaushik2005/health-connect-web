import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/DoctorSearch.css';

const DoctorSearch = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    // In a real app, we would fetch data from Firebase
    // For now, let's use mock data
    const mockDoctors = [
      {
        id: 'd1',
        name: 'Dr. Rajiv Kumar',
        speciality: 'Cardiologist',
        experience: 15,
        rating: 4.8,
        availableToday: true,
        imgUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
        languages: ['English', 'Hindi', 'Punjabi'],
        consultationFee: 800,
        nextAvailable: 'Today, 3:00 PM'
      },
      {
        id: 'd2',
        name: 'Dr. Priya Singh',
        speciality: 'Dermatologist',
        experience: 8,
        rating: 4.7,
        availableToday: true,
        imgUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        languages: ['English', 'Hindi'],
        consultationFee: 700,
        nextAvailable: 'Today, 5:30 PM'
      },
      {
        id: 'd3',
        name: 'Dr. Anand Sharma',
        speciality: 'Orthopedic',
        experience: 12,
        rating: 4.9,
        availableToday: false,
        imgUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        languages: ['English', 'Hindi', 'Bengali'],
        consultationFee: 900,
        nextAvailable: 'Tomorrow, 10:00 AM'
      },
      {
        id: 'd4',
        name: 'Dr. Meera Patel',
        speciality: 'Gynecologist',
        experience: 10,
        rating: 4.6,
        availableToday: true,
        imgUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
        languages: ['English', 'Hindi', 'Gujarati'],
        consultationFee: 850,
        nextAvailable: 'Today, 4:15 PM'
      },
      {
        id: 'd5',
        name: 'Dr. Vikram Reddy',
        speciality: 'Pediatrician',
        experience: 14,
        rating: 4.7,
        availableToday: false,
        imgUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
        languages: ['English', 'Hindi', 'Telugu'],
        consultationFee: 750,
        nextAvailable: 'Day after tomorrow, 11:30 AM'
      }
    ];

    setDoctors(mockDoctors);
    setIsLoading(false);
  }, []);

  // Get all unique specialities for the filter dropdown
  const specialities = ['all', ...new Set(doctors.map(doctor => doctor.speciality))];

  // Filter doctors based on search term and filters
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by search term
    const matchesSearchTerm = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by speciality
    const matchesSpeciality = specialityFilter === 'all' || doctor.speciality === specialityFilter;
    
    // Filter by availability
    const matchesAvailability = availabilityFilter === 'all' || 
                               (availabilityFilter === 'available' && doctor.availableToday);
    
    return matchesSearchTerm && matchesSpeciality && matchesAvailability;
  });

  if (isLoading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  return (
    <div className="doctor-search-container">
      <h1 className="page-title">{t('findDoctors')}</h1>
      
      <div className="search-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder={t('searchDoctors')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="material-icons search-icon">search</span>
        </div>
        
        <div className="filter-group">
          <select
            value={specialityFilter}
            onChange={(e) => setSpecialityFilter(e.target.value)}
          >
            {specialities.map((speciality, index) => (
              <option key={index} value={speciality}>
                {speciality === 'all' ? t('allSpecialities') : speciality}
              </option>
            ))}
          </select>
          
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">{t('allAvailability')}</option>
            <option value="available">{t('availableToday')}</option>
          </select>
        </div>
      </div>
      
      <div className="doctors-list">
        {filteredDoctors.length === 0 ? (
          <p className="no-results">{t('noDoctorsFound')}</p>
        ) : (
          filteredDoctors.map(doctor => (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-avatar">
                <img src={doctor.imgUrl} alt={doctor.name} />
                <div className="doctor-rating">
                  <span className="material-icons">star</span>
                  <span>{doctor.rating}</span>
                </div>
              </div>
              
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-speciality">{doctor.speciality}</p>
                <p className="doctor-experience">
                  <span className="material-icons">work</span>
                  {t('experience')}: {doctor.experience} {t('years')}
                </p>
                <p className="doctor-languages">
                  <span className="material-icons">language</span>
                  {doctor.languages.join(', ')}
                </p>
                <p className="doctor-fee">
                  <span className="material-icons">payments</span>
                  {t('consultationFee')}: ₹{doctor.consultationFee}
                </p>
              </div>
              
              <div className="doctor-availability">
                <p className={`availability ${doctor.availableToday ? 'available' : 'unavailable'}`}>
                  <span className="material-icons">
                    {doctor.availableToday ? 'check_circle' : 'schedule'}
                  </span>
                  {doctor.availableToday ? t('availableToday') : t('nextAvailable')}
                </p>
                <p className="next-slot">{doctor.nextAvailable}</p>
                
                <div className="doctor-actions">
                  <button className="book-btn">
                    <span className="material-icons">event</span>
                    {t('bookAppointment')}
                  </button>
                  <button className="video-consult-btn">
                    <span className="material-icons">videocam</span>
                    {t('videoConsultation')}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorSearch; 
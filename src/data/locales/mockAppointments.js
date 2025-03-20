const mockUpcomingAppointments = [
  {
    id: 'a1',
    doctorName: 'Dr. Rajiv Kumar',
    speciality: 'Cardiologist',
    date: '2023-08-15',
    time: '15:00',
    status: 'confirmed',
    isVideoConsultation: true,
    symptoms: 'Chest pain, shortness of breath',
    notes: 'Follow-up appointment for blood pressure monitoring'
  },
  {
    id: 'a2',
    doctorName: 'Dr. Meera Patel',
    speciality: 'Gynecologist',
    date: '2023-08-17',
    time: '16:15',
    status: 'confirmed',
    isVideoConsultation: false,
    symptoms: 'Routine checkup',
    notes: 'Annual gynecological examination'
  },
  {
    id: 'a3',
    doctorName: 'Dr. Vikram Reddy',
    speciality: 'Pediatrician',
    date: '2023-08-20',
    time: '11:30',
    status: 'pending',
    isVideoConsultation: true,
    symptoms: 'Fever, cough',
    notes: 'Child has been having fever for 2 days'
  }
];

export default mockUpcomingAppointments; 
const mockNotifications = [
  {
    id: 'n1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Rajiv Kumar has been confirmed for tomorrow at 3:00 PM.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    isRead: false,
    type: 'appointment'
  },
  {
    id: 'n2',
    title: 'Prescription Uploaded',
    message: 'Dr. Priya Singh has uploaded a new prescription for you. You can view it in the Prescriptions section.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    isRead: true,
    type: 'prescription'
  },
  {
    id: 'n3',
    title: 'Test Results Available',
    message: 'Your blood test results are now available. You can download them from the Reports section.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    isRead: true,
    type: 'report'
  },
  {
    id: 'n4',
    title: 'Payment Received',
    message: 'We have received your payment of ₹800 for the consultation with Dr. Rajiv Kumar.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    isRead: true,
    type: 'payment'
  },
  {
    id: 'n5',
    title: 'Appointment Reminder',
    message: 'Reminder: You have an appointment with Dr. Meera Patel tomorrow at 4:15 PM.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    isRead: false,
    type: 'appointment'
  }
];

export default mockNotifications; 
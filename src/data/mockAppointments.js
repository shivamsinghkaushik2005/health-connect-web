// Mock data for appointments
const mockAppointments = [
  {
    id: "app1",
    patientName: "Rahul Sharma",
    patientId: "pat123",
    doctorName: "Dr. Anand Gupta",
    doctorId: "doc456",
    date: "2023-07-15",
    time: "10:00 AM",
    status: "completed",
    type: "In-person",
    issue: "Regular check-up",
    notes: "Patient is showing good progress. Continue with the current medication."
  },
  {
    id: "app2",
    patientName: "Priya Patel",
    patientId: "pat124",
    doctorName: "Dr. Sneha Reddy",
    doctorId: "doc789",
    date: "2023-07-18",
    time: "2:30 PM",
    status: "confirmed",
    type: "Video Consultation",
    issue: "Fever and headache",
    notes: ""
  },
  {
    id: "app3",
    patientName: "Amit Kumar",
    patientId: "pat125",
    doctorName: "Dr. Rajesh Shah",
    doctorId: "doc101",
    date: "2023-07-20",
    time: "9:15 AM",
    status: "pending",
    type: "In-person",
    issue: "Stomach pain",
    notes: ""
  },
  {
    id: "app4",
    patientName: "Neha Singh",
    patientId: "pat126",
    doctorName: "Dr. Anand Gupta",
    doctorId: "doc456",
    date: "2023-07-22",
    time: "11:30 AM",
    status: "confirmed",
    type: "In-person",
    issue: "Follow-up after surgery",
    notes: ""
  },
  {
    id: "app5",
    patientName: "Vikram Mehta",
    patientId: "pat127",
    doctorName: "Dr. Sneha Reddy",
    doctorId: "doc789",
    date: "2023-07-25",
    time: "4:00 PM",
    status: "cancelled",
    type: "Video Consultation",
    issue: "Skin rash",
    notes: "Patient cancelled due to personal reasons."
  }
];

export default mockAppointments; 
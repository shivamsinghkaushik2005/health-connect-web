import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import '../styles/AuthPage.css';

const indianStates = [
  {
    name: "Andhra Pradesh",
    districts: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Nellore", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR District"]
  },
  {
    name: "Arunachal Pradesh",
    districts: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"]
  },
  {
    name: "Assam",
    districts: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"]
  },
  {
    name: "Bihar",
    districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"]
  },
  {
    name: "Chhattisgarh",
    districts: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Korea", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"]
  },
  {
    name: "Goa",
    districts: ["North Goa", "South Goa"]
  },
  {
    name: "Gujarat",
    districts: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"]
  },
  {
    name: "Haryana",
    districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"]
  },
  {
    name: "Himachal Pradesh",
    districts: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"]
  },
  {
    name: "Jharkhand",
    districts: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"]
  },
  {
    name: "Karnataka",
    districts: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"]
  },
  {
    name: "Kerala",
    districts: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"]
  },
  {
    name: "Madhya Pradesh",
    districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"]
  },
  {
    name: "Maharashtra",
    districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"]
  },
  {
    name: "Manipur",
    districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"]
  },
  {
    name: "Meghalaya",
    districts: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"]
  },
  {
    name: "Mizoram",
    districts: ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"]
  },
  {
    name: "Nagaland",
    districts: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"]
  },
  {
    name: "Odisha",
    districts: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"]
  },
  {
    name: "Punjab",
    districts: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"]
  },
  {
    name: "Rajasthan",
    districts: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"]
  },
  {
    name: "Sikkim",
    districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"]
  },
  {
    name: "Tamil Nadu",
    districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"]
  },
  {
    name: "Telangana",
    districts: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"]
  },
  {
    name: "Tripura",
    districts: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"]
  },
  {
    name: "Uttar Pradesh",
    districts: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"]
  },
  {
    name: "Uttarakhand",
    districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"]
  },
  {
    name: "West Bengal",
    districts: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
  },
  {
    name: "Andaman and Nicobar Islands",
    districts: ["Nicobar", "North and Middle Andaman", "South Andaman"]
  },
  {
    name: "Chandigarh",
    districts: ["Chandigarh"]
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    districts: ["Dadra and Nagar Haveli", "Daman", "Diu"]
  },
  {
    name: "Delhi",
    districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"]
  },
  {
    name: "Jammu and Kashmir",
    districts: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"]
  },
  {
    name: "Ladakh",
    districts: ["Kargil", "Leh"]
  },
  {
    name: "Lakshadweep",
    districts: ["Lakshadweep"]
  },
  {
    name: "Puducherry",
    districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"]
  }
];

const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const recaptchaContainerRef = useRef(null);
  
  // States
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('patient');
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'male',
    speciality: '',
    licenseNumber: '',
    address: '',
    pincode: '',
    state: '',
    district: '',
    city: '',
    specialization: '',
    aadhaarNumber: ''
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'state') {
      // When state changes, update available districts
      const selectedState = indianStates.find(state => state.name === value);
      setDistricts(selectedState ? selectedState.districts : []);
      
      // Reset district when state changes
      setFormData({
        ...formData,
        [name]: value,
        district: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Format and validate phone number
  const formatPhoneNumber = (phoneNum) => {
    // Remove non-numeric characters
    const numericPhone = phoneNum.replace(/\D/g, '');
    
    // Ensure phone has +91 prefix for India
    return numericPhone.startsWith('91') 
      ? `+${numericPhone}` 
      : `+91${numericPhone}`;
  };
  
  // Set up reCAPTCHA when component mounts
  useEffect(() => {
    if (!window.recaptchaVerifier && recaptchaContainerRef.current) {
      try {
        // Create invisible reCAPTCHA
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA verified');
          }
        });
        console.log('reCAPTCHA initialized');
      } catch (err) {
        console.error('Error setting up reCAPTCHA:', err);
        setError('Error setting up verification. Please refresh the page.');
      }
    }
    
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (err) {
          console.error('Error clearing reCAPTCHA:', err);
        }
      }
    };
  }, []);
  
  // Send OTP
  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log('Sending OTP to:', formattedPhone);
    
    if (!isLogin) {
      // Check if user already exists (for signup)
      getDoc(doc(db, 'users', formattedPhone))
        .then((docSnap) => {
          if (docSnap.exists()) {
            setError('Phone number already registered.');
            setLoading(false);
            return;
          }
          sendVerificationCode(formattedPhone);
        })
        .catch((err) => {
          console.error('Error checking existing user:', err);
          // Continue with sending OTP even if check fails
          sendVerificationCode(formattedPhone);
        });
    } else {
      sendVerificationCode(formattedPhone);
    }
  };
  
  // Send verification code
  const sendVerificationCode = (phoneNumber) => {
    // For testing/development: Use a mock OTP system
    if (window.location.hostname === 'localhost') {
      console.log('🔧 DEVELOPMENT MODE: Using mock OTP verification');
      console.log('📱 Mock OTP sent to:', phoneNumber);
      console.log('🔑 Use any 6-digit code (e.g., "123456") to verify');
      
      // Create a mock confirmation result object
      const mockConfirmationResult = {
        confirm: (code) => {
          console.log('📋 Verifying with code:', code);
          
          // Any 6-digit code will work in test mode
          if (code.length === 6 && /^\d+$/.test(code)) {
            console.log('✅ Mock OTP verification successful');
            return Promise.resolve({
              user: {
                uid: 'mock-uid-' + Date.now(),
                phoneNumber: phoneNumber
              }
            });
          } else {
            console.log('❌ Mock OTP verification failed - invalid code format');
            return Promise.reject({
              code: 'auth/invalid-verification-code',
              message: 'Invalid verification code. Please use a 6-digit number.'
            });
          }
        }
      };
      
      // Use the mock confirmation result
      setVerificationId(mockConfirmationResult);
      setOtpSent(true);
      setLoading(false);
      return;
    }
    
    // Real Firebase verification for production
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
    
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log('OTP sent successfully');
        setVerificationId(confirmationResult);
        setOtpSent(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error sending OTP:', err);
        if (err.code === 'auth/invalid-phone-number') {
          setError('Invalid phone number. Please check and try again.');
        } else if (err.code === 'auth/too-many-requests') {
          setError('Too many attempts. Please try again later.');
        } else if (err.code === 'auth/captcha-check-failed') {
          setError('Verification failed. Please refresh the page and try again.');
        } else {
          setError('Failed to send OTP. Please try again.');
        }
        setLoading(false);
        
        // Reset reCAPTCHA on error
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
          } catch (clearErr) {
            console.error('Error resetting reCAPTCHA:', clearErr);
          }
        }
      });
  };
  
  // Verify OTP and handle login/registration
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!verificationId) {
      setError('Verification ID is missing. Please resend OTP.');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Verifying OTP:', otp);
      const result = await verificationId.confirm(otp);
      console.log('OTP verified successfully');
      const user = result.user;
      
      // For registration, create user document
      if (!isLogin) {
        const formattedPhone = formatPhoneNumber(phoneNumber);
        console.log('Creating user profile for:', formattedPhone);
        
        try {
          // Prepare user data for MongoDB
          const userData = {
            uid: user.uid,
            phoneNumber: formattedPhone,
            name: formData.name,
            email: formData.email || '',
            userType: userType,
            age: formData.age || '',
            gender: formData.gender || '',
            speciality: formData.speciality || '',
            specialization: formData.specialization || '',
            licenseNumber: formData.licenseNumber || '',
            address: formData.address || '',
            pincode: formData.pincode || '',
            state: formData.state || '',
            district: formData.district || '',
            city: formData.city || '',
            aadhaarNumber: formData.aadhaarNumber || ''
          };
          
          // Save user data to MongoDB via API
          const userResponse = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
          });
          
          if (!userResponse.ok) {
            throw new Error('Failed to save user data to MongoDB');
          }
          
          console.log('User data saved to MongoDB successfully');
          
          // Save additional data based on user type
          if (userType === 'doctor') {
            const doctorData = {
              uid: user.uid,
              phoneNumber: formattedPhone,
              name: formData.name,
              speciality: formData.speciality,
              specialization: formData.specialization,
              licenseNumber: formData.licenseNumber,
              isVerified: false,
              status: 'pending',
              address: formData.address,
              pincode: formData.pincode
            };
            
            const doctorResponse = await fetch('http://localhost:5000/api/doctors', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(doctorData)
            });
            
            if (!doctorResponse.ok) {
              console.warn('Failed to save doctor data to MongoDB, but user data was saved');
            }
          }
          
          // Also save data to Firebase for backward compatibility
          await setDoc(doc(db, 'users', formattedPhone), {
            ...userData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          // Store user type in localStorage
          localStorage.setItem('userType', userType);
          localStorage.setItem('phoneNumber', formattedPhone);
          console.log('User data saved successfully to both MongoDB and Firebase');
        } catch (docError) {
          console.error('Error creating user documents:', docError);
          setError('Failed to create user profile. Please try again.');
          setLoading(false);
          return;
        }
      }
      
      console.log('Authentication successful. Redirecting user.');
      // Redirect based on user type
      if (userType === 'patient') {
        navigate('/dashboard');
      } else if (userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (userType === 'pharmacy') {
        navigate('/pharmacy-dashboard');
      } else if (userType === 'lab') {
        navigate('/lab-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP code. Please enter the correct code.');
      } else if (err.code === 'auth/code-expired') {
        setError('OTP has expired. Please request a new OTP.');
      } else {
        setError('Failed to verify OTP. Please try again.');
      }
      setLoading(false);
    }
  };
  
  // Render user type fields based on selected type
  const renderUserTypeFields = () => {
    const commonFields = (
      <>
        <div className="form-field">
          <label>{t('aadhaarNumber')}</label>
          <input
            type="text"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleInputChange}
            placeholder={t('aadhaarNumber')}
            pattern="[0-9]{12}"
            maxLength="12"
            required
          />
        </div>
        
        <div className="form-field">
          <label>{t('age')}</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder={t('age')}
            required
          />
        </div>
        
        <div className="form-field">
          <label>{t('gender')}</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleInputChange}
            required
          >
            <option value="male">{t('male')}</option>
            <option value="female">{t('female')}</option>
            <option value="other">{t('other')}</option>
          </select>
        </div>
        
        <div className="form-field">
          <label>{t('state')}</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">{t('select_state')}</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-field">
          <label>{t('district')}</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
            disabled={!formData.state}
          >
            <option value="">{t('select_district')}</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-field">
          <label>{t('city')}</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder={t('town/city')}
            required
          />
        </div>
        
        <div className="form-field">
          <label>{t('address')}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder={t('address')}
            required
          />
        </div>
        
        <div className="form-field">
          <label>{t('pincode')}</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder={t('pincode')}
            required
          />
        </div>
      </>
    );
    
    if (userType === 'doctor') {
      return (
        <>
          {commonFields}
          <div className="form-field">
            <label>{t('speciality')}</label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
              placeholder={t('speciality')}
              required
            />
          </div>
          
          <div className="form-field">
            <label>{t('specialization')}</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder={t('specialization')}
              required
            />
          </div>
          
          <div className="form-field">
            <label>{t('medicalLicenseNumber')}</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder={t('medicalLicenseNumber')}
              required
            />
          </div>
        </>
      );
    } else if (userType === 'pharmacy') {
      return (
        <>
          {commonFields}
          <div className="form-field">
            <label>{t('pharmacyLicenseNumber')}</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder={t('pharmacyLicenseNumber')}
              required
            />
          </div>
        </>
      );
    } else if (userType === 'lab') {
      return (
        <>
          {commonFields}
          <div className="form-field">
            <label>{t('labLicenseNumber')}</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder={t('labLicenseNumber')}
              required
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          {commonFields}
        </>
      );
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? t('login') : t('signup')}</h1>
          <p>{isLogin ? t('loginSubtext') : t('signupSubtext')}</p>
        </div>
        
        {!otpSent ? (
          <form onSubmit={handleSendOTP} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-field">
                  <label htmlFor="name">{t('fullName')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="email">{t('email')} ({t('optional')})</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="userType">{t('registerAs')}</label>
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={e => setUserType(e.target.value)}
                  >
                    <option value="patient">{t('patient')}</option>
                    <option value="doctor">{t('doctor')}</option>
                    <option value="pharmacy">{t('pharmacy')}</option>
                    <option value="lab">{t('diagnosticLab')}</option>
                  </select>
                </div>
                
                {renderUserTypeFields()}
              </>
            )}
            
            <div className="form-field">
              <label htmlFor="phone">{t('phoneNumber')}</label>
              <div className="phone-input">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>
            
            <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? t('sending') : t('sendOtp')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="auth-form">
            <div className="form-field">
              <label htmlFor="otp">{t('enterOtp')}</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="123456"
                required
              />
              <p className="otp-sent-message">
                {t('otpSentTo')} {formatPhoneNumber(phoneNumber)}
              </p>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? t('verifying') : t('verifyOtp')}
            </button>
            
            <button 
              type="button" 
              className="text-button"
              onClick={() => {
                setOtpSent(false);
                setError('');
                if (window.recaptchaVerifier) {
                  try {
                    window.recaptchaVerifier.clear();
                    window.recaptchaVerifier = null;
                  } catch (err) {
                    console.error('Error clearing reCAPTCHA:', err);
                  }
                }
              }}
              disabled={loading}
            >
              {t('backToPhoneEntry')}
            </button>
          </form>
        )}
        
        <div className="auth-footer">
          <p>
            {isLogin 
              ? t('dontHaveAccount') 
              : t('alreadyHaveAccount')}
            <button 
              className="text-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? t('signupNow') : t('loginNow')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 
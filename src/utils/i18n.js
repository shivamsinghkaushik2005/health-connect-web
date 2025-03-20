import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  hi: {
    translation: {
      // Homepage
      "hero_title": "गाँव में डॉक्टर से बात करें, अभी!",
      "consult_now": "अभी कंसल्ट करें",
      "video_call": "वीडियो कॉल",
      "medicines_home": "दवाई घर बैठे मंगाएँ",
      "free_health_camp": "मुफ्त स्वास्थ्य शिविर",
      "womens_advice": "महिलाओं के लिए सलाह",
      
      // Doctors page
      "search_doctors": "डॉक्टर खोजें",
      "specialty": "स्पेशलिटी",
      "language": "भाषा",
      "fees": "फीस",
      "experience": "अनुभव",
      "book_now": "बुक अब",
      "verified": "प्रमाणित",
      
      // Video consultation
      "check_camera": "कैमरा/माइक चेक करें",
      "network_test": "नेटवर्क स्पीड टेस्ट",
      "mute_unmute": "म्यूट/अनम्यूट",
      "end_call": "कॉल समाप्त करें",
      "patient_details": "मरीज की जानकारी",
      
      // E-prescription
      "prescription": "ई-पर्ची",
      "download_pdf": "PDF डाउनलोड करें",
      "medicines": "दवाइयां",
      "dosage": "मात्रा",
      "doctor_signature": "डॉक्टर के हस्ताक्षर",
      
      // Health camps
      "upcoming_camps": "आगामी स्वास्थ्य शिविर",
      "location": "स्थान",
      "date": "तारीख",
      "time": "समय",
      "specialists": "विशेषज्ञ",
      "register": "रजिस्टर करें",
      
      // User profile
      "personal_info": "व्यक्तिगत जानकारी",
      "name": "नाम",
      "age": "उम्र",
      "blood_group": "ब्लड ग्रुप",
      "allergies": "एलर्जी",
      "consultation_history": "पिछले परामर्श",
      "emergency_contacts": "आपातकालीन संपर्क",
      
      // Women's health
      "pregnancy_tracker": "प्रेगनेंसी ट्रैकर",
      "next_checkup": "अगले चेकअप की तारीख",
      "nutrition_tips": "पोषण टिप्स",
      "safety_tips": "सुरक्षा टिप्स",
      "helpline": "घरेलू हिंसा हेल्पलाइन",
      
      // Footer
      "emergency_numbers": "आपातकालीन नंबर",
      "government_schemes": "सरकारी योजनाएँ",
      "partners": "पार्टनर्स",
      
      // Authentication
      "enter_phone": "अपना मोबाइल नंबर दर्ज करें",
      "enter_otp": "OTP दर्ज करें",
      "verify": "सत्यापित करें",
      "login": "लॉगिन",
      "logout": "लॉगआउट"
    }
  },
  bh: {
    translation: {
      // Homepage
      "hero_title": "गांव में डाक्टर से बतियाईं, अभी!",
      "consult_now": "अभिये परामर्श करीं",
      "video_call": "विडियो कॉल",
      "medicines_home": "दवाई घरे मंगाईं",
      "free_health_camp": "मुफ्त स्वास्थ्य कैंप",
      "womens_advice": "महिलन खातिर सलाह",
      
      // Doctors page
      "search_doctors": "डाक्टर खोजीं",
      "specialty": "विशेषता",
      "language": "भाषा",
      "fees": "फीस",
      "experience": "अनुभव",
      "book_now": "अभिये बुक करीं",
      "verified": "प्रमाणित",
      
      // Video consultation
      "check_camera": "कैमरा/माइक जांचीं",
      "network_test": "नेटवर्क स्पीड टेस्ट",
      "mute_unmute": "आवाज बंद/चालू करीं",
      "end_call": "बात खतम करीं",
      "patient_details": "मरीज के जानकारी",
      
      // Rest of translations would follow same pattern as Hindi
      // with Bhojpuri specific translations
    }
  },
  en: {
    translation: {
      // Homepage
      "hero_title": "Talk to a doctor in your village, now!",
      "consult_now": "Consult Now",
      "video_call": "Video Call",
      "medicines_home": "Get medicines at home",
      "free_health_camp": "Free Health Camps",
      "womens_advice": "Advice for Women",
      
      // Doctors page
      "search_doctors": "Search Doctors",
      "specialty": "Specialty",
      "language": "Language",
      "fees": "Fees",
      "experience": "Experience",
      "book_now": "Book Now",
      "verified": "Verified",
      
      // Video consultation
      "check_camera": "Check Camera/Mic",
      "network_test": "Network Speed Test",
      "mute_unmute": "Mute/Unmute",
      "end_call": "End Call",
      "patient_details": "Patient Details",
      
      // The rest would follow the same pattern as Hindi
      // with English translations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'hi', // Default language
    fallbackLng: 'hi',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n; 
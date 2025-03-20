import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcPgaKUlUNGQzDRJbAYXGXTvgR0JWXm_g",
  authDomain: "health-connect-web-59f94.firebaseapp.com",
  projectId: "health-connect-web-59f94",
  storageBucket: "health-connect-web-59f94.appspot.com",
  messagingSenderId: "665834193707",
  appId: "1:665834193707:web:1abfdb0f1e9f6e2e9a7bc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Enable phone authentication testing mode for development
if (window.location.hostname === 'localhost') {
  auth.settings.appVerificationDisabledForTesting = true;
  console.log('Test mode enabled - SMS verification bypassed');
}

export { auth, db };
export default app; 
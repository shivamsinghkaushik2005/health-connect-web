# स्वास्थ्य कनेक्ट (Health Connect)

A comprehensive telemedicine web application designed to connect rural communities with healthcare services. This platform aims to bridge the gap between patients and doctors through digital technology, making healthcare accessible to all.

## Features

- **Video Consultations**: Connect with doctors through secure video calls
- **Doctor Search**: Find specialists based on medical needs
- **OTP Authentication**: Secure login system through mobile verification
- **Digital Prescriptions**: Access and manage digital prescriptions
- **Health Camps**: Register for nearby health camps and services
- **Women's Health Tools**: Pregnancy tracker and safety recommendations
- **User Profiles**: Manage personal health information and emergency contacts
- **Multi-language Support**: Interface available in Hindi and English

## Tech Stack

- React.js
- Firebase (Authentication, Firestore, Storage)
- i18next for internationalization
- React Router for navigation
- Agora SDK for video consultations

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/health-connect-web.git
   cd health-connect-web
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_AGORA_APP_ID=your_agora_app_id
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

- Create an account using a mobile phone number
- Verify your identity with an OTP
- Complete your profile with personal and medical details
- Search for doctors based on specialty
- Book appointments for video consultations
- Manage prescriptions and medical history
- Locate and register for health camps

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Ministry of Health and Family Welfare, Government of India
- National Health Mission
- ASHA Workers Program
- Rural healthcare providers #   h e a l t h - c o n n e c t - w e b  
 
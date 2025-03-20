import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EPrescription = () => {
  const { t } = useTranslation();
  const { consultationId } = useParams();
  const prescriptionRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);
  
  // Mock data for prescription
  const mockPrescription = {
    id: consultationId,
    date: new Date().toLocaleDateString('hi-IN'),
    doctor: {
      name: 'डॉ. अमिता शर्मा',
      specialty: 'स्त्री रोग विशेषज्ञ',
      registration: 'BIHAR-MCI-12345',
      signature: 'डॉ_अमिता_शर्मा_हस्ताक्षर',
    },
    patient: {
      name: 'सरिता देवी',
      age: 35,
      gender: 'महिला',
      address: 'ग्राम: पटना जिला, बिहार',
    },
    diagnosis: 'मामूली एलर्जी, मौसमी फ्लू के लक्षण',
    medications: [
      {
        name: 'एलेट्रिज़-10',
        dosage: '1 गोली',
        frequency: 'दिन में एक बार, सोने से पहले',
        duration: '7 दिन',
        notes: 'भोजन के बाद लें',
      },
      {
        name: 'पेरासिटामोल',
        dosage: '1 गोली',
        frequency: 'दिन में दो बार',
        duration: '3 दिन',
        notes: 'बुखार या सिरदर्द होने पर लें',
      },
      {
        name: 'विटामिन C टैबलेट',
        dosage: '1 गोली',
        frequency: 'दिन में एक बार',
        duration: '15 दिन',
        notes: 'प्रतिरक्षा बढ़ाने के लिए',
      },
    ],
    tests: [
      'पूर्ण रक्त गणना (CBC)',
      'विटामिन D स्तर',
    ],
    lifestyle: [
      'प्रतिदिन 2-3 लीटर पानी पिएं',
      'हल्का व्यायाम करें',
      'ताजे फल और सब्जियां खाएं',
      'धूम्रपान और अल्कोहल से बचें',
    ],
    followUp: '7 दिनों के बाद',
    qrCode: 'prescription-qr-code',
  };
  
  // Fetch prescription data
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        setLoading(true);
        
        // In a real app, fetch from Firestore
        // const prescriptionDoc = await getDoc(doc(db, 'prescriptions', consultationId));
        // if (prescriptionDoc.exists()) {
        //   setPrescription(prescriptionDoc.data());
        // } else {
        //   setError('ई-पर्ची नहीं मिली। कृपया डॉक्टर से संपर्क करें।');
        // }
        
        // Using mock data for now
        setPrescription(mockPrescription);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching prescription:', error);
        setError('ई-पर्ची लोड करने में समस्या हुई।');
        setLoading(false);
      }
    };
    
    fetchPrescription();
  }, [consultationId]);
  
  // Generate and download PDF
  const downloadPrescription = async () => {
    if (!prescriptionRef.current) return;
    
    try {
      setDownloadLoading(true);
      
      const prescriptionElement = prescriptionRef.current;
      const canvas = await html2canvas(prescriptionElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ई-पर्ची-${consultationId}.pdf`);
      
      setDownloadLoading(false);
      
    } catch (error) {
      console.error('Error downloading prescription:', error);
      setError('ई-पर्ची डाउनलोड करने में समस्या हुई।');
      setDownloadLoading(false);
    }
  };
  
  if (loading) {
    return <div className="loading">ई-पर्ची लोड हो रही है...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="prescription-page">
      <div className="container">
        <div className="prescription-actions">
          <h1 className="page-title">{t('prescription')}</h1>
          
          <button 
            onClick={downloadPrescription} 
            className="btn btn-primary download-btn"
            disabled={downloadLoading}
          >
            {downloadLoading ? 'डाउनलोड हो रहा है...' : t('download_pdf')}
          </button>
        </div>
        
        <div className="prescription-container" ref={prescriptionRef}>
          <div className="prescription-header">
            <div className="hospital-info">
              <h2>स्वास्थ्य कनेक्ट</h2>
              <p>ग्रामीण बिहार के लिए टेलीमेडिसिन सेवा</p>
            </div>
            
            <div className="prescription-date">
              <p><strong>दिनांक:</strong> {prescription?.date}</p>
              <p><strong>पर्ची आईडी:</strong> {prescription?.id}</p>
            </div>
          </div>
          
          <div className="doctor-patient-info">
            <div className="doctor-details">
              <h3>डॉक्टर की जानकारी</h3>
              <p><strong>नाम:</strong> {prescription?.doctor.name}</p>
              <p><strong>विशेषज्ञता:</strong> {prescription?.doctor.specialty}</p>
              <p><strong>पंजीकरण संख्या:</strong> {prescription?.doctor.registration}</p>
            </div>
            
            <div className="patient-details">
              <h3>मरीज की जानकारी</h3>
              <p><strong>नाम:</strong> {prescription?.patient.name}</p>
              <p><strong>उम्र:</strong> {prescription?.patient.age} वर्ष</p>
              <p><strong>लिंग:</strong> {prescription?.patient.gender}</p>
              <p><strong>पता:</strong> {prescription?.patient.address}</p>
            </div>
          </div>
          
          {prescription?.diagnosis && (
            <div className="diagnosis-section">
              <h3>निदान</h3>
              <p>{prescription.diagnosis}</p>
            </div>
          )}
          
          <div className="medications-section">
            <h3>{t('medicines')}</h3>
            <table className="medications-table">
              <thead>
                <tr>
                  <th>क्र.सं.</th>
                  <th>दवाई का नाम</th>
                  <th>{t('dosage')}</th>
                  <th>समय</th>
                  <th>अवधि</th>
                  <th>विशेष निर्देश</th>
                </tr>
              </thead>
              <tbody>
                {prescription?.medications.map((med, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.frequency}</td>
                    <td>{med.duration}</td>
                    <td>{med.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {prescription?.tests && prescription.tests.length > 0 && (
            <div className="tests-section">
              <h3>अनुशंसित जांच</h3>
              <ul className="tests-list">
                {prescription.tests.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
            </div>
          )}
          
          {prescription?.lifestyle && prescription.lifestyle.length > 0 && (
            <div className="lifestyle-section">
              <h3>जीवनशैली संबंधी सलाह</h3>
              <ul className="lifestyle-list">
                {prescription.lifestyle.map((advice, index) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="followup-section">
            <h3>फॉलो-अप विजिट</h3>
            <p>{prescription?.followUp}</p>
          </div>
          
          <div className="prescription-footer">
            <div className="doctor-signature">
              <div className="signature-image">
                {/* This would be an actual signature image */}
                <p className="signature-placeholder">{prescription?.doctor.signature}</p>
              </div>
              <p>{prescription?.doctor.name}</p>
              <p>{prescription?.doctor.specialty}</p>
            </div>
            
            <div className="qr-code">
              {/* This would be an actual QR code */}
              <div className="qr-placeholder">
                {prescription?.qrCode}
              </div>
              <p>फार्मेसी में इस QR कोड को स्कैन करें</p>
            </div>
          </div>
          
          <div className="prescription-disclaimer">
            <p>
              <strong>नोट:</strong> यह ई-पर्ची अधिकृत चिकित्सक द्वारा डिजिटल माध्यम से जारी की गई है 
              और इसे कानूनी तौर पर मान्य दस्तावेज़ माना जाता है। 
              सभी दवाइयां डॉक्टर के निर्देशानुसार ही लें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPrescription; 
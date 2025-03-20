import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';

const VideoConsultation = () => {
  const { t } = useTranslation();
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  // Refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [networkStatus, setNetworkStatus] = useState('good');
  const [consultationId, setConsultationId] = useState(null);
  
  // Agora client and tracks
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  
  // Constants
  const appId = process.env.REACT_APP_AGORA_APP_ID;
  const channelName = `consultation-${doctorId}`;
  
  // Fetch doctor details and create consultation
  useEffect(() => {
    const fetchDoctorAndSetup = async () => {
      try {
        setLoading(true);
        
        // In a real app, fetch doctor from Firestore
        // For now, use mock data
        const mockDoctor = {
          id: doctorId,
          name: 'डॉ. अमिता शर्मा',
          specialty: 'स्त्री रोग विशेषज्ञ',
          experience: '15 वर्ष',
          languages: ['हिंदी', 'भोजपुरी', 'अंग्रेजी'],
          fees: 500,
          rating: 4.8,
          available: true,
          verified: true,
        };
        
        setDoctor(mockDoctor);
        
        // Create a new consultation record
        const newConsultationId = `${doctorId}-${Date.now()}`;
        setConsultationId(newConsultationId);
        
        // In a real app, store in Firestore
        // await setDoc(doc(db, 'consultations', newConsultationId), {
        //   doctorId,
        //   patientId: auth.currentUser.uid,
        //   startTime: Timestamp.now(),
        //   status: 'active',
        //   channelName
        // });
        
        setLoading(false);
        
        // Initialize Agora client
        await initializeAgora();
        
      } catch (error) {
        console.error('Error setting up consultation:', error);
        setError('कंसल्टेशन सेटअप करने में समस्या हुई।');
        setLoading(false);
      }
    };
    
    fetchDoctorAndSetup();
    
    // Cleanup function
    return () => {
      leaveCall();
    };
  }, [doctorId]);
  
  // Initialize Agora client
  const initializeAgora = async () => {
    try {
      // Create Agora client
      const rtcClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      setClient(rtcClient);
      
      // Get token from backend
      // In a real app, fetch token from your server
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-token`, {
      //   channelName,
      //   uid: 0, // Use 0 for dynamic assignment
      // });
      // const token = response.data.token;
      
      // Use a dummy token for demo
      const token = '';
      
      // Join channel
      await rtcClient.join(appId, channelName, token, null);
      
      // Create local audio and video tracks
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      
      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);
      
      // Play local video track
      videoTrack.play(localVideoRef.current);
      
      // Publish local tracks
      await rtcClient.publish([audioTrack, videoTrack]);
      
      // Listen for remote users
      rtcClient.on('user-published', async (user, mediaType) => {
        await rtcClient.subscribe(user, mediaType);
        
        if (mediaType === 'video') {
          setRemoteUsers((prevUsers) => {
            if (prevUsers.find(u => u.uid === user.uid)) {
              return prevUsers;
            } else {
              return [...prevUsers, user];
            }
          });
          
          user.videoTrack.play(remoteVideoRef.current);
        }
        
        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
      });
      
      rtcClient.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'video') {
          setRemoteUsers((prevUsers) => {
            return prevUsers.filter(u => u.uid !== user.uid);
          });
        }
      });
      
      // Network quality monitoring
      rtcClient.on('network-quality', (stats) => {
        const { downlinkNetworkQuality } = stats;
        
        if (downlinkNetworkQuality === 0 || downlinkNetworkQuality === 1) {
          setNetworkStatus('good');
        } else if (downlinkNetworkQuality === 2 || downlinkNetworkQuality === 3) {
          setNetworkStatus('average');
        } else {
          setNetworkStatus('poor');
        }
      });
      
    } catch (error) {
      console.error('Error initializing Agora:', error);
      setError('वीडियो कॉल में शामिल होने में समस्या हुई।');
    }
  };
  
  // Toggle camera
  const toggleCamera = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(!isCameraOn);
      setIsCameraOn(!isCameraOn);
    }
  };
  
  // Toggle microphone
  const toggleMic = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(!isMicOn);
      setIsMicOn(!isMicOn);
    }
  };
  
  // End call and navigate to prescription page
  const endCall = async () => {
    try {
      leaveCall();
      
      // In a real app, update consultation status in Firestore
      // await updateDoc(doc(db, 'consultations', consultationId), {
      //   endTime: Timestamp.now(),
      //   status: 'completed'
      // });
      
      // Navigate to prescription page
      navigate(`/prescription/${consultationId}`);
      
    } catch (error) {
      console.error('Error ending call:', error);
      setError('कॉल समाप्त करने में समस्या हुई।');
    }
  };
  
  // Leave the call and cleanup resources
  const leaveCall = async () => {
    if (localAudioTrack) {
      localAudioTrack.close();
      setLocalAudioTrack(null);
    }
    
    if (localVideoTrack) {
      localVideoTrack.close();
      setLocalVideoTrack(null);
    }
    
    if (client) {
      await client.leave();
    }
  };
  
  // Run network speed test
  const testNetworkSpeed = () => {
    // Placeholder for network test
    alert('नेटवर्क स्पीड टेस्ट किया जा रहा है...');
  };
  
  if (loading) {
    return <div className="loading">डॉक्टर से कनेक्ट किया जा रहा है...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="video-consultation-page">
      <div className="consultation-container">
        <div className="call-header">
          <h1>डॉक्टर के साथ परामर्श</h1>
          
          {networkStatus !== 'good' && (
            <div className={`network-warning network-${networkStatus}`}>
              {networkStatus === 'average' 
                ? 'नेटवर्क कनेक्शन औसत है। वीडियो क्वालिटी कम हो सकती है।'
                : 'कमजोर नेटवर्क कनेक्शन। ऑडियो कॉल पर स्विच करने की सलाह दी जाती है।'
              }
            </div>
          )}
        </div>
        
        <div className="video-container">
          <div className="main-video">
            <div ref={remoteVideoRef} className="remote-video">
              {remoteUsers.length === 0 && (
                <div className="waiting-doctor">
                  <p>डॉक्टर के जुड़ने का इंतज़ार किया जा रहा है...</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="local-video-container">
            <div ref={localVideoRef} className="local-video"></div>
          </div>
        </div>
        
        <div className="call-controls">
          <div className="control-buttons">
            <button
              className={`control-btn ${!isMicOn ? 'control-off' : ''}`}
              onClick={toggleMic}
            >
              {isMicOn ? 'माइक बंद करें' : 'माइक चालू करें'}
            </button>
            
            <button
              className={`control-btn ${!isCameraOn ? 'control-off' : ''}`}
              onClick={toggleCamera}
            >
              {isCameraOn ? 'कैमरा बंद करें' : 'कैमरा चालू करें'}
            </button>
            
            <button
              className="control-btn network-test"
              onClick={testNetworkSpeed}
            >
              {t('network_test')}
            </button>
            
            <button
              className="control-btn end-call"
              onClick={endCall}
            >
              {t('end_call')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="patient-info-sidebar">
        <div className="doctor-info">
          <h3>{doctor?.name}</h3>
          <p>{doctor?.specialty}</p>
        </div>
        
        <div className="consultation-info">
          <h3>{t('patient_details')}</h3>
          
          <div className="patient-details">
            <div className="detail-item">
              <span className="detail-label">परामर्श आईडी:</span>
              <span className="detail-value">{consultationId}</span>
            </div>
            
            <div className="symptoms-notes">
              <h4>लक्षण और नोट्स</h4>
              <textarea 
                placeholder="अपने लक्षणों और समस्याओं का विवरण यहां दर्ज करें..."
                className="symptoms-textarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation; 
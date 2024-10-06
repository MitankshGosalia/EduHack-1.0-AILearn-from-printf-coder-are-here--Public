// App.js
import React, { useState } from 'react';
import { generateFeedback } from './services/gptService';
import { signInWithGoogle, auth, db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const App = () => {
  const [studentInput, setStudentInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [user, setUser] = useState(null);

  const handleInputChange = (e) => setStudentInput(e.target.value);

  const handleSubmit = async () => {
    if (studentInput.trim() === '') return;

    const aiFeedback = await generateFeedback(studentInput);
    setFeedback(aiFeedback);

    if (user) {
      // Save feedback to Firestore
      const feedbackCollection = collection(db, "feedback");
      await addDoc(feedbackCollection, {
        userId: user.uid,
        input: studentInput,
        feedback: aiFeedback,
        timestamp: new Date()
      });
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>AI-Learn: Real-time Feedback System</h1>
      
      {!user && <button onClick={handleLogin}>Sign In with Google</button>}

      <textarea
        style={styles.inputBox}
        value={studentInput}
        onChange={handleInputChange}
        placeholder="Enter your response here..."
      />
      
      <button onClick={handleSubmit} style={styles.submitButton}>Get Feedback</button>
      
      {feedback && (
        <div style={styles.feedbackBox}>
          <h3>AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem'
  },
  inputBox: {
    width: '100%',
    minHeight: '100px',
    padding: '10px',
    marginBottom: '20px'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#6200ea',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  feedbackBox: {
    marginTop: '20px',
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '8px',
    width: '100%'
  }
};

export default App;

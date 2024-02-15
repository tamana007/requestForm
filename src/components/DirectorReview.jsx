'use client'
import React, { useRef } from 'react';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import styles from '../Style/DirectorReview.module.css'; // Create a CSS file for styling

function DirectorReview() {
  const signatureCanvasRef = useRef(null);

  const handleSendEmail = async () => {
    const signature = signatureCanvasRef.current.toDataURL();

      // Convert base64-encoded image data to a Blob object
  const blob = await (await fetch(signature)).blob();

  // Create a FormData object
  const formData = new FormData();

    // Append the Blob object to the FormData object
    formData.append("signature", blob, "image.png");
    console.log("signiture", formData)
    console.log(typeof formData);
    
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: formData,
      });
      const ress = await response.json();
      console.log("hello from Director review", ress);

      if (!ress.ok) {
        throw new Error('Failed to send email');
      }

      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email.');
    }
  };

  return (
    <div className={styles.centered}>
      {/* <h1 className={styles.title}>Please Sign here to approve</h1> */}
      <h1 className={styles.title}>Director's Review Page</h1>
<div>
<label>Director's Signature:</label>
<SignatureCanvas
        ref={signatureCanvasRef}
        canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
      />
      <hr></hr>

      <br />
      <button onClick={handleSendEmail}>Send to Account</button>
</div>
      
    </div>
  );
}

export default DirectorReview;

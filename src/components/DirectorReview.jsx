'use client'
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import styles from '../Style/DirectorReview.module.css'; // Create a CSS file for styling
import { useSearchParams } from 'next/navigation'

function DirectorReview() {
  const signatureCanvasRef = useRef(null);
  //using search param I can send static data...to endpoint
  const searchParams = useSearchParams()
  const search = searchParams.get('directorEmail')
  const id = searchParams.get('id')
  console.log("params", search, id)

//SaveSignature API

  const handleSaveSignature = async () => {
    const signature = signatureCanvasRef.current.toDataURL();
    // console.log("signature image", signature)
    // Convert base64-encoded image data to a Blob object
    const blob = await (await fetch(signature)).blob();
    console.log("blob", blob)


  // Create a FormData object
  const formData = new FormData();

    // Append the Blob object to the FormData object
    formData.append("signature", blob, "image.png");
    console.log("signiture", formData)
    console.log(typeof formData);
    
    try {
      const response = await fetch(`/api/saveSignature?id=${id}`, {
        method: 'POST',
        body: formData,
      });
      const ress = await response.json();
      console.log("hello from save", ress);

      if (!ress.ok) {
        throw new Error('Failed to save');
      }

      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('An error occurred while saving the sig.');
    }

   
  };


//SEND SIGNATURE TO EMAIL API.......................
  const handleSendEmail = async () => {
    const signature = signatureCanvasRef.current.toDataURL();

      // Convert base64-encoded image data to a Blob object
  const blob = await (await fetch(signature)).blob();

  // Create a FormData object
  const formData = new FormData();

    // Append the Blob object to the FormData object
    formData.append("signature", blob, "image.png");
    console.log("signiture", formData)
    // console.log(typeof formData);
    
    try {
      const response = await fetch(`/api/sendEmail?id=${id}`, {
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
      <p>this form id is {id}</p>
<div>
<label>Director's Signature:</label>
<SignatureCanvas
        ref={signatureCanvasRef}
        canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
      />
      <hr></hr>

      <br />
      <button onClick={handleSaveSignature} >Click to save signature</button>

      <button onClick={handleSendEmail}>Send to Account</button>
</div>
      
    </div>
  );
}

export default DirectorReview;

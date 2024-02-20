'use client'
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from '../Style/DirectorReview.module.css';
import { useSearchParams } from 'next/navigation'


function AccountsReview() {
    const [signatureImage, setSignatureImage] = useState(null);
    const signatureCanvasRef = useRef(null);
  const searchParams = useSearchParams()

    const id=searchParams.get('id');

    const saveAcountSignature =async ()=>{
        //Save Account's Signature to Databasse
        // console.log('idd',id);

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
          const savetoDatabase=await fetch(`/api/saveAccountSignature?id=${id}`,{
              method:'POST',
              body:formData
          })
          if (savetoDatabase) {
          alert('succcessfuly sent')

            
          }
          
      } catch (error) {
          alert('not send')
          
      }
    }
    
    
    const handleSendEmail = async () => {
        const signature = signatureCanvasRef.current.toDataURL();

        // Convert base64-encoded image data to a Blob object
        const blob = await (await fetch(signature)).blob();

        // Create a FormData object
        const formData = new FormData();
        formData.append("signature", blob, "image.png");

        try {
            const response = await fetch('/api/accountApproval', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            
           

            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email.');
             // If successful response, fetch the image buffer data
             const imageData = await response.arrayBuffer();
             const blob = new Blob([imageData]);
             const imageUrl = URL.createObjectURL(blob);
 
             // Set the image URL to state to display it
             setSignatureImage(imageUrl);
        };

      
    //   saveAcountSignature()
    };

    return (
        <div className={styles.centered}>
            <h1 className={styles.title}>Account's Review Page</h1>
            <div>
                <label>Account's Signature:</label>
                <SignatureCanvas
                    ref={signatureCanvasRef}
                    canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
                />
            </div>
            <hr />
            <button onClick={saveAcountSignature}>save Signature</button>
            <button onClick={handleSendEmail}>Send to Communication</button>

            {signatureImage && <img src={signatureImage} alt="Account's Signature" />}
        </div>
    );
}

export default AccountsReview;

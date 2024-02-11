// 'use client'
// import React, { useRef, useState } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
// import { IoPencilOutline } from 'react-icons/io5';
// import styles from '../Style/DirectorReview.module.css'; // Create a CSS file for styling

// const AccountsReview=async()=> {
//   const signatureCanvasRef = useRef(null);
//   const [signature, setSignature] = useState('');
//   const [reply, setReply] = useState('');

//   const handleSign = async() => {
//     if (signatureCanvasRef.current.isEmpty()) {
//       alert('Please sign before submitting.');
//     } else {
//       setSignature(signatureCanvasRef.current.toDataURL());
//       //Change Signature to Bolb
//   const blob = await (await fetch(signature)).blob();

//   //Create a Form data Object to hold any Type of data in itself
//   const formData=new FormData();

//   //Appen Blob object in to the Formdata
//   formData.append("Signature appened in formdata",blob,"image.png")
//   console.log('form data',formData);

//   //let Post it to the emai

//   try {
//     const response=await fetch('./api/accountApproval',{
//       method:'POST',
//       body:formData
//     });
//     const ress=await response.json();
//     if(!response.ok){
//       throw new Error('Failed to send email');

//     }
//     alert('email sent successfuly')

    
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'An error occurred while sending the email.' });
    
//   }


//     }
//   };

//   const handleReplyChange = (event) => {
//     setReply(event.target.value);
//   };

//   const handleSubmit = () => {
//     console.log('Account Signature:', signature);
//     console.log('Director Reply:', blob);
//     // Implement logic to submit the Director's signature and reply
//     // Call the API endpoint created for Director's submission
//     // Redirect to the next step or show a success message
//   };

//   return (
//     <div className={styles.centered}>
//       <h1 className={styles.title}>Account's Review Page</h1>
//       <div>
//         <label>Accounts Signature:</label>
//         {/* <br /> */}
//         <SignatureCanvas
//           ref={signatureCanvasRef}
//           canvasProps={{
//             width: 400,
//             height: 150,
//             className: 'signature-canvas',
//             // Use the pen icon as the cursor
//             style: {
//               cursor: 'pointer',
//             },
//           }}
//         />
//         <hr></hr>
//         <br />
//         <button onClick={handleSign}>
//           Please Sign above
//           <IoPencilOutline style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }} />
//         </button>
//       </div>
//       <div>
//         <label className={styles.replySection}>Account Reply: here is </label>
//         <br />
//         <textarea value={reply} onChange={handleReplyChange}></textarea>
//         {/* Display the signature image near Account Reply */}
//         {signature && (
//           <div>
//             {/* <label>Director Signature:</label> */}
//             <br />
//             <img src={signature} alt="Director Signature" />
//           </div>
//         )}
//       </div>
//       <button className={styles.accountsBtn} onClick={handleSign}>
//         Send To Communication
//       </button>
//     </div>
//   );
// }

// export default AccountsReview;

'use client'
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from '../Style/DirectorReview.module.css';

function AccountsReview() {
    const [signatureImage, setSignatureImage] = useState(null);
    const signatureCanvasRef = useRef(null);

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
        }
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
            <button onClick={handleSendEmail}>Send to Communication</button>
            {signatureImage && <img src={signatureImage} alt="Account's Signature" />}
        </div>
    );
}

export default AccountsReview;

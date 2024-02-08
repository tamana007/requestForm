'use client'
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { IoPencilOutline } from 'react-icons/io5';
import styles from '../Style/DirectorReview.module.css'; // Create a CSS file for styling

function AccountsReview() {
  const signatureCanvasRef = useRef(null);
  const [signature, setSignature] = useState('');
  const [reply, setReply] = useState('');

  const handleSign = () => {
    if (signatureCanvasRef.current.isEmpty()) {
      alert('Please sign before submitting.');
    } else {
      setSignature(signatureCanvasRef.current.toDataURL());
    }
  };

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Director Signature:', signature);
    console.log('Director Reply:', reply);
    // Implement logic to submit the Director's signature and reply
    // Call the API endpoint created for Director's submission
    // Redirect to the next step or show a success message
  };

  return (
    <div className={styles.centered}>
      <h1 className={styles.title}>Account's Review Page</h1>
      <div>
        <label>Accounts Signature:</label>
        {/* <br /> */}
        <SignatureCanvas
          ref={signatureCanvasRef}
          canvasProps={{
            width: 400,
            height: 150,
            className: 'signature-canvas',
            // Use the pen icon as the cursor
            style: {
              cursor: 'pointer',
            },
          }}
        />
        <hr></hr>
        <br />
        <button onClick={handleSign}>
          Please Sign above
          <IoPencilOutline style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }} />
        </button>
      </div>
      <div>
        <label className={styles.replySection}>Account Reply: here is </label>
        <br />
        <textarea value={reply} onChange={handleReplyChange}></textarea>
        {/* Display the signature image near Account Reply */}
        {signature && (
          <div>
            {/* <label>Director Signature:</label> */}
            <br />
            <img src={signature} alt="Director Signature" />
          </div>
        )}
      </div>
      <button className={styles.accountsBtn} onClick={handleSubmit}>
        Send To Communication
      </button>
    </div>
  );
}

export default AccountsReview;

'use client'
import React, { useRef,useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const DirectorReview = () => {
  // const signatureCanvasRef = useRef(null);
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
    <div>
      <h1>Director's Review Page</h1>
      <div>
        <label>Director Signature:</label>
        <br />
        {/* <SignatureCanvas ref={signatureCanvasRef} canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }} /> */}
         {/* Your component content... */}
      <SignatureCanvas ref={signatureCanvasRef} />
      {/* More of your component content... */}
        <br />
        <button onClick={handleSign}>Sign</button>
      </div>
      <div>
        <label>Director Reply:</label>
        <br />
        <textarea value={reply} onChange={handleReplyChange}></textarea>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DirectorReview;

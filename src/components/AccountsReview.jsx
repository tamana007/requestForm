"use client";
import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../Style/DirectorReview.module.css";
import { useSearchParams } from "next/navigation";

function AccountsReview() {
  const [signatureImage, setSignatureImage] = useState({});
  const signatureCanvasRef = useRef(null);
  const searchParams = useSearchParams();
  const [viewUser, setViewUser] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [secondAttachement, setSecondAttachement] = useState(null);

  const id = searchParams.get("id");
  const email=searchParams.get("email");

  const saveAcountSignature = async () => {
    //Save Account's Signature to Databasse
    // console.log('idd',id);

    const signature = signatureCanvasRef.current.toDataURL();
    // console.log("signature image", signature)
    // Convert base64-encoded image data to a Blob object
    const blob = await (await fetch(signature)).blob();
    console.log("blob", blob);

    // Create a FormData object
    const formData = new FormData();

    // Append the Blob object to the FormData object
    formData.append("signature", blob, "image.png");
    console.log("signiture", formData);
    console.log(typeof formData);

    try {
      const savetoDatabase = await fetch(`/api/saveAccountSignature?id=${id}`, {
        method: "POST",
        body: formData,
      });
      if (savetoDatabase) {
        alert("succcessfuly sent");
      }
    } catch (error) {
      alert("not send");
    }
  };

  useEffect(() => {
    const handleCheckAttachment = async () => {
      console.log("attachment clicked");
      const res = await fetch(`/api/view-form?id=${id}`);
      const data = await res.json();

      // const res=await getAttachement.json()
      // setAttachment(res.attachment)
      setAttachment((prev) => ({ ...prev, ...data.user }));
      setSecondAttachement((prev) => ({ ...prev, ...data.secondAttachement }));
      setViewUser((prev) => ({ ...prev, ...data.user }));

      console.log("res from attachemnt", attachment);
      const firstAttachment = attachment.attachement;
      const secondAttachement = attachment.secondAttachement;
      // console.log('first attachment',secondAttachement);
    };
    handleCheckAttachment();
  }, []);
  //....................Function to Convert to Docx .............................................
  // Function to download the .docx file
  const downloadDocxFile = (base64Data, fileName) => {
    // Convert the base64 string to binary data
    const binaryData = atob(base64Data);
    // Create a Uint8Array from the binary data
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    // Create a Blob from the Uint8Array with the specified MIME type
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName; // Set the download attribute to specify the filename
    link.click(); // Programmatically click the link to trigger the download
  };
  //.................

  //.........................................................

  function convertTopdf(file, mimeType) {
    console.log("mimetyper", mimeType);
    const byteArray = Uint8Array.from(atob(file), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: mimeType });
    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
  }

  const handleButtonClick = async (file, mimeType) => {
    console.log("MIME type:", mimeType); // Log the MIME type to verify its value
    // console.log('invoice',test);

    // Check if the MIME type is for a Word document
    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // If it's a Word document, download it as .docx
      downloadDocxFile(file, "document.docx");
    } else if (mimeType === "application/pdf") {
      // If it's a PDF document, convert it to PDF
      convertTopdf(file, mimeType);
    } else {
      // Otherwise, show an error message or handle other MIME types accordingly
      console.error("Unsupported MIME type:", mimeType);
    }
  };

  //....................................................

  const handleSendEmail = async () => {
    const signature = signatureCanvasRef.current.toDataURL();

    // Convert base64-encoded image data to a Blob object
    const blob = await (await fetch(signature)).blob();

    // Create a FormData object
    const formData = new FormData();
    formData.append("signature", blob, "image.png");

    try {
      const response = await fetch(`/api/accountApproval?email=${email}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
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
      {/* <h2>{attachment.approvedAmount}</h2> */}
      <div>
        <label>Account's Signature:</label>
        <SignatureCanvas
          ref={signatureCanvasRef}
          canvasProps={{
            width: 400,
            height: 150,
            className: "signature-canvas",
          }}
        />
      </div>
      <hr />
      <button onClick={saveAcountSignature}>save Signature</button>
      <button onClick={handleSendEmail}>Send to Communication</button>
      <button
        onClick={() => {
          handleButtonClick(viewUser.attachement, viewUser.attachementMimeType);
        }}
      >
        Check first Attachment
      </button>
      <button
        onClick={() => {
          handleButtonClick(viewUser.secondAttachement, viewUser.attachementMimeType);
        }}
      >
        Check second Attachment
      </button>

      {/* {signatureImage && <img src={signatureImage} />} */}
    </div>
  );
}

export default AccountsReview;

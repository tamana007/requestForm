'use client'

// MarketingRequestForm.js
import React, { useState } from "react";
import Logo from "@/components/Logo";
import { options, questions } from "../data/options"; // Import questions array
// Example of using Next.js Link
import Link from 'next/link';

import "../Style/marketingRequestForm.css"; // Corrected import path
// import styles from '../Style/DirectorReview.module.css'; // Create a CSS file for styling


const MarketingRequestForm = () => {
  const [printOptions, setPrintOptions] = useState(
    options.reduce((acc, option) => {
      acc[option] = false;
      return acc;
    }, {})
  );

  const [programName, setProgramName] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question] = "";
      return acc;
    }, {})
  );

  const handleCheckboxChange = (option) => {
    console.log("hello", printOptions)
    setPrintOptions({
      ...printOptions,
      [option]: !printOptions[option],
    });
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers({
      ...answers,
      [question]: answer,
    });
  };

  console.log("printOption", printOptions)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic here, e.g., send data to server
    console.log("Submitted:", { printOptions, programName, answers });
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  return (
    <div className="form-container">
      {/* <Logo /> */}
      <h1 className="title">Marketing Request Form</h1>
      <h2>All requests need to be submitted at least one week in advance</h2>

      <form onSubmit={handleSubmit} className="request-form">
        {/* // MarketingRequestForm.js */}
        <div className="checkbox-group">
          <label>What do you want to get printed?</label>
          <br />
          {options.map((option) => (
            <div key={option} className="checkbox-item">
              <input
                type="checkbox"
                id={option}
                checked={printOptions[option]}
                onChange={() => handleCheckboxChange(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
            <div className="questions-section">
          {questions.map((question) => (
            <div key={question} className="text-input">
              <label htmlFor={question}>{question}</label>
              <br />
              {question === "Any other (Please Specify)" ? (
                <textarea
                  id={question}
                  value={answers[question]}
                  onChange={(e) => handleAnswerChange(question, e.target.value)}
                  rows="4"
                />
              ) : (
                <input
                  // className='questionInput'
                  type="text"
                  // id={question}
                  value={answers[question]}
                  onChange={(e) => handleAnswerChange(question, e.target.value)}
                  required
                />
              )}
            </div>
          ))}
            <div className="attachment-section">
          <label htmlFor="attachment"> Please Attach all the bussiness/ID Card/Materials that you designed in Canva:</label>
          <br />
          <input
            type="file"
            id="attachment"
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
            onChange={handleAttachmentChange}
          />
        </div>
        </div>
        </div>

      

      
        <div className="submit-container">
          
          <button type="submit" className="success">Send to Director's Approval</button>
          {/* <button type="submit" className="account">Send to Account's Approval</button>
          
          <button type="submit" className="vendor">Submit to Vendor</button> */}
          
          {/* <link type="btn" >click</link> */}          
        </div>
      </form>
    </div>
  );
};

export default MarketingRequestForm;

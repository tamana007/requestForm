"use client";

import React, { useState } from "react";
import { options, questions } from "@/data/options"; // Import questions array
// import Logo from "./Logo";
import { NodeAction } from "@/data/action";
import Link from 'next/link';
import DirectorReview from "./DirectorReview";


function TempComponent({directorFunc}) {
  

  

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
    setPrintOptions({
      ...printOptions,
      [option]: !printOptions[option],
    });

    console.log(printOptions);
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers({
      ...answers,
      [question]: answer,
    });

    console.log(answers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here, e.g., send data to server
    // console.log("Submitted:", { printOptions, programName, answers });

    //append file to formData...
    const formData = new FormData();
    formData.append("file", attachment);

    //loop through answers object and Append its keys and values to formData..
    for (const property in answers) {
      formData.append(property, answers[property]);
    }

    for (const property in printOptions) {
      formData.append(property, printOptions[property]);
    }

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    const ress = await res.json();
    console.log("hhello from route hadnler", ress);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    console.log("file", file);
  };

  async function NodeActionReturn(formData) {
    const res = NodeAction(formData);
  }

  return (
    <div className="form-container">
      {/* <Logo /> */}
      <h1>Marketing Request Form</h1>
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
                    onChange={(e) =>
                      handleAnswerChange(question, e.target.value)
                    }
                    rows="4"
                  />
                ) : (
                  <input
                    // className='questionInput'
                    type="text"
                    // id={question}
                    value={answers[question]}
                    onChange={(e) =>
                      handleAnswerChange(question, e.target.value)
                    }
                    required
                  />
                )}
              </div>
            ))}
            <div className="attachment-section">
              <label htmlFor="attachment">
                {" "}
                Please Attach all the bussiness/ID Card/Materials that you
                designed in Canva:
              </label>
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
          <button onClick={directorFunc} type="submit" className="success">
            Send to Director's Approval
          </button>
          <button type="submit" className="account">
            Send to Account's Approval
          </button>
          <button type="submit" className="vendor">
            Submit to Vendor
          </button>
        </div>
        {/* <Link href="/DirectorReview">
          Go to Director's Review Page
        </Link> */}

        {/* {director &&  <DirectorReview/> } */}
       
      </form>
    </div>
  );
}

export default TempComponent;

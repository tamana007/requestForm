"use client";
import React, { useState } from "react";
import { options, questions } from "@/data/options"; // Import questions array
import { NodeAction } from "@/data/action";
import Link from "next/link";
import DirectorReview from "./DirectorReview";
import connectToDatabase from "@/db/db";
import useFormStore from '@/utils/store'; // Import the Zustand store

function TempComponent({ directorFunc }) {
  const [printOptions, setPrintOptions] = useState(
    options.reduce((acc, options) => {
      acc[options.key] = false; // Set the key to option.key
      return acc;
    }, {})
  );

  const [programName, setProgramName] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [secondAttachment, setSecondAttachment] = useState(null);
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.key] = "";
      return acc;
    }, {})
  );

  const handleCheckboxChange = (option) => {
    // console.log("option", option)
    setPrintOptions({
      ...printOptions,
      [option.key]: !printOptions[option.key],
    });

    // console.log(printOptions);
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers({
      ...answers,
      [question.key]: answer,
    });

    // console.log(answers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here, e.g., send data to server

    //append file to formData...
    const formData = new FormData();
    //
    // // Convert file attachments to strings
    // const file1Content = await fileToString(attachment);
    // const file2Content = await fileToString(secondAttachment);

    // // Append file contents as strings to formData
    // formData.append("file1", file1Content);
    // formData.append("file2", file2Content);

    // formData.append("file", attachment,secondAttachment);
    formData.append("file1", attachment);
    formData.append("file2", secondAttachment);

      // Update the Zustand store with formData
    useFormStore.getState().setFormData(formData);
    //

    console.log("answersssss", printOptions);
    //loop through answers object and Append its keys and values to formData..
    for (const property in answers) {
      formData.append(property, answers[property]);
    }

    //loop through printOptions object and append its keys and values to formData..
    for (const property in printOptions) {
      formData.append(property, printOptions[property]);
    }
    console.log("Form Data see", formData);

    const res = await fetch("/api/submit-form", {
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

  const handleSecondAttachmentChange = (e) => {
    const file = e.target.files[0];
    setSecondAttachment(file);
    console.log("file", file);
  };

  async function NodeActionReturn(formData) {
    const res = NodeAction(formData);

    // Function to convert File to string asynchronously
    async function fileToString(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result); // The file content as a string
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsText(file); // Read the file as text
      });
    }
  }

  return (
    <div className="form-container">
      {/* <Logo /> */}
      <h1>Marketing Request Form</h1>
      <h2>All requests need to be submitted at least one week in advance</h2>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="checkbox-group">
          <label>What do you want to get printed?</label>
          <br />
          {options.map((option) => (
            <div key={option.key} className="checkbox-item">
              <input
                type="checkbox"
                id={option}
                checked={printOptions[option.key]}
                onChange={() => handleCheckboxChange(option)}
              />
              <label htmlFor={option}>{option.description}</label>
            </div>
          ))}
          <div className="questions-section">
            {questions.map((question) => (
              <div key={question.key} className="text-input">
                <label htmlFor={question.key}>{question.description}</label>
                <br />
                {question.description === "Any other (Please Specify)" ? (
                  <textarea
                    id={question.key}
                    value={answers[question.key]}
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
                    value={answers[question.key]}
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
                Please Attach Information for Social Media
                Post,Flyer/Brochure/Other Things.
              </label>
              <br />
              <input
                type="file"
                id="attachment"
                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                onChange={handleAttachmentChange}
              />
            </div>

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
                onChange={handleSecondAttachmentChange}
              />
            </div>
          </div>
        </div>

        <div className="submit-container">
          {/* <Link href="/director-review"> */}
          <button type="submit" className="success">
            Send to Director's Approval
          </button>
          {/* </Link> */}
          <Link href="/account-review">
            <button type="submit" className="account">
              Send to Account's Approval
            </button>
          </Link>

          <button type="submit" className="vendor">
            Submit to Vendor
          </button>
        </div>
      </form>
    </div>
  );
}

export default TempComponent;

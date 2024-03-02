"use client";
import React, { useEffect, useState } from "react";
import { options, questions } from "@/data/options"; // Import questions array
import { NodeAction } from "@/data/action";
import Link from "next/link";
import DirectorReview from "./DirectorReview";
import connectToDatabase from "@/db/db";
import useFormStore from "@/utils/store"; // Import the Zustand store
import { FaPaperPlane } from "react-icons/fa";

function TempComponent({ directorFunc }) {
  const [printOptions, setPrintOptions] = useState(
    options.reduce((acc, options) => {
      acc[options.key] = false; // Set the key to option.key
      return acc;
    }, {})
  );

  const [programName, setProgramName] = useState("");
  const { formData: fmData, setFormData } = useFormStore();
  const [attachment, setAttachment] = useState(null);
  const [secondAttachment, setSecondAttachment] = useState(null);
  const [directorEmail, setDirectorEmail] = useState("");
  const[yourName,setYourname]=useState("");
  const [anyOther, setAnyOther] = useState("");
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.key] = "";
      return acc;
    }, {})
  );
  const handleDirectorEmailChnage = (e) => {
    setDirectorEmail(e.target.value);
    // console.log("director email", directorEmail);
  };
  const handleYournameChange = (e) => {
    setYourname(e.target.value);
    // console.log('tour name',yourName);
    // console.log("director email", directorEmail);
  };
  // const handleYournameChange=(e)=>{
  //   setYourname(e.target.value);
  //   console.log('tour name',yourName);
  // }

  const handleCheckboxChange = (option) => {
    setPrintOptions({
      ...printOptions,
      [option.key]: !printOptions[option.key],
    });
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
    formData.append("file1", attachment);
    formData.append("file2", secondAttachment);
    formData.append("directorEmail", directorEmail);
    formData.append("anyOtherItem", anyOther);
    // formData.append("yourName",yourName);
console.log('answers',answers);
    // console.log('check Form data',formData);
    //loop through answers object and Append its keys and values to formData..

    //loop through printOptions object and append its keys and values to formData..
    for (const property in printOptions) {
      formData.append(property, printOptions[property]);
    }

    for (const property in answers) {
      formData.append(property, answers[property]);
    }

    console.log("Form Data see", formData);
    setFormData(formData.directorEmail);

    const res = await fetch("/api/submit-form", {
      method: "POST",
      body: formData,
    });
    const ress = await res.json();
    // console.log("hhello from route hadnler", ress);
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
    useEffect(() => {
      console.log("zustand data", formData);
    }, [formData]);
  }

  return (
    <div className="form-container">
      {/* <Logo /> */}
      <h1 className="title">Marketing Request Form</h1>
      <h2 className="subtitle">
        All requests need to be submitted at least one week in advance
      </h2>

      <form className="form-request" onSubmit={handleSubmit}>
        <div className="checkbox-group">
          <label style={{ marginBottom: "15px" }}>
            What do you want to get printed?
          </label>
          {options.map((option) => (
            <div key={option.key}>
              <div  className="checkbox-item">
                <input
                  type="checkbox"
                  id={option.key}
                  checked={printOptions[option.key]}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label htmlFor={option.key}>{option.description}</label>
              </div>

              {option.key == "anyOther" && printOptions["anyOther"] == true && (
                <div>
                  <input
                    type="text"
                    value={anyOther}
                    onChange={(e) => setAnyOther(e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}

          <div className="questions-section">
            {questions.map((question) => (
              <div key={question.key} className="text-input">
                <label htmlFor={question.key}>{question.description}</label>
                <div>
                  {question.key === "directorEmail" ? (
                    <input
                      type="email"
                      value={directorEmail}
                      onChange={handleDirectorEmailChnage}
                      required
                    />
                  ) 
                  // : question.key === "yourName" ? (
                  //   <input
                  //     type="text"
                  //     value={yourName}
                  //     onChange={handleYournameChange}
                  //     required
                  //   />
                  // ) 
                  
                  : (
                    
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

        {/* <div className="sendSignaturebtn"> */}
        {/* <Link href="/director-review"> */}
        <button type="submit" className="sendSignaturebtn">
          Send to Director's Approval{" "}
          <FaPaperPlane style={{ marginLeft: "5px" }}></FaPaperPlane>
        </button>
        {/* </Link> */}
        {/* <Link href="/account-review"> */}
        {/* <button type="submit" className="account"> */}
        {/* Send to Account's Approval */}
        {/* </button> */}
        {/* </Link> */}

        {/* <button type="submit" className="vendor"> */}
        {/* Submit to Vendor */}
        {/* </button> */}
        {/* </div> */}
      </form>
    </div>
  );
}

export default TempComponent;

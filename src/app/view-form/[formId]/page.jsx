"use client";

import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import Logo from "@/components/Logo";
import Print from "@/components/print";
function Page({ params }) {
  const id = params.formId;
  const [viewUser, setViewUser] = useState('');
  const [check,isChecked]=useState('')

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        // Let's send params.formId to API
        const res = await fetch(`/api/view-form?id=${params.formId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
       
        // setViewUser(prevViewUser => ({ ...prevViewUser,...data.user}));
        console.log("check data.user", data.user);
        const final=data.user;


    isChecked(final);
    console.log('view user',check);


        console.log('final',final.socialMediaAd);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();

  }, []);

 

  //This function used for passing into the HTML Converter
  const renderPrintContainer = () => {
    if (!id) return null;

    return (
      <div className="print-container">
        <Logo />
        <div className="print-form-container">
          <h1>View Form</h1>
          <div className="checkboxes">
            <label htmlFor="data1">
              <input type="checkbox" id="data1" name="data1" checked={viewUser.flyer} />
              Social Media Ad
            </label>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Bussiness Card
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2"  />
                Flyer 
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Brochure
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Pullup Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Table top Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Special Merchandise/Swag item
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Placard
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Marketing
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Any other (Please Specify)
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                What is your program name?
              </label>
            </div>

            {/* Add more checkboxes as needed */}
          </div>
          <div className="questions">
            <p>
              Question 1: What is your program name?
              <br />
              Answer: {viewUser.programName} <p type="text" name="answer1"  />
            </p>
            <p>
              Question 2: Your Name:
              <br />
              Answer: {viewUser.name}<p type="text" name="answer2" />
            </p>
            {/* Add more questions and answers as needed */}
            <p>
              Question 2: Director Email Address:
              <br />
              Answer: {viewUser.directorEmail}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Please Specify the Size and Quantity (If relevant)
              <br />
              Answer: {viewUser.size}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Please Write any side-note for Social Media Post,Flyer/Brochure/Swag Item (If relevant)
              <br />
              Answer: {viewUser.sideNote}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Amount Approved?
              <br />
              Answer: {viewUser.approvedAmount}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Budget approval by the Accounts Department?
              <br />
              Answer: {viewUser.budgetApprovalByAccount}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Invoince to be made under which Name/program ?
              <br />
              Answer: {viewUser.invoiceTobeMade}<p type="text" name="answer2" />
            </p>
          </div>
         
        </div>
      </div>

      // <div className="print-container">
      //   <Logo />
      //   <p>Helloooooo {viewUser.programName}</p>
      //   <h1>This is my View Form page and form Id is: {params.formId}</h1>
      // </div>
    );
  };

  const printElement = ReactDOMServer.renderToString(renderPrintContainer());

  // Function to export content as PDF
  const exportAsPDF = () => {
    return new Promise((resolve, reject) => {
      const options = {
        margin: 10,
        filename: "exported_document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf()
        .from(printElement)
        .save()
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  return (
    <div>
      {/* <div className="print-container">
        <Logo />
        <p>Helloooooo {viewUser.programName}</p>
        <h1>This is my View Form page and form Id is: {params.formId}</h1>
      </div> */}
    <div className="print-container">
        <Logo />
        <div className="print-form-container">
          <h1>View Form</h1>
          <div className="checkboxes">
            <label htmlFor="data1">
              <input type="checkbox" id="data1" name="data1" checked={viewUser.socialMediaAd} />
              Social Media Ad
            </label>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2"  />
                Bussiness Card
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Flyer
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Brochure
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Pullup Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Table top Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Special Merchandise/Swag item
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Placard
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Marketing
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                Any other (Please Specify)
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input type="checkbox" id="data2" name="data2" />
                What is your program name?
              </label>
            </div>

            {/* Add more checkboxes as needed */}
          </div>
          <div className="questions">
            <p>
              Question 1: What is your program name?
              <br />
              Answer: {viewUser.programName} <p type="text" name="answer1" />
            </p>
            <p>
              Question 2: Your Name:
              <br />
              Answer: {viewUser.name}<p type="text" name="answer2" />
            </p>
            {/* Add more questions and answers as needed */}
            <p>
              Question 2: Director Email Address:
              <br />
              Answer: {viewUser.directorEmail}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Please Specify the Size and Quantity (If relevant)
              <br />
              Answer: {viewUser.size}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Please Write any side-note for Social Media Post,Flyer/Brochure/Swag Item (If relevant)
              <br />
              Answer: {viewUser.sideNote}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Amount Approved?
              <br />
              Answer: {viewUser.approvedAmount}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Budget approval by the Accounts Department?
              <br />
              Answer: {viewUser.budgetApprovalByAccount}<p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Invoince to be made under which Name/program ?
              <br />
              Answer: {viewUser.invoiceTobeMade}<p type="text" name="answer2" />
            </p>
          </div>
          {/* <button type="submit">Submit</button> */}
      <button onClick={() => exportAsPDF()}>Export as PDF</button>

        </div>
      </div>
    </div>
  );
}

export default Page;

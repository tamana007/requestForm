
'use client'

import React, { useEffect, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import Logo from '@/components/Logo';
import Print from '@/components/print'
function Page({ params }) {
  const id = params.formId;
  const [viewUser, setViewUser] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        // Let's send params.formId to API 
        const res = await fetch(`/api/view-form?id=${params.formId}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setViewUser(data.user);
        console.log('check data', data);
      } catch (error) {
        console.error('Error fetching form data:', error);
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
            <input type="checkbox" id="data1" name="data1" />
            Data One
          </label>
          <div>
          <label htmlFor="data2">
          <input type="checkbox" id="data2" name="data2" />
            Data Two
          </label>

          </div>
           
          {/* Add more checkboxes as needed */}
        </div>
        <div className="questions">
          <p>
            Question 1: What is your name?
            <br />
            Answer: <input type="text" name="answer1" />
          </p>
          <p>
            Question 2: Where are you from?
            <br />
            Answer: <input type="text" name="answer2" />
          </p>
          {/* Add more questions and answers as needed */}
        </div>
        <button type="submit">Submit</button>
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
        filename: 'exported_document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
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
            <input type="checkbox" id="data1" name="data1" />
            Data One
          </label>
          <div>
          <label htmlFor="data2">
          <input type="checkbox" id="data2" name="data2" />
            Data Two
          </label>

          </div>
           
          {/* Add more checkboxes as needed */}
        </div>
        <div className="questions">
          <p>
            Question 1: What is your name?
            <br />
            Answer: <input type="text" name="answer1" />
          </p>
          <p>
            Question 2: Where are you from?
            <br />
            Answer: <input type="text" name="answer2" />
          </p>
          {/* Add more questions and answers as needed */}
        </div>
        <button type="submit">Submit</button>
      </div>
    </div>
      <button onClick={() => exportAsPDF()}>Export as PDF</button>
    </div>
  );
}

export default Page;

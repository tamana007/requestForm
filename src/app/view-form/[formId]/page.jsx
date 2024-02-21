"use client";

import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import Logo from "@/components/Logo";
import Print from "@/components/print";
// import styles from '@/Style/tableData.module.css';
// import styles from '@/Style/tableData.module.css';
 // Create a CSS file for styling
 import styles from '../../../Style/tableData.module.css'

function Page({ params }) {
  const id = params.formId;
  const [viewUser, setViewUser] = useState({});
  // const [check, isChecked] = useState("");
  const [signatureImageUrl, setSignatureImageUrl] = useState(null);
  const [accountImageUrl,setAccountSignature]=useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        // Let's send params.formId to API
        const res = await fetch(`/api/view-form?id=${params.formId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setViewUser((prev) => ({ ...prev, ...data.user }));
        //...........................................................

        // Decode the signature image and set the URL
        if (data.user.signature) {
          // console.log(data.user.signature)
          const base64String = data.user.signature.toString("base64");
          const base64Account=data.user.accountSignature.toString("base64");
          console.log('ACCOUNT SIGNAUTERE',base64Account);

          const imgString = `data:image/png;base64,${base64String}`;
          const accountSignatureImg= `data:image/png;base64,${base64Account}`

          const decodedSignature = atob(base64String);
          //
          const accountdecodeSignature= atob(base64Account);

          const signatureBlob = new Blob([decodedSignature], {
            type: "image/png",
          });
          //
          const accountsignatureBlob = new Blob([accountdecodeSignature], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(signatureBlob);
          setSignatureImageUrl(imgString);
          console.log('acountttttttttttttttttttttttttttttttttttttttttttt',accountSignatureImg);
          //
          const accountImgurl=URL.createObjectURL(accountsignatureBlob);
          setAccountSignature(accountSignatureImg);
        }

        console.log("check data.user", data.user);
        console.log("view user", viewUser);
        const final = data.user;
        console.log("final", final.socialMediaAd);
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
      <div className={styles.print}>
        <Logo />
        <div className={styles.printFormContainer}>
          <h1 className={styles.header}>View Form</h1>
          <div className={styles.rightContainer}>
          <div className="checkboxes">
            <label htmlFor="data1">
              <input
                readOnly
                disabled
                type="checkbox"
                id="data1"
                name="data1"
                checked={!!viewUser.socialMediaAd}
              />
              Social Media Ad
            </label>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.bussinessCard}
                />
                Bussiness Card
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.flyer}

                />
                Flyer
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.brouchure}
                // checked={!!viewUser.brochure}

                />
                Brochure
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.pullupBanner}

                />
                Pullup Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.tableTopBanner}

                />
                Table top Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.specialMerchandise}

                />
                Special Merchandise/Swag item
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.placard}

                />
                Placard
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.tableTopnewsPaper}

                />
                Marketing
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                checked={!!viewUser.marketing}

                />
                Any other (Please Specify)
              </label>
            </div>
            {/* <div>
              <label htmlFor="data2">
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.anyOther}

                />
                What is your program name?
              </label>
            </div> */}

            {/* Add more checkboxes as needed */}
          </div>
          <div className="questions">
            <p>
              Question 1: What is your program name?
              <br />
              Answer: {viewUser.programName}
              <p type="text" name="answer1" />
            </p>
            <p>
              Question 2: Your Name:
              <br />
              Answer: {viewUser.name}
              <p type="text" name="answer2" />
            </p>
            {/* Add more questions and answers as needed */}
            <p>
              Question 2: Director Email Address:
              <br />
              Answer: {viewUser.directorEmail}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Please Specify the Size and Quantity (If relevant)
              <br />
              Answer: {viewUser.size}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Please Write any side-note for Social Media
              Post,Flyer/Brochure/Swag Item (If relevant)
              <br />
              Answer: {viewUser.sideNote}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Amount Approved?
              <br />
              Answer: {viewUser.approvedAmount}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Budget approval by the Accounts Department?
              <br />
              Answer: {viewUser.budgetApprovalByAccount}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 2: Invoince to be made under which Name/program ?
              <br />
              Answer: {viewUser.invoiceTobeMade}
              <p type="text" name="answer2" />
            </p>
            <div className={styles.signatures}>
              <p>Director Signature:</p>
              <img className={styles.signatureone} src={signatureImageUrl} alt="Director's Signature" />
              {/* <hr/> */}
            {/* </div> */}

            {/* <div> */}
              <p>Account Signature:</p>{" "}
              <img className={styles.signaturetwo} src={accountImageUrl} alt="Director's Signature" />
            </div>
          </div>
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
        html2canvas: { scale: 4 },
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
      <div className={styles.print}>
        <Logo />
        <div className={styles.printFormContainer}>
          <h1 className={styles.header}>View Form</h1>
          <div className={styles.rightContainer}>
          <div className={styles.checkboxes}>
            <label htmlFor="data1">
              <input
                disabled
                readOnly
                type="checkbox"
                id="data1"
                name="data1"
                checked={!!viewUser.socialMediaAd}
              />
              Social Media Ad
            </label>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.bussinessCard}
                />
                Bussiness Card
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.flyer}

                />
                Flyer
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.Brochure}

                />
                Brochure
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.pullupBanner}

                />
                Pullup Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.tableTopBanner}

                />
                Table top Banner
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.specialMerchandise}
                />
                Special Merchandise/Swag item
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.placard}

                />
                Placard
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.tableTopnewsPaper}

                />
                Marketing
              </label>
            </div>
            <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.marketing}

                />
                Any other (Please Specify)
              </label>
            </div>
            {/* <div>
              <label htmlFor="data2">
                <input
                  disabled
                  readOnly
                  type="checkbox"
                  id="data2"
                  name="data2"
                  checked={!!viewUser.anyOther}

                />
                What is your program name?
              </label>
            </div> */}

            {/* Add more checkboxes as needed */}
          {/* </div> */}
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
              Answer: {viewUser.name}
              <p type="text" name="answer2" />
            </p>
            {/* Add more questions and answers as needed */}
            <p>
              Question 3: Director Email Address:
              <br />
              Answer: {viewUser.directorEmail}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 4: Please Specify the Size and Quantity (If relevant)
              <br />
              Answer: {viewUser.size}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 5: Please Write any side-note for Social Media
              Post,Flyer/Brochure/Swag Item (If relevant)
              <br />
              Answer: {viewUser.sideNote}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 6: Amount Approved?
              <br />
              Answer: {viewUser.approvedAmount}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 7: Budget approval by the Accounts Department?
              <br />
              Answer: {viewUser.budgetApprovalByAccount}
              <p type="text" name="answer2" />
            </p>
            <p>
              Question 8: Invoince to be made under which Name/program ?
              <br />
              Answer: {viewUser.invoiceTobeMade}
              <p type="text" name="answer2" />
            </p>
            </div>

            {/* <hr /> */}
            <div className={styles.signatures}>
              <span>Director Signature:</span>{" "}
              <img className={styles.signatureone} src={signatureImageUrl} alt="Director's Signature" />
            {/* </div> */}
            {/* <div> */}
              <span>Account Signature:</span>{" "}
              <img className={styles.signaturetwo} src={accountImageUrl} alt="Director's Signature" />
            </div>
          </div>
          {/* <button type="submit">Submit</button> */}
          <hr/>
          <button onClick={() => exportAsPDF()}>Export as PDF</button>
        </div>
      </div>
    </div>
  );
}

export default Page;

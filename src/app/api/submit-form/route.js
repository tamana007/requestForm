const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
//.................................
const nodemailer = require("nodemailer");
const mimeTypes = require("mime-types");
import { connectToDatabase } from "@/db/db";
import User from "@/db/model/User";

export async function POST(request) {
  await connectToDatabase();

  //Don't touch it...
  const formData = await request.formData();
  const file1 = formData.get("file1");
  const file2 = formData.get("file2");
  const directorEmail=formData.get("file3")
  formData.delete("file1");
  formData.delete("file2");
  formData.delete("directorEmail");
  let arrayBuffer1 = await file1.arrayBuffer();
  let arrayBuffer2 = await file2.arrayBuffer();
  
  const buffer1 = Buffer.from(arrayBuffer1);
  const buffer2 = Buffer.from(arrayBuffer2);
  // Convert the Buffer to a base64 encoded string
  const file1base64String = buffer1.toString("base64");
  const file2base64String = buffer2.toString("base64");


  //Find the type of file... such as pdf, doc, jpeg, png...
  const mimeType = mimeTypes.lookup(file1.name) || "application/octet-stream"; // Default to binary if MIME type is not found
  const mimeType2 = mimeTypes.lookup(file2.name) || "application/octet-stream"; // Default to binary if MIME type is not found

  //Change formData to an object...
  const formDataObject = {};

  let directorsEmail = "";
  for (const [key, value] of formData.entries()) {
    // Check if the value is not a File object
    if (!(value instanceof File)) {
      if (key == "directorEmail") {
        directorsEmail = value;
      }
      formDataObject[key] = value;
    }
  }

  //Change string to boolean...
  Object.keys(formDataObject).forEach((item) => {
    if (formDataObject[item] === "true") {
      formDataObject[item] = true;
    } else if (formDataObject[item] === "false") {
      formDataObject[item] = false;
    }
  });

  console.log("formDataObj", formDataObject);
  formDataObject.attachementMimeType = mimeType;
  formDataObject.secondAttachementMimeType = mimeType2;

  console.log("mimeetype", mimeType)
  console.log("mimeetype", mimeType2)
  formDataObject.attachement = file1base64String;
  formDataObject.secondAttachement = file2base64String;

  //DATABASE SETUP.....
  const res = await new User(formDataObject).save();
  const id = res._id;

  // console.log("id", id);

  const url = `http://localhost:3000/director-review?directorEmail=${directorsEmail}?&id=${id}?&email=${directorEmail}`;

  //Email configuration....
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "tamana.efatwira1@gmail.com",
      pass: "ubjziyxjvhqxmkaa",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let htmlContent = "<h1>Marketing Request Form</h1>";
  htmlContent +=
    "<h2>All requests need to be submitted at least one-week in advance</h2>"; // Added h2 tag
  htmlContent += "<ul>"; // Use <ul> for an unordered list
  Object.entries(formDataObject).forEach(([question, answer]) => {
   
    if (typeof answer === "boolean") {
      // If the answer is a boolean, add it to booleanQuestionsHtml
      htmlContent += `<li><strong>${question}:</strong> <input type="checkbox" ${
        answer ? "checked" : ""
      } disabled></li>`;
    } if (question !== "attachement" && question !=="secondAttachement") {
      // If the answer is not a boolean, add it to otherQuestionsHtml
      htmlContent += `<li><strong>${question}:</strong> <div style="display: inline-block; border: 1px solid #ccc; padding: 5px; margin-left: 10px;">${answer}</div></li>`;
    }
    else{
      htmlContent += `<li><strong>${question}:</strong> <div style="display: inline-block; border: 1px solid #ccc; padding: 5px; margin-left: 10px;">"Data Attached"</div></li>`;

    }
  });
  htmlContent += "</ul>"; // Close the unordered list
  htmlContent += `<p> Please click on this link for reivewing application: ${url}`;

  const mailOptions = {
    from: "tamana.efatwira1@gmail.com",
    // to: "tamana.efatwira2@gmail.com",
    to:directorEmail,

    subject: "Marketing E-request Form...",
    text: "Please find the attached file.",
    html: htmlContent,
    attachments: [
      {
        filename: file1.name,
        content: buffer1, // buffer1 is the buffer for the first attachment
        encoding: "base64",
        contentType: mimeType,
      },
      {
        filename: file2.name,
        content: buffer2, // buffer2 is the buffer for the second attachment
        encoding: "base64",
        contentType: mimeType2,
      },
      // ],
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return Response.json("Email Has been Sent...");
}

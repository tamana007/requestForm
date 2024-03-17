const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { reorderObject } = require("@/data/sortObj");
const nodemailer = require("nodemailer");
const mimeTypes = require("mime-types");
import { connectToDatabase } from "@/db/db";
import User from "@/db/model/User";

export async function POST(request) {
  await connectToDatabase();

  // Don't touch it...
  const formData = await request.formData();
  const file1 = formData.get("file1");
  const file2 = formData.get("file2");

  try {
    // console.log('File 2',file2);
    const directorEmail = formData.get("directorEmail");

    formData.delete("file1");
    formData.delete("file2");
    formData.delete("directorEmail");

    let arrayBuffer1, arrayBuffer2, buffer1, buffer2, mimeType, mimeType2;
    let file1base64String = null;
    let file2base64String = null;

    if (!!file1) {
      arrayBuffer1 = await file1.arrayBuffer();
      buffer1 = Buffer.from(arrayBuffer1);
      file1base64String = buffer1.toString("base64");
      mimeType = mimeTypes.lookup(file1.name) || "application/octet-stream";
    }

    if (!!file2) {
      arrayBuffer2 = await file2.arrayBuffer();
      buffer2 = Buffer.from(arrayBuffer2);
      file2base64String = buffer2.toString("base64");
      mimeType2 = mimeTypes.lookup(file2.name) || "application/octet-stream";
    }

    // Change formData to an object...
    const formDataObject = {};

    let directorsEmail = "";
    for (const [key, value] of formData.entries()) {
      // Check if the value is not a File object
      if (!fs.existsSync(value)) {
        if (key == "directorEmail") {
          directorsEmail = value;
        }
        formDataObject[key] = value;
      }
    }

    // Change string to boolean...
    Object.keys(formDataObject).forEach((item) => {
      if (formDataObject[item] === "true") {
        formDataObject[item] = true;
      } else if (formDataObject[item] === "false") {
        formDataObject[item] = false;
      }
    });

    const plainFormDataObject = reorderObject(formDataObject);

    formDataObject.attachementMimeType = mimeType;
    formDataObject.secondAttachementMimeType = mimeType2;

    formDataObject.attachement = file1base64String;
    formDataObject.secondAttachement = file2base64String;
    formDataObject.directorEmail = directorEmail;

    // DATABASE SETUP.....
    // console.log("formData", formDataObject);
    const res = await new User(formDataObject).save();
    const id = res._id;

    const url = `http://localhost:3000/director-review?id=${id}&email=${directorEmail}`;

    // Email configuration....
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
    htmlContent += "<ul style='list-style-type: none; padding: 0;'>";
    Object.entries(plainFormDataObject).forEach(([question, answer]) => {
      if (typeof answer === "boolean") {
        // If the answer is a boolean, add it to booleanQuestionsHtml
        htmlContent += `<li style='margin-bottom: 10px;'><strong>${question}:</strong> <input type="checkbox" style='margin-left: 5px;' ${
          answer ? "checked" : ""
        } disabled></li>`;
      }
      if (
        question !== "attachement" &&
        question !== "secondAttachement" &&
        typeof answer !== "boolean"
      ) {
        // If the answer is not a boolean, add it to otherQuestionsHtml
        htmlContent += `<li style='margin-bottom: 10px;'><strong>${question}:</strong> <div style="display: block;">${answer}</div></li>`;
      }
    });
    htmlContent += "</ul>"; // Close the unordered list
    htmlContent += `<p> Please click on this link for reivewing application: ${url}`;

    const mailOptions = {
      from: "tamana.efatwira1@gmail.com",
      to: directorEmail,
      subject: "Marketing E-request Form...",
      text: "Please find the attached file.",
      html: htmlContent,
      attachments: [],
    };

    // Add file1 attachment if it exists
    if (file1) {
      mailOptions.attachments.push({
        filename: file1.name,
        content: buffer1, // buffer1 is the buffer for the first attachment
        encoding: "base64",
        contentType: mimeType,
      });
    }

    // Add file2 attachment if it exists
    if (file2) {
      mailOptions.attachments.push({
        filename: file2.name,
        content: buffer2, // buffer2 is the buffer for the second attachment
        encoding: "base64",
        contentType: mimeType2,
      });
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  } catch (e) {
    console.log(e);
  }

  return Response.json("Email Has been Sent...");
}

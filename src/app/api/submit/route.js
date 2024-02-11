const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
//.................................
const nodemailer = require('nodemailer');
const mimeTypes = require('mime-types');
import {connectToDatabase} from "@/db/db"
import User from '@/db/model/User'

export async function POST(request) {

  await connectToDatabase()

  //Don't touch it...
  const formData = await request.formData()
  const file = formData.get('file');
  let arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
// const buffer = doc.getZip().generate({ type: 'nodebuffer' });


  // console.log("formData...", formData)
  // const blob = await request.blob();

  //Find the type of file... such as pdf, doc, jpeg, png...
  const mimeType = mimeTypes.lookup(file.name) || 'application/octet-stream'; // Default to binary if MIME type is not found

  //Change formData to an object...
  const formDataObject = {};
  let directorsEmail = '';
for (const [key, value] of formData.entries()) {
  // Check if the value is not a File object
  if (!(value instanceof File)) {
    if(key == 'directorEmail'){
      directorsEmail = value;
    }
    formDataObject[key] = value;
  }
}

//Change string to boolean...
Object.keys(formDataObject).forEach(item => {
  if (formDataObject[item] === 'true') {
    formDataObject[item] = true;
  } else if (formDataObject[item] === 'false') {
    formDataObject[item] = false;
  }
});






//DATABASE SETUP.....

  const res = await new User(formDataObject).save()
  const id = res._id

  console.log("id", id)

  
  const url = `http://localhost:3000/director-review?directorEmail=${directorsEmail}&id=${id}`



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
      rejectUnauthorized: false
    }
  });




let htmlContent = '<h1>Marketing Request Form</h1>';
htmlContent += '<h2>All requests need to be submitted at least one-week in advance</h2>'; // Added h2 tag
htmlContent += '<ul>'; // Use <ul> for an unordered list

Object.entries(formDataObject).forEach(([question, answer]) => {
  if (typeof answer === 'boolean') {
    // If the answer is a boolean, display a checkbox
    htmlContent += `<li><strong>${question}:</strong> <input type="checkbox" ${answer ? 'checked' : ''} disabled></li>`;
  } else {
    // If the answer is not a boolean, display the regular list item with only the answer in a box
    htmlContent += `<li><strong>${question}:</strong> <div style="display: inline-block; border: 1px solid #ccc; padding: 5px; margin-left: 10px;">${answer}</div></li>`;
  }
});

htmlContent += '</ul>'; // Close the unordered list
htmlContent += `<p> Please click on this link for reivewing application: ${url}`

// console.log(htmlContent);




//
  
  const mailOptions = {
    from: "tamana.efatwira1@gmail.com",
    to: "tamana.efatwira2@gmail.com",
    // to: "tamana.efatwira2@gmail.com",

    subject: "Marketing E-request Form...",
    text: 'Please find the attached file.',
    html: htmlContent,
    attachments: [
      {
        filename: 'attached-file',
        content: buffer,
        encoding: 'base64', // Set the encoding to base64
        contentType: mimeType,
      },
    ],
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });




  return Response.json("che mkni dega")

}


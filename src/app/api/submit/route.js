const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
//.................................
const nodemailer = require('nodemailer');
const mimeTypes = require('mime-types');



export async function POST(request) {


  //Don't touch it...
  const formData = await request.formData()
  const file = formData.get('file');
  let arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
// const buffer = doc.getZip().generate({ type: 'nodebuffer' });


  // console.log("file", formData)
  // const blob = await request.blob();

  //Find the type of file... such as pdf, doc, jpeg, png...
  const mimeType = mimeTypes.lookup(file.name) || 'application/octet-stream'; // Default to binary if MIME type is not found

  const formDataObject = {};
for (const [key, value] of formData.entries()) {
  // Check if the value is not a File object
  if (!(value instanceof File)) {
    formDataObject[key] = value;
  }
}


//  const templateContent = `
//  <w:p>
//    <w:r>
//      <w:t>Hello {firstName} {lastName}!</w:t>
//    </w:r>
//  </w:p>
//  `;

console.log(formDataObject)


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


//     let htmlContent = '<h1>Marketing Request Form</h1>';
// htmlContent += '<h2>All requests need to be submitted at least one-week in advance</h2>'; // Added h2 tag
// htmlContent += '<ul>';
// Object.entries(formDataObject).forEach(([question, answer]) => {
//   htmlContent += `<li><strong>${question}:</strong> ${answer}</li>`;
// });
// htmlContent += '</ul>';
//





// let htmlContent = '<h1>Marketing Request Form</h1>';
// htmlContent += '<h2>All requests need to be submitted at least one-week in advance</h2>'; // Added h2 tag
// htmlContent += '<ul>';

// Object.entries(formDataObject).forEach(([question, answer]) => {
//   if (typeof answer === 'boolean') {
//     // If the answer is a boolean, display a checkbox
//     htmlContent += `<li><strong>${question}:</strong> <input type="checkbox" ${answer ? 'checked' : ''} disabled></li>`;
//   } else {
//     // If the answer is not a boolean, display the regular list item
//     htmlContent += `<li><strong>${question}:</strong></li>`;
//     htmlContent += `<li><strong>${answer}:</strong> ${answer}</li>`;

//   }
// });

// htmlContent += '</ul>';

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

console.log(htmlContent);




//
  
  const mailOptions = {
    from: "tamana.efatwira1@gmail.com",
    to: "tamana.efatwira2@gmail.com",
    // to: "tamana.efatwira2@gmail.com",

    subject: "Testing...",
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


const nodemailer = require('nodemailer');
const mimeTypes = require('mime-types');


export async function POST (request, res) {

  const formData = await request.formData()
  const signature = formData.get('signature');

  let arrayBuffer = await signature.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url=new URL(request.url);
  const email=url.searchParams.get("email");


    //Find the type of file... such as pdf, doc, jpeg, png...
  const mimeType = mimeTypes.lookup(signature.name) || 'application/octet-stream'; // Default to binary if MIME type is not found
  
 

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
      rejectUnauthorized: false
    }
  });

  // Construct the email
  const mailOptions = {
    from: 'tamana.efatwira1@gmail.com',
    to: email,
    subject: 'Director Signature',
    html: `<p>Request Approved by Account department! Click the link to access the request form:<link> http://localhost:3000/forms-table </link></p><img src="${signature}" alt="Director Signature"/>`,
    attachments: [
      {
        filename: 'attached-file',
        content: buffer,
        encoding: 'base64', // Set the encoding to base64
        contentType: mimeType,
      },
    ],
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
  
    return Response.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ error: 'An error occurred while sending the email.' });
  }
}



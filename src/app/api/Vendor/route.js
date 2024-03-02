const nodemailer = require("nodemailer");


export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const attachment = formData.get("attachment");
    const recipientEmail = formData.get("recipientEmail");
    const emailBody = formData.get("emailBody");
    const emailSubject = formData.get("emailSubject");

    // console.log('Attachment from route:', emailSubject);


    // Email configuration
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

    // Define email options
    const mailOptions = {
      from: "tamana.efatwira1@gmail.com",
      to: recipientEmail,
      subject: emailSubject,
      text: emailBody,
      Attachment:attachment,
      // Attachments: Include attachments if needed
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        Response.json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: ", info.response);
        Response.json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
   return Response.json({ message: "Internal server error" });
  }
}

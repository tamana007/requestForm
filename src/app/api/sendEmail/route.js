// pages/api/sendEmail.js
const nodemailer = require("nodemailer");
const mimeTypes = require("mime-types");
import { connectToDatabase } from "@/db/db";
import User from "@/db/model/User";
import MarketingRequestForm from "@/components/MarketingRequestForm";

export async function POST(request, res) {
  await connectToDatabase();
  // await connectToDatabase()

  const formData = await request.formData();
  const signature = formData.get("signature");
  // const directorEmail = formData.get("directEmail");

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const accountEmail = url.searchParams.get("dir");
  console.log(
    "id from send signatre to email route --------------$$$$$$$$",
    id
  );
  console.log(
    "Account email from formData received In Director Route--------------------------------------------------------------------------",
    accountEmail
  );
  // console.log('Check formdata0000000000000000000000000000000',formData);
  const getForm = await User.findOne({ _id: id });
  // console.log('Form Received*****************************',getForm);

  let arrayBuffer = await signature.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert the buffer to a base64 encoded string
  // const base64String = buffer.toString("base64");
  // const imgforEmail = "data:image/png;base64," + base64String
  // console.log("base6444444444444444444444444", imgforEmail)


  //Find the type of file... such as pdf, doc, jpeg, png...
  const mimeType =
    mimeTypes.lookup(signature.name) || "application/octet-stream"; // Default to binary if MIME type is not found

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

  // Construct the email
  const mailOptions = {
    from: "tamana.efatwira1@gmail.com",
    // to: "tamana.efatwira2@gmail.com",
    to: accountEmail,
    subject: "Director Signature",
    html: `      
      <div className="checkboxes">
      <label htmlFor="data1">
        <input
          disabled
          readOnly
          type="checkbox"
          id="data1"
          name="data1"
          checked=${getForm.socialMediaAd}
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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}
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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}

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
            checked=${getForm.specialMerchandise}

          />
          Any other (Please Specify)
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
            checked=${getForm.specialMerchandise}

          />
          What is your program name?
        </label>
      </div>

    </div>
      <div className="questions">
      <p>
        Question 1: What is your program name?
        <br />
        Answer: ${getForm.programName} <p type="text" name="answer1" />
      </p>
      <p>
        Question 2: Your Name:
        <br />
        Answer: ${getForm.name}
        <p type="text" name="answer2" />
      </p>
    
      <p>
        Question 2: Director Email Address:
        <br />
        Answer: ${getForm.directorEmail}
        <p type="text" name="answer2" />
      </p>
      <p>
        Question 2: Please Specify the Size and Quantity (If relevant)
        <br />
        Answer: ${getForm.size}
        <p type="text" name="answer2" />
      </p>
      <p>
        Question 2: Please Write any side-note for Social Media
        Post,Flyer/Brochure/Swag Item (If relevant)
        <br />
        Answer: ${getForm.sideNote}
        <p type="text" name="answer2" />
      </p>
      <p>
        Question 2: Amount Approved?
        <br />
        Answer: ${getForm.approvedAmount}
        <p type="text" name="answer2" />
      </p>
      <p>
        Question 2: Budget approval by the Accounts Department?
        <br />
        Answer: ${getForm.budgetApprovalByAccount}
        <p type="text" name="answer2" />
      </p>
      <p>
        Question 2: Invoince to be made under which Name/program ?
        <br />
        Answer: ${getForm.invoiceTobeMade}
        <p type="text" name="answer2" />
      </p>

       <hr /> 
      <div>
      <p>Director approval is attached!</p>
        <span>Please Click the Link to Sign the Request: <link href ="http://localhost:3000/account-review">http://localhost:3000/account-review?id=${id}&email=${accountEmail} </link> </span>
       
      </div>
      
      <br />

      <img style="width:250px;" src="cid:${base64String}" alt="signature"/>

      </div>
      
      `,
    // html: `<p>Director Signature:</p><img src="${signature}" alt="Director Signature"/>`,
    attachments: [
      {
        filename: "attached-file",
        content: buffer,
        encoding: "base64", // Set the encoding to base64
        contentType: mimeType,
        cid: imgforEmail,
      },
    ],
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return Response.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({
      error: "An error occurred while sending the email.",
    });
  }
}

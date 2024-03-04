import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { reorderObject } from "@/data/sortObj";
import nodemailer from "nodemailer";
import mimeTypes from "mime-types";
import { connectToDatabase } from "@/db/db";
import User from "@/db/model/User";

export async function POST(req) {
  await connectToDatabase();

  // Receive Data from component
  const formData = await req.formData();
  const file1 = formData.get("file1");
  const file2 = formData.get("file2");
  const file3 = formData.get("file3");
  const recipientEmail = formData.get("recipientEmail");
  const emailBody = formData.get("emailBody");
  const emailSubject = formData.get("emailSubject");

  let arrayBuffer1, arrayBuffer2, arrayBuffer3;
  let buffer1, buffer2, buffer3;
  let mimeType, mimeType2, mimeType3;

  if (file1) {
    arrayBuffer1 = await file1.arrayBuffer();
    buffer1 = Buffer.from(arrayBuffer1);
    mimeType = mimeTypes.lookup(file1.name) || "application/octet-stream";
  }

  if (file2) {
    arrayBuffer2 = await file2.arrayBuffer();
    buffer2 = Buffer.from(arrayBuffer2);
    mimeType2 = mimeTypes.lookup(file2.name) || "application/octet-stream";
  }

  if (file3) {
    arrayBuffer3 = await file3.arrayBuffer();
    buffer3 = Buffer.from(arrayBuffer3);
    mimeType3 = mimeTypes.lookup(file3.name) || "application/octet-stream";
  }

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

  const mailOptions = {
    from: "tamana.efatwira1@gmail.com",
    to: recipientEmail,
    subject: emailSubject,
    text: emailBody,
    attachments: [],
  };

  // Check if file1 is provided
  if (file1) {
    mailOptions.attachments.push({
      filename: file1.name,
      content: buffer1,
      encoding: "base64",
      contentType: mimeType,
    });
  }

  // Check if file2 is provided
  if (file2) {
    mailOptions.attachments.push({
      filename: file2.name,
      content: buffer2,
      encoding: "base64",
      contentType: mimeType2,
    });
  }

  // Check if file3 is provided
  if (file3) {
    mailOptions.attachments.push({
      filename: file3.name,
      content: buffer3,
      encoding: "base64",
      contentType: mimeType3,
    });
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return Response.json("Email Has been Sent...");
}

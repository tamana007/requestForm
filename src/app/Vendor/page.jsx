"use client";
import { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import SuccessMessage from "@/components/SuccessMessage";
import Logo from "@/components/Logo";
import useSuccsess from "@/utils/useSuccess";

function SendToVendorForm() {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [attachment, setAttachment] = useState("");
  const [secondAttachment, setSecondAttachment] = useState("");
  const [thirdAttachment, setThirdAttachment] = useState("");
  // const [isSuccess, setIsSuccess] = useState(false); // Renamed from successMessage
  const {isSuccess, setIsSuccess} = useSuccsess()

  const handleEmailSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const hadleSecondAttachment = (e) => {
    const file2 = e.target.files[0];
    setSecondAttachment(file2);
  };

  const hadleThirdAttachment = (e) => {
    const file3 = e.target.files[0];
    setThirdAttachment(file3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipientEmail", recipientEmail);
    formData.append("emailBody", emailBody);
    formData.append("emailSubject", emailSubject);
    if(!!attachment){
    formData.append("file1", attachment);

    }
    if(!!secondAttachment){
      formData.append("file2", secondAttachment);

    }
    if(!!thirdAttachment){
    formData.append("file3", thirdAttachment);


    }

    try {
      const response = await fetch("/api/Vendor", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmailSubject("");
        setAttachment("");
        setEmailSubject("");
        setRecipientEmail("");
        setEmailBody("");
      } else {
        console.log("Email not sent");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      {isSuccess && <SuccessMessage />}

      <>
        <Logo />
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "chocolate",
          }}
        >
          Communication Review Page
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Paper
            style={{
              padding: "4%",
              marginTop: "20px",
              borderRadius: "10px",
              border: "2px solid orange",
              width: "25%",
              marginTop: "-15%",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            }}
            elevation={3}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{
                color: "darkgreen",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
              }}
            >
              Send Email To Vendor
            </Typography>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    label="Recipient Email"
                    type="email"
                    value={recipientEmail}
                    onChange={handleRecipientEmailChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    label="Email Subject"
                    value={emailSubject}
                    onChange={handleEmailSubjectChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    label="Email Body"
                    multiline
                    rows={4}
                    value={emailBody}
                    onChange={handleEmailBodyChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "20px", color: "darkgreen" }}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleAttachmentChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "20px", color: "darkgreen" }}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={hadleSecondAttachment}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "20px", color: "darkgreen" }}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={hadleThirdAttachment}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <Button
                    style={{ borderRadius: "25px" }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Send To Vendor
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </div>
      </>
    </div>
  );
}

export default SendToVendorForm;

'use client'
import { useState } from 'react';
// import { TextField, Button } from '@material-ui/core';
// import { TextField, Button } from '@mui/material';
import { TextField, Button, Grid ,Paper} from '@mui/material';

import styles from '@/Style/vendor.module.css';
import Logo from '@/components/Logo'


function SendToVendorForm() {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [attachment, setAttachment] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata=new FormData()
    formdata.append("recipientEmail",recipientEmail);
    formdata.append("emailBody",emailBody);
    formdata.append("emailSubject",emailSubject);
    formdata.append("attachment",attachment);
    console.log('check FormData',formdata);
    
    // Logic to send email to vendor
    // You can use APIs or other methods to send the email with the provided data
    const sendToBackend=fetch('/api/Vendor',{
      method:"POST",
      body:formdata,
    })
    if(!sendToBackend){
      console.log('not send');

    }
    else{
      alert("success");
    }
  
  };

  return (
    <>
<Logo/>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper style={{ padding: '20px', marginTop: '20px', borderRadius: '10px', border: '2px solid orange', width: '40%',marginTop:'-20%' }} elevation={3} >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                label="Recipient Email"
                type="email"
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
                variant="outlined"
                required
              />
            </Grid >
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                label="Email Subject"
                value={emailSubject}
                onChange={handleEmailSubjectChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}style={{ marginTop: '20px' }}>
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
            <Grid item xs={12}style={{ marginTop: '20px' }}>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </Grid>
            <Grid item xs={12}style={{ marginTop: '20px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Send Email
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </div>
    </>
  )
}

export default SendToVendorForm;

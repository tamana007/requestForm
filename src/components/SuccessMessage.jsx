"use client";
import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Table from "@mui/material/Table";
import useSuccsess from "@/utils/useSuccess";
import styles from '@/Style/successsMessage.module.css'

function SuccessMessage() {
  const [showMessage, setShowMessage] = useState(true);
  const [closed, setClosed] = useState(false);
  const { isSuccess, setIsSuccess } = useState(true);

  const handleClose = () => {
    setShowMessage(false);
    setClosed(true);
    // setIsSuccess(false);
  };

  return (
    <>
      {showMessage && (
        <div className={styles.successContainer}>
          <div>
            <Paper
              elevation={5}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "300px",
                padding: "16px",
                textAlign: "center",
                backgroundColor: "#f0f8ff",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 9999,
              }}
            >
              <Typography
                variant="h6"
                style={{ color: "green", marginBottom: "8px" }}
              >
                Your message has been successfully sent!
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
}

export default SuccessMessage;
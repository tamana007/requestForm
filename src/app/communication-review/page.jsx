"use client";
import Logo from "@/components/Logo";
import styles from "../../Style/communication.module.css";
// import {questions,options} from '../../data/options'
// communication.js
import React, { useEffect, useState } from "react";
import { options, questions } from "@/data/options";

// const Page = () => {
const Page = () => {
  const [communications, setCommunications] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/communication/");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setCommunications(data.users);
  //       console.log("option array:", options[0].description);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API
        const response = await fetch("/api/communication/");
        // Handle response
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Store fetched data in state
        setCommunications(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleButtonClick = (communicationId) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [communicationId]: !prevState[communicationId], // Toggle the expanded state for the clicked item
    }));
  };
  

  return (
    <>
      <Logo />

      <div className={styles["dashboard-container"]}>
        {communications.map((com) => (
          <div key={com._id} className={styles["dashboard-item"]}>
            <div className={styles["logo-container"]}>
              <Logo className={styles["items-logo"]} />{" "}
              {/* Adjust the width and height as needed */}
              <button
                className={styles["dashboard-button"]}
                onClick={() => handleButtonClick(com._id)}
              >
                &#8942;
              </button>
            </div>
            <div className={styles["communication-details"]}>
              <div>
                <span>{questions[0].description}</span> <p>{com.name}</p>
              </div>
              <div>
                <p>{questions[1].description}</p>
                <p>{com.directorEmail}</p>
              </div>

              {/* Render additional details if expanded */}
              {expandedItems[com._id] && (
                <>
                  <div>
                    <p>{questions[2].description}</p>
                    <p>{com.sideNote}</p>
                  </div>
                  <div>
                    {questions[3].description}
                    <p>{com.sideNote}</p>
                  </div>
                  <div>
                    {questions[4].description}
                    <p>{com.sideNote}</p>
                  </div>
                  <div>
                    {questions[5].description}
                    <p>{com.approvedAmount}</p>
                  </div>
                  {/* Add more details as needed */}
                  <div>
                    {questions[6].description}
                    <p>{com.budgetApprovalByAccount}</p>
                  </div>
                  <div>
                    {questions[7].description}
                    <p>{com.invoiceTobeMade}</p>
                  </div>
                </>
              )}
            </div>

            <div className={styles["signature-container"]}>
              <div className={styles["signature-container-left"]}>
                Left signature placeholder
                <div className={styles["signature-placeholder"]}></div>
              </div>
              <div className={styles["signature-container-right"]}>
                Right signature placeholder
                <div className={styles["signature-placeholder"]}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;

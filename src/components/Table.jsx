"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress, // Step 1: Import CircularProgress
} from "@mui/material";
import Logo from "@/components/Logo";
import styles from "@/Style/tableData.module.css";
import Link from "next/link";

function TableComp({handleView}) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true); // Step 2: Create loading state
 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/formsTable");
        const data = await response.json();
        setForms(data.users);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Logo />
      <div style={{ padding: "20px" }}>
        <div className={styles.requestTitle}>
        <h2>List of All Incoming Requests ...</h2>

        </div>
        {loading? 
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
         <CircularProgress style={{ color: '#2196f3' }} thickness={5} size={50} />
          </div>:
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className={styles["customTableHeader"]}>
                <TableCell>View</TableCell>
                <TableCell>Eddit</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Social Media Ad</TableCell>
                <TableCell>Business Card</TableCell>
                <TableCell>Flyer</TableCell>
                <TableCell>Brochure</TableCell>
                <TableCell>Pullup Banner</TableCell>
                <TableCell>Table top Banner</TableCell>
                <TableCell>Special Merchandise/Swag item</TableCell>
                <TableCell>Placard</TableCell>
                <TableCell>NewsPaper/Magazine Ad Outdoor</TableCell>
                <TableCell>Marketing</TableCell>
                <TableCell>Any other (Please Specify)</TableCell>
                <TableCell>What is your program name?</TableCell>
                <TableCell>Your Name:</TableCell>
                <TableCell>Director Email Address</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Side Note</TableCell>
                <TableCell>Approved Amount</TableCell>
                <TableCell>Budget Approval By Account</TableCell>
                <TableCell>Invoice To Be Made</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form._id}>
                  <TableCell>
                    {/* ****************Here we define the route by using ${} ***********************/  }
                    <Link href={`/view-form/${form._id}`} className={styles["customButton1"]}
                      variant="outlined"
                      // onClick={() => handleView(form._id)}
                    >
                      View
                    </Link>
                    {/* Buttons for view, edit, and delete */}
                  </TableCell>

                  <TableCell>
                    <Button className={styles["customButton2"]}
                      variant="outlined"
                      onClick={() => handleEdit(form._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className={styles["customButton3"]}
                      variant="outlined"
                      onClick={() => handleDelete(form._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>{form?._id.toString()}</TableCell>
                  <TableCell>{form?.socialMediaAd?.toString()}</TableCell>
                  <TableCell>{form?.businessCard?.toString()}</TableCell>
                  <TableCell>{form?.flyer?.toString()}</TableCell>
                  <TableCell>{form?.brochure?.toString()}</TableCell>
                  <TableCell>{form?.pullupBanner?.toString()}</TableCell>
                  <TableCell>{form?.tableTopBanner?.toString()}</TableCell>
                  <TableCell>{form?.specialMerchandise?.toString()}</TableCell>
                  <TableCell>{form?.placard?.toString()}</TableCell>
                  <TableCell>{form?.newsPaperMagazineAdOutdoor?.toString()}</TableCell>
                  <TableCell>{form?.marketing?.toString()}</TableCell>
                  <TableCell>{form?.anyOther?.toString()}</TableCell>
                  <TableCell>{form?.programName?.toString()}</TableCell>
                  <TableCell>{form?.name?.toString()}</TableCell>
                  <TableCell>{form?.directorEmailAddress?.toString()}</TableCell>
                  <TableCell>{form?.size?.toString()}</TableCell>
                  <TableCell>{form?.sideNote?.toString()}</TableCell>
                  <TableCell>{form?.approvedAmount?.toString()}</TableCell>
                  <TableCell>{form?.budgetApprovalByAccount?.toString()}</TableCell>
                  <TableCell>{form?.invoiceToBeMade?.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}
      </div>
    </>
  );
}

export default TableComp;

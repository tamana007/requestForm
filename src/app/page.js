"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MarketingRequestForm from "@/components/marketingRequestForm";
import TempComponent from "@/components/TempComponent";
import DirectorReview from "./director-review";
import AccountsReview from "@/components/AccountsReview";
import { useState } from "react";
import Layout from "@/components/Layout";
// import { Provider } from "react-redux";

export default function Home() {
  const [director, setDirector] = useState(false);
  const [account, setAccount] = useState(false);

  function directorFunc() {
    setDirector(true);
  }
  function accountFunc() {
    setAccount(!account);
    setDirector(false)
    console.log("account", account);
  }

  // console.log("hellooo")
  return (
    <Layout className={styles.main}>
      {director ? (
  <DirectorReview accountFunc={accountFunc} account={account} />
) : account ? (
  <AccountsReview />
) : (
  <TempComponent directorFunc={directorFunc} />
)}

      {/* {director?<DirectorReview/>:<TempComponent directorFunc={directorFunc}/>
      
      } */}
      {/* <DirectorReview/> */}
    </Layout>
  );
}

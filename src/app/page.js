"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MarketingRequestForm from "@/components/marketingRequestForm";
import TempComponent from "@/components/RequestForm";
import DirectorReview from "./director-review";
import AccountsReview from "@/components/AccountsReview";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
// import { Provider } from "react-redux";

export default function Home() {
  const [director, setDirector] = useState(false);
  const [account, setAccount] = useState(false);

  function directorFunc() {
    setDirector(true);
  }
  function accountFunc() {
    setAccount(!account);
    setDirector(false);
    console.log("account", account);
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className={styles.centeredContainer}>
          <header>
            <Logo />
          </header>
          <TempComponent directorFunc={directorFunc} />
        </div>
      )}
    </>
  );
}

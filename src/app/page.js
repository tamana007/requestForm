"use client";
import styles from "./page.module.css";
import TempComponent from "@/components/RequestForm";
import { useState, useEffect } from "react";

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

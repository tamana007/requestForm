import Image from "next/image";
import styles from "./page.module.css";
import MarketingRequestForm from "@/components/marketingRequestForm";
import TempComponent from "@/components/TempComponent";
import DirectorReview from "./director-review";

export default function Home() {
  console.log("hellooo")
  return (
    <main className={styles.main}>
      <TempComponent />
      {/* <DirectorReview/> */}
    </main>
  );
}

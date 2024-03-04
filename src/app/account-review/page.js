import React, { Suspense } from "react";
import AccountsReview from "../../components/account-review";
import Logo from "@/components/Logo";

function page() {
  return (
    <Suspense>
      <Logo />
      <AccountsReview />
    </Suspense>
  );
}

export default page;

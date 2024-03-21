import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "~/components/Navbar";
import OtpVerification from "~/components/OtpVerification";

function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    const isRedirected = router.query.from === "redirect";
    if (!isRedirected) {
      void router.push("/");
    }
  }, [router.query.from, router]);
  return (
    <div>
      <Navbar />
      <OtpVerification />
    </div>
  );
}

export default RegisterPage;

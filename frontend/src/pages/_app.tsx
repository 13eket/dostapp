import "../styles/global.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";

function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return null;
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <FormProvider>
    <AuthProvider>
      <ScrollToTop />
      <Component {...pageProps} />
    </AuthProvider>
  </FormProvider>
);

export default MyApp;

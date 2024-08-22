import type { AppProps } from "next/app";
import MainLayout from "@/components/main-layout";
import "./globals.css";
import ThemeProvider from "@/hooks/use-theme";
import LocaleProvider from "@/hooks/use-locale";
import AuthProvider from "@/hooks/use-auth";
import ModalProvider from "@/hooks/use-modal";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/api";
import { ToastContainer } from "react-toastify";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark  border-black dark:border-white">
      <div id="modal"></div>
      <ToastContainer/>

      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AuthProvider>
            <LocaleProvider>
              <ThemeProvider>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </ThemeProvider>
            </LocaleProvider>
          </AuthProvider>
        </ModalProvider>
      </QueryClientProvider>
    </div>
  );
}

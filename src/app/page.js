"use client";
import { QueryClient, QueryClientProvider } from "react-query";

import styles from "./page.module.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GateWay from "@/components/Gateway";

// Initialize a QueryClient
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <main className={styles.main}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <GateWay>{/* <Dashboard /> */}</GateWay>
        </main>
      </Provider>
    </QueryClientProvider>
  );
}

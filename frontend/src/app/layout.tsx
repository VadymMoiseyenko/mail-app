import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import MailList from "./components/MailList";
import SidebarHeader from "./components/SidebarHeader";
import { getMails } from "@/lib/api";

export const metadata: Metadata = {
  title: "Mail App",
  description: "A simple mail application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mails = await getMails();

  return (
    <html lang="en">
      <body>
        <Box className={styles.container}>
          <Box component="aside" className={styles.sidebar}>
            <SidebarHeader />
            <MailList mails={mails ?? []} />
          </Box>
          <Box component="main" className={styles.content}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}

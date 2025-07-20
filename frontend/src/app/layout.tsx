import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { SidePanel } from "./components/SidePanel/SidePanel";

export const metadata: Metadata = {
  title: "Mail App",
  description: "A simple mail application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Box className={styles.container}>
          <Box component="aside" className={styles.sidebar}>
            <SidePanel />
          </Box>
          <Box component="main" className={styles.content}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}

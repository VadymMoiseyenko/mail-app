import MailList from "./components/MailList";
import SidebarHeader from "./components/SidebarHeader";
import styles from "./page.module.css";
import { getMails } from "@/lib/api";

export default async function Home() {
  const mails = await getMails();

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SidebarHeader />
        <MailList mails={mails ?? []} />
      </div>
      <div className={styles.content}>
        <h1>Mail App</h1>
        <p>Select a mail from the list to view its content</p>
      </div>
    </div>
  );
}

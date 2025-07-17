import MailList from "./components/MailList";
import styles from "./page.module.css";
import { getMails } from "@/lib/api";

export default async function Home() {
  const mails = await getMails();

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Mail List</h2>
        <MailList mails={mails ?? []} />
      </div>
      <div className={styles.content}>
        <h1>Mail App</h1>
        <p>Select a mail from the list to view its content</p>
      </div>
    </div>
  );
}

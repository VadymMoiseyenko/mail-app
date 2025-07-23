import styles from "./MailList.module.css";
import MailItem from "./MailItem";
import { Mail } from "@common/schema";

interface MailListProps {
  mails: Mail[];
}

export default function MailList({ mails }: MailListProps) {
  return (
    <div className={styles.mailList}>
      {mails.map((mail) => (
        <MailItem mail={mail} key={mail.id} />
      ))}
    </div>
  );
}

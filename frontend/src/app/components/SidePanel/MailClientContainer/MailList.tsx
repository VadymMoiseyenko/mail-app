import styles from "./MailList.module.css";
import { Mail } from "@common/types/mail";
import MailItem from "./MailItem";

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

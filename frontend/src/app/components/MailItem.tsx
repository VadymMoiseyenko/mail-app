import styles from "./MailList.module.css";
import { Mail } from "@common/types/mail";
import DeleteButton from "./DeleteButton";

interface MailItemProps {
  mail: Mail;
}

export default function MailItem({ mail }: MailItemProps) {
  return (
    <div className={styles.mailItem}>
      <div className={styles.mailContent}>
        <div className={styles.mailTo}>{mail.to}</div>
        <div className={styles.mailSubject}>{mail.subject}</div>
        <div className={styles.mailPreview}>
          {mail.body.length > 50
            ? `${mail.body.substring(0, 50)}...`
            : mail.body}
        </div>
      </div>
      <div className={styles.mailActions}>
        <DeleteButton mailId={mail.id} />
      </div>
    </div>
  );
}
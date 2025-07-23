import styles from "./MailList.module.css";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { Mail } from "@common/index";

interface MailItemProps {
  mail: Mail;
}

export default function MailItem({ mail }: MailItemProps) {
  return (
    <div className={styles.mailItem}>
      <Link href={`/${mail.id}`} key={mail.id} className={styles.mailLink}>
        <div className={styles.mailContent}>
          <div className={styles.mailTo}>{mail.to}</div>
          <div className={styles.mailSubject}>{mail.subject}</div>
          <div className={styles.mailPreview}>
            {mail.body.length > 50
              ? `${mail.body.substring(0, 50)}...`
              : mail.body}
          </div>
        </div>
      </Link>
      <div className={styles.mailActions}>
        <DeleteButton mailId={mail.id} />
      </div>
    </div>
  );
}

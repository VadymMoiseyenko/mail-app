import styles from "./MailList.module.css";

interface Mail {
  id: number;
  to: string;
  subject: string;
  body: string;
}

interface MailListProps {
  mails: Mail[];
}

export default function MailList({ mails }: MailListProps) {
  return (
    <div className={styles.mailList}>
      {mails.map((mail) => (
        <div key={mail.id} className={styles.mailItem}>
          <div className={styles.mailTo}>{mail.to}</div>
          <div className={styles.mailSubject}>{mail.subject}</div>
          <div className={styles.mailPreview}>
            {mail.body.length > 50
              ? `${mail.body.substring(0, 50)}...`
              : mail.body}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Mail } from "@common/types/mail";
import { getMail } from "@/lib/api/mailService";
import EmailForm from "../components/EmailForm";

interface MailDetailProps {
  params: {
    "mail-id": string;
  };
}

const MailDetail = ({ params }: MailDetailProps) => {
  const mailId = parseInt(params["mail-id"]);
  const [mail, setMail] = useState<Mail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isNaN(mailId)) {
          setError("Invalid mail ID");
          return;
        }

        const mailData = await getMail(mailId);
        if (mailData) {
          setMail(mailData);
        } else {
          setError("Email not found");
        }
      } catch (err) {
        console.error("Error fetching mail:", err);
        setError("Failed to load email");
      } finally {
        setLoading(false);
      }
    };

    fetchMail();
  }, [mailId]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading email...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {mail && <EmailForm initialData={mail} mode="view" showActions={true} />}
    </div>
  );
};

export default MailDetail;

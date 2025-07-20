import { getMail } from "@/lib/api/mailService";
import EmailForm from "../components/EmailForm";
import { notFound } from "next/navigation";

interface MailDetailProps {
  params: Promise<{ "mail-id": string }>;
}

const MailDetail = async ({ params }: MailDetailProps) => {
  const { "mail-id": mailIdStr } = await params;
  const mailId = parseInt(mailIdStr, 10);

  if (isNaN(mailId)) {
    notFound();
  }

  try {
    const mail = await getMail(mailId);

    if (!mail) {
      notFound();
    }

    return (
      <div>
        <EmailForm initialData={mail} mode="view" showActions={true} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching mail:", error);
    notFound();
  }
};

export default MailDetail;

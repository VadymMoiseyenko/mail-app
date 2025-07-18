import EmailForm from "../components/EmailForm";

export default function CreateNewPage() {
  return (
    <EmailForm 
      mode="create"
      title="Create New Email"
      showActions={true}
    />
  );
}

import { SignUpForm } from "@/components/auth/SignUpForm";
import RocketIcon from "~icons/skill-icons/rocket";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <RocketIcon className="text-7xl" />
        <h1 className="text-2xl font-semibold">Sign Up</h1>
      </div>
      <SignUpForm />
    </div>
  );
}

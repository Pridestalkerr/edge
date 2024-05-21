import { SignInForm } from "@/components/auth/SignInForm";
import RocketIcon from "~icons/skill-icons/rocket";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <RocketIcon className="text-7xl" />
        <h1 className="text-2xl font-semibold">Sign In</h1>
      </div>
      <SignInForm />
    </div>
  );
}

import { useAuth } from "@/lib/store/auth";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};
export default async function Layout(props: LayoutProps) {
  const { me } = await useAuth();
  if (me) {
    redirect("/dashboard");
  }

  return <Render {...props} />;
}

const Render = (props: LayoutProps) => {
  return <>{props.children}</>;
};

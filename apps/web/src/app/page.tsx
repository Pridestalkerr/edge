import { Button, Input, Progress } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Input placeholder="Type something..." />
      <Button color="primary">Press me</Button>
      <Progress aria-label="Loading..." value={60} className="max-w-md" />
    </div>
  );
}

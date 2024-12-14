"use client";

import { api } from "@/lib/trpc/client";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const { data, isLoading } = api.test.hello.useQuery(
    {
      name,
    },
    {
      enabled: name.length > 3, // you would usually debounce this
    },
  );
  return (
    <div>
      <h1>Hello, {data?.message}</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

// An example of RSC authentication

import { cookies } from "next/headers";
import { cache } from "react";
import { api } from "../trpc/server";

const getMe = async () => {
  // TODO: ENV this
  const token = cookies().get("token")?.value;
  if (!token) {
    return {
      me: null,
    };
  }
  return api.auth.me.query(undefined, {
    context: {
      token,
    },
  });
};

export const useAuth = cache(getMe);

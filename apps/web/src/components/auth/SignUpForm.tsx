"use client";

import { api } from "@/lib/trpc/client";
import { Button, Checkbox, Divider, Input, Link } from "@nextui-org/react";
import GithubIcon from "~icons/fe/github";
import GoogleIcon from "~icons/flat-color-icons/google";
import EyeOpenIcon from "~icons/solar/eye-bold";
import EyeClosedIcon from "~icons/solar/eye-closed-linear";
import { useState } from "react";

// Courtesy of NextUI PRO https://www.nextui.pro/
export const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const signUpM = api.auth.signUp.useMutation();

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <Input
              isRequired
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
            />
            <Input
              isRequired
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeClosedIcon className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <EyeOpenIcon className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <Input
              isRequired
              classNames={{
                inputWrapper: "rounded-t-none",
              }}
              endContent={
                <button type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <EyeClosedIcon className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <EyeOpenIcon className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              type={isConfirmVisible ? "text" : "password"}
              variant="bordered"
            />
          </div>
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button startContent={<GoogleIcon className="text-xl" />} variant="bordered">
            Sign Up with Google
          </Button>
          <Button
            startContent={<GithubIcon className="text-xl text-default-500" />}
            variant="bordered"
          >
            Sign Up with Github
          </Button>
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/sign-in" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

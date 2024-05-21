"use client";

// import { Icon } from "@iconify/react";
import { Button, Checkbox, Divider, Input, Link } from "@nextui-org/react";
import GithubIcon from "~icons/fe/github";
import GoogleIcon from "~icons/flat-color-icons/google";
import EyeOpenIcon from "~icons/solar/eye-bold";
import EyeClosedIcon from "~icons/solar/eye-closed-linear";
import { useState } from "react";

// Courtesy of NextUI PRO https://www.nextui.pro/
export const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <Input
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
              classNames={{
                inputWrapper: "rounded-t-none",
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
          </div>
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button color="primary" type="submit">
            Log In
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button startContent={<GoogleIcon className="text-xl" />} variant="bordered">
            Continue with Google
          </Button>
          <Button
            startContent={<GithubIcon className="text-xl text-default-500" />}
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/sign-up" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

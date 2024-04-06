import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-5xl p-2 mx-auto h-full flex flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Welcome back to Singlish Chat 🇸🇬
      </h1>
      <form className="flex justify-center mt-8 w-full max-w-60">
        <div className="w-full flex flex-col gap-2">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="flex justify-center mt-2">
            <Button variant="default" type="submit" className="w-full max-w-28">
              Login
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <p className="text-sm font-medium leading-none text-center">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className={buttonVariants({
              variant: "link",
              className: "px-0 py-0",
            })}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

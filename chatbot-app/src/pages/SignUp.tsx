import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-5xl p-8 mx-auto min-h-full flex flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Welcome to Singlish Chat 🇸🇬
      </h1>
      <form className="flex justify-center mt-8 w-full max-w-60">
        <div className="w-full flex flex-col gap-2">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="flex justify-center mt-2">
            <Button variant="default" type="submit" className="w-full max-w-28">
              Sign up
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <p className="text-sm font-medium leading-none text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className={buttonVariants({
              variant: "link",
              className: "px-0 py-0",
            })}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

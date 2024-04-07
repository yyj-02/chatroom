import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { useDenyLoggedIn } from "@/hooks/useDenyLoggedIn";

const SignUp = () => {
  useDenyLoggedIn();

  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn();

  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    navigate("/");
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      toast({
        variant: "destructive",
        title: "Please fill in all fields.",
      });
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        toast({
          variant: "default",
          title: "Account created successfully.",
        });

        navigate("/");
      } else {
        throw new Error("User not created.");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col items-center justify-center p-8">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Singlish Chat 🇸🇬
      </h1>
      <form
        className="mt-8 flex w-full max-w-60 justify-center"
        onSubmit={handleSignUp}
      >
        <div className="flex w-full flex-col gap-2">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            disabled={loading}
          />
          <div className="mt-2 flex justify-center">
            <Button
              variant="default"
              type="submit"
              className="w-full max-w-28"
              disabled={loading}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <p className="text-center text-sm font-medium leading-none">
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

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col items-center justify-center p-8">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome back to Singlish Chat 🇸🇬
      </h1>
      <form
        className="mt-8 flex w-full max-w-60 justify-center"
        onSubmit={handleLogin}
      >
        <div className="flex w-full flex-col gap-2">
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
              Login
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <p className="text-center text-sm font-medium leading-none">
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

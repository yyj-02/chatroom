import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";

const Home = () => {
  const { toast } = useToast();
  const isLoggedIn = useIsLoggedIn();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setName(auth.currentUser?.displayName ?? "");
    } else {
      setName("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast({
          variant: "default",
          title: "Successfully logged out",
        });
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
      });
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col items-center justify-center p-8">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        {isLoggedIn ? `Hi, ${name}!` : "Welcome to Singlish Chat 🇸🇬"}
      </h1>
      <p className="mt-8 text-center text-sm font-medium leading-none text-foreground/50">
        Created by: Jet, Justin, Silas, Yong Jie
      </p>
      {isLoggedIn ? (
        <div className="mt-8 flex flex-col items-stretch justify-center gap-4">
          <Link
            to="/rooms"
            className={buttonVariants({
              variant: "default",
            })}
          >
            Go to Rooms
          </Link>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/sign-up"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

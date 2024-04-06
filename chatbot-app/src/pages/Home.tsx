import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  // Check if login
  const login = false;
  // Handle logout
  const logout = () => {
    console.log("Logout");
  };

  return (
    <div className="w-full max-w-5xl p-8 mx-auto min-h-full flex flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Welcome to Singlish Chat 🇸🇬
      </h1>
      <p className="text-sm font-medium leading-none text-center mt-8 text-foreground/50">
        Created by: Jet, Justin, Silas, Yong Jie
      </p>
      {login ? (
        <div className="mt-8 flex flex-col gap-4 items-stretch justify-center">
          <Link
            to="/rooms"
            className={buttonVariants({
              variant: "default",
            })}
          >
            Go to Rooms
          </Link>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="mt-8 flex gap-4 items-center justify-center">
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

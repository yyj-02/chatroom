import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full max-w-5xl p-8 mx-auto h-full flex flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Oops 😬
      </h1>
      <p className="text-sm font-medium leading-none text-center mt-8">
        Sorry, an unexpected error has occurred.
      </p>
      <Link
        to=".."
        className={cn(
          "mt-2 font-bold text-primary",
          buttonVariants({ variant: "link" })
        )}
      >
        Go back
      </Link>
    </div>
  );
};

export default ErrorPage;

import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { useEffect } from "react";

export const useDenyLoggedIn = () => {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
};

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return isLoggedIn;
};

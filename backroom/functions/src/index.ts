// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";
import {addMessage} from "./functions/addMessage";

initializeApp();

export {addMessage};

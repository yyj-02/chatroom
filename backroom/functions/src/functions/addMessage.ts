// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {logger} from "firebase-functions";
import {
  FunctionsErrorCode,
  HttpsError,
  onCall,
} from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import {Timestamp, getFirestore} from "firebase-admin/firestore";
import {
  BadRequestError,
  DatabaseError,
  TokenVerificationError,
  UnauthorizedError,
} from "./errors";

async function addMessageToDatabase(
  message: string,
  roomId: string,
  userId: string,
  userName: string
): Promise<string> {
  try {
    const db = getFirestore();
    const roomRef = db.collection("rooms").doc(roomId);
    const translatedMessage = `Translated message: ${message}`;

    const newMessageData = {
      originalMessage: message,
      translatedMessage,
      user: {id: userId, name: userName},
      timestamp: Timestamp.now(),
      room: roomRef,
    };

    const messageRef = await db.collection("messages").add(newMessageData);
    return messageRef.id;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
}

export const addMessage = onCall((req) => {
  try {
    const userId = req.auth?.uid;
    const userName = req.auth?.token.name || null;

    if (!userId) throw new UnauthorizedError("Unauthorized");

    const {message, roomId} = req.data;
    if (!message || !roomId) throw new BadRequestError("Bad request");

    const messageId = addMessageToDatabase(message, roomId, userId, userName);

    return {id: messageId};
  } catch (error: any) {
    logger.error(error.name, error);

    let statusCode: FunctionsErrorCode = "internal";
    let message = "Internal error";

    if (
      error instanceof UnauthorizedError ||
      error instanceof TokenVerificationError ||
      error instanceof DatabaseError ||
      error instanceof BadRequestError
    ) {
      statusCode = error.code;
      message = error.message;
    }

    throw new HttpsError(statusCode, message);
  }
});

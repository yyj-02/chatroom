// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {logger} from "firebase-functions/v2";
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
  TranslationError,
  UnauthorizedError,
} from "../utils/errors";
import {getTranslatedMessage} from "../utils/translateMessage";
import {getAuth} from "firebase-admin/auth";

const addMessageToDatabase = async (
  message: string,
  roomId: string,
  userId: string,
  userName: string
): Promise<string> => {
  try {
    const db = getFirestore();
    const roomRef = db.collection("rooms").doc(roomId);
    const translatedMessage = await getTranslatedMessage(message);
    logger.log("Translated message: ", translatedMessage);

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
};

export const addMessage = onCall(async (req) => {
  try {
    const userId = req.auth?.uid;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const userRecord = await getAuth().getUser(userId);
    if (!userRecord) throw new UnauthorizedError("Unauthorized");

    const userName = userRecord.displayName || "";

    const {message, roomId} = req.data;
    if (!message || !roomId) throw new BadRequestError("Bad request");

    const messageId = await addMessageToDatabase(
      message,
      roomId,
      userId,
      userName
    );

    return {id: messageId};
  } catch (error: any) {
    logger.error(error.name, error);

    let statusCode: FunctionsErrorCode = "internal";
    let message = "Internal error";

    if (
      error instanceof UnauthorizedError ||
      error instanceof TokenVerificationError ||
      error instanceof DatabaseError ||
      error instanceof BadRequestError ||
      error instanceof TranslationError
    ) {
      statusCode = error.code;
      message = error.message;
    }

    throw new HttpsError(statusCode, message);
  }
});

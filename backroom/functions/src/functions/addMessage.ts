// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {logger} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import {Timestamp, getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";
import {
  DatabaseError,
  TokenVerificationError,
  UnauthorizedError,
} from "./errors";

async function verifyIdToken(idToken: string) {
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    return {uid: decodedToken.uid, name: decodedToken.name};
  } catch (error: any) {
    throw new TokenVerificationError(error);
  }
}

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

export const addMessage = onRequest(async (req, res) => {
  try {
    const idToken = req.headers.authorization;
    if (!idToken) throw new UnauthorizedError("Unauthorized");

    const {uid: userId, name: userName} = await verifyIdToken(idToken);
    const {message, roomId} = req.body;
    const messageId = await addMessageToDatabase(
      message,
      roomId,
      userId,
      userName
    );

    res.json({id: messageId});
  } catch (error: any) {
    logger.error(error.name, error);

    let statusCode = 500;
    let message = "Internal server error";

    if (
      error instanceof UnauthorizedError ||
      error instanceof TokenVerificationError ||
      error instanceof DatabaseError
    ) {
      statusCode = error.code;
      message = error.message;
    }

    res.status(statusCode).send(message);
  }
});

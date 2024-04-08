import {logger} from "firebase-functions/v2";
import {TranslationError} from "./errors";

const HUGGINGFACE_MODEL_URL =
  "https://api-inference.huggingface.co/models/jpeng13/singlish-to-english";

export const getTranslatedMessage = async (
  message: string
): Promise<string> => {
  try {
    const data = {inputs: message};
    const huggingfaceResponse = await fetch(HUGGINGFACE_MODEL_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
    });
    if (!huggingfaceResponse.ok) {
      throw new TranslationError("Translation failed");
    }

    const responseObject = await huggingfaceResponse.json();

    return responseObject[0].generated_text;
  } catch (error: any) {
    logger.error(error);
    throw new TranslationError("Translation failed");
  }
};

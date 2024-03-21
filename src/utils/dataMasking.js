import { maskEmail2 } from "maskdata";

/**
 * @param {string | undefined} email
 */
function maskEmail(email) {
  const emailMask2Options = {
    maskWith: "*",
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 257,
    maskAtTheRate: false,
  };
  const maskedEmail = maskEmail2(email, emailMask2Options);
  return maskedEmail;
}

export default maskEmail;

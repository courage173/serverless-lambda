import * as crypto from "crypto";

const signingKey = process.env.MAIL_GUN_SIGNING_KEY;

interface IProps {
  timestamp?: string;
  token?: string;
  signature?: string;
}

const verifyWebhook = ({ timestamp, token, signature }: IProps): boolean => {
  const encodedToken = crypto
    .createHmac("sha256", signingKey)
    .update(timestamp.concat(token))
    .digest("hex");

  return encodedToken === signature;
};
export default verifyWebhook;

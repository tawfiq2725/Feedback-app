import dotenv from "dotenv";
dotenv.config();
export const frontendUrl = (): string | null => {
  let url: string;
  if (process.env.NODE_ENV === "development" && process.env.DEVELOPMENT_URL) {
    url = process.env.DEVELOPMENT_URL;
  } else if (
    process.env.NODE_ENV === "production" &&
    process.env.PRODUCTION_URL
  ) {
    url = process.env.PRODUCTION_URL;
  } else {
    console.error("Invalid environment variable");
    return null;
  }
  return url;
};
console.log(frontendUrl())


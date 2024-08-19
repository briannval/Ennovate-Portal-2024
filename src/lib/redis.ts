import { Redis } from "ioredis";

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("Redis URL is not defined in .env");
};

export const redis = new Redis(getRedisUrl());

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

const redis = Redis.fromEnv();                  // Step 1: get redis instance

const rateLimit = new Ratelimit({
  redis,                                        // Step 2: pass redis
  limiter: Ratelimit.slidingWindow(100, "20s"), // Step 3: sliding window limit
});

export default rateLimit;

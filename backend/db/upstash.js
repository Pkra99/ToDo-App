import {Ratelimit} from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { configDotenv } from 'dotenv';

configDotenv();

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(1, "10 s"),
    analytics: true,
    prefix: '@upstash/ratelimit'
})

export default rateLimit;
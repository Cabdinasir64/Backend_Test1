import rateLimit from 'express-rate-limit';

const userRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 5, 
    message: { message: 'Too many requests, please try again later.' },
});

export default userRateLimit;

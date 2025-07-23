import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0] ||
      req.socket?.remoteAddress ||
      "anonymous";

    const { success } = await rateLimit.limit(ip); // ✅ use ip here

    if (!success) {
      return res.status(429).json({
        message: "Too many requests",
      });
    }

    next();
  } catch (error) {
    console.log("Ratelimit Error", error);
    next(error);
  }
};

export default rateLimiter;

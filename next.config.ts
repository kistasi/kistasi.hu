import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship the bundled PDF fonts with the resume PDF route's serverless function.
  outputFileTracingIncludes: {
    "/api/resume/pdf": ["./assets/fonts/**/*"],
  },
};

export default nextConfig;

import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
	/*
	 * ServerSide Environment variables, not available on the client.
	 */
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		BACKEND_HOST: z.string().min(1),
	},

	client: {
		NEXT_PUBLIC_APP_NAME: z.string().optional(),
		NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string().optional().default(""),
	},
	runtimeEnv: process.env,
});

import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().url(),

  REDIS_URL: z.string().url().optional(),

  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 character'),
  JWT_ACCESS_TTL: z.string().default('900s'),   // 15 min
  JWT_REFRESH_TTL: z.string().default('7d'),    // 7 days
});

export type EnvVars = z.infer<typeof envSchema>;

export const envConfig = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Error on environment variables:', parsed.error.format());
    process.exit(1);
  }
  return parsed.data;
};
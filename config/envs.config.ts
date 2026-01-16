import { z } from 'zod';

const envsSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type ENV_VARS = z.infer<typeof envsSchema>;

const envsVars = envsSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  NODE_ENV: process.env.NODE_ENV,
});

export const ENVS = {
  api: {
    url: envsVars.NEXT_PUBLIC_API_URL,
  },
  app: {
    name: envsVars.NEXT_PUBLIC_APP_NAME,
    description: envsVars.NEXT_PUBLIC_APP_DESCRIPTION,
  },
  environment: envsVars.NODE_ENV,
  isDevelopment: envsVars.NODE_ENV === 'development',
  isProduction: envsVars.NODE_ENV === 'production',
};

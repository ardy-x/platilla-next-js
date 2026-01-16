import { ENVS } from '@/config/envs.config';

export default function PrincipalPage() {
  return (
    <div className="flex flex-col gap-4 w-screen h-screen justify-center items-center">
      <h1 className="text-2xl font-bold">{ENVS.app.name}</h1>
      <p className="text-muted-foreground">{ENVS.app.description}</p>
    </div>
  );
}

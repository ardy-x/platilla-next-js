import { ENVS } from '@/config/envs.config';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
        <h1 className="text-2xl font-bold">{ENVS.app.name}</h1>
        <p className="text-muted-foreground">{ENVS.app.description}</p>
      </div>
    </div>
  );
}

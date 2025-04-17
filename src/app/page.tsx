import { Todos } from '../components';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] justify-center items-center">
        <Todos />
      </main>
    </div>
  );
}

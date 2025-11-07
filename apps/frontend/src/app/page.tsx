export default async function HomePage() {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();

  return (
    <main>
      <h1>Hello from Next.js!</h1>
      <p>Backend says: {data.message}</p>
    </main>
  );
}

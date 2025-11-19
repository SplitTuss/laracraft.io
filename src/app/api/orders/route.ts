export async function GET(request: Request) {
  console.log({ request });

  const data = [
    { id: 1, items: 7, total: 400 },
    { id: 2, items: 3, total: 250 },
  ];

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

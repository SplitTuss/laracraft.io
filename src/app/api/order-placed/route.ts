export async function POST(request: Request) {
  console.log({ request });

  return new Response(JSON.stringify(''), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

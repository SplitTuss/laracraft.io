import { supabase } from '@/server-auth/supabase-client';

export async function GET(request: Request) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return new Response('unauthorized!', {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await supabase.auth.getUser(accessToken);

  if (result.error) {
    return new Response(result.error.message, {
      status: result.error.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(result.data);

  const data = [
    { id: 1, items: 7, total: 400 },
    { id: 2, items: 3, total: 250 },
  ];

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

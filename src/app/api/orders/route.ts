import { supabase } from '@/server-auth/supabase-client';

export async function GET(request: Request) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return new Response('unauthorized!', {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authResult = await supabase.auth.getUser(accessToken);

  if (authResult.error) {
    return new Response(authResult.error.message, {
      status: authResult.error.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await supabase
    .from('orders')
    .select(
      `
      *,
      products:order_products (
        id,
        quantity,
        created_at,
        item:products (*)
      )
    `,
    )
    .eq('userId', authResult.data.user.id);

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

import { supabase } from '@/server-auth/supabase-client';

export async function GET(request: Request) {
  // const accessToken = request.headers.get('Authorization');

  // if (!accessToken) {
  //   return new Response('unauthorized!', {
  //     status: 401,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

  // const result = await supabase.auth.getUser(accessToken);

  // if (result.error) {
  //   return new Response(result.error.message, {
  //     status: result.error.status,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

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
    .eq('id', 1);

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

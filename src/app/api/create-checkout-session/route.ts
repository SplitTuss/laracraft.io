import { supabase } from '@/server-clients/supabase-client';
import { stripe } from '@/server-clients/stripe-client';

const RETURN_URL = 'https://laracraft.io/orders';

export async function POST(request: Request) {
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

  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'heart',
          },
          unit_amount: 1500,
        },
        quantity: 1,
      },
    ],
    customer_email: body.userEmail,
    mode: 'payment',
    ui_mode: 'custom',
    return_url: RETURN_URL,
  });

  const clientSecret = session.client_secret;

  return new Response(JSON.stringify({ clientSecret }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

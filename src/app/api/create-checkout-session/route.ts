import { supabase } from '@/server-clients/supabase-client';
import { stripe } from '@/server-clients/stripe-client';

const RETURN_URL = 'https://laracraft.io/orders';

export async function POST(request: Request) {
  //check if authorised
  const accessToken = request.headers.get('Authorization');
  //if token not there, error
  if (!accessToken) {
    return new Response('unauthorized!', {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  //if authorised, get token
  const authResult = await supabase.auth.getUser(accessToken);
  //if auth not okay, error
  if (authResult.error) {
    return new Response(authResult.error.message, {
      status: authResult.error.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //get body for cart items
  const body = await request.json();
  //find product from db for each cart item
  const cartWithProductData = await Promise.all(
    body.cart.map(async (item: { productId: number; quantity: number }) => {
      //look at db and get more info back on each item
      const product = await supabase.from('products').select().eq('id', item.productId).single();

      return {
        ...item,
        ...product.data,
      };
    }),
  );

  //set line items based on cart
  const session = await stripe.checkout.sessions.create({
    line_items: cartWithProductData.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.imageUrl],
        },
      },
      metadata: {
        productId: item.id,
      },
    })),
    metadata: {
      userId: authResult.data.user.id,
    },
    customer_email: authResult.data.user.email,
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

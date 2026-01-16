import { stripe } from '@/server-clients/stripe-client';
import { supabase } from '@/server-clients/supabase-client';

const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;

type StripeEvent = ReturnType<typeof stripe.webhooks.constructEvent>;

export async function POST(request: Request) {
  let event: StripeEvent | undefined;

  try {
    const body = await request.text();
    const stripeSig = request.headers.get('stripe-signature');

    if (!stripeSig) throw new Error('no stripe signature is set');
    if (!STRIPE_ENDPOINT_SECRET) throw new Error('STRIPE_ENDPOINT_SECRET is not set');

    event = stripe.webhooks.constructEvent(body, stripeSig, STRIPE_ENDPOINT_SECRET);
  } catch (error) {
    console.error(error);
    return new Response('bad request', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object;
    const userId = checkoutSession.metadata?.userId;
    const total = checkoutSession.amount_total ?? 0;
    const totalDollars = total / 100;

    const order = await supabase
      .from('orders')
      .insert({
        userId,
        total: totalDollars,
      })
      .select()
      .single();

    if (order.error) {
      return new Response('error creating order', {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orderId = order.data?.id;

    const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);

    await Promise.all(
      lineItems.data.map(async (lineItem) => {
        const quantity = lineItem.quantity;
        const productId = Number(lineItem.metadata?.productId);

        await supabase.from('order_products').insert({
          quantity,
          productId,
          orderId,
        });
      }),
    );
  }

  return new Response('success', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

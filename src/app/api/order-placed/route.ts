import { stripe } from '@/server-clients/stripe-client';

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

    console.log({ checkoutSession });
  }

  return new Response('success', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

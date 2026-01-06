import { NextApiRequest } from 'next';
import { supabase } from '@/server-auth/supabase-client';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: NextApiRequest, ctx: RouteContext) {
  const params = await ctx.params;
  const result = await supabase.from('products').select().eq('id', params.id).single();

  if (!result.data) {
    return new Response('not found', {
      status: 404,
    });
  }

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

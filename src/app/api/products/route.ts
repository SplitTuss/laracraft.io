import { supabase } from '@/server-clients/supabase-client';

export async function GET() {
  const result = await supabase.from('products').select();

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

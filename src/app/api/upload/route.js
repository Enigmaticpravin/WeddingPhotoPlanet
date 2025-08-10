import cloudinary from '@/app/lib/cloudinary';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'wedding-gallery', resource_type: 'image' },
        async (error, result) => {
          if (error || !result) {
            reject(new Response(JSON.stringify({ error: error?.message }), { status: 500 }));
            return;
          }

          const { data, error: insertError } = await supabase.from('photos').insert([
            { title, category, description, image_url: result.secure_url }
          ]);

          if (insertError) {
            console.error('Supabase insert error:', insertError);
            reject(new Response(JSON.stringify({ error: insertError.message }), { status: 500 }));
            return;
          }

          resolve(new Response(JSON.stringify({ url: result.secure_url })));
        }
      );

      stream.end(buffer);
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

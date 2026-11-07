import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve project root and load .env if environment variables are not pre-set
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    if (key && values.length > 0) {
      const val = values.join('=').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Anon Key is missing. Check .env configuration.');
  process.exit(1);
}

const pingUrl = `${supabaseUrl}/rest/v1/products?select=id&limit=1`;

console.log(`⏰ [${new Date().toISOString()}] Sending keep-alive ping to Supabase...`);
const start = Date.now();

try {
  const res = await fetch(pingUrl, {
    method: 'GET',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  const duration = Date.now() - start;

  if (res.ok) {
    const data = await res.json();
    console.log(`✅ Supabase keep-alive ping successful! (${res.status} OK in ${duration}ms)`);
    console.log(`📊 DB Response: ${JSON.stringify(data)}`);
    console.log(`🟢 Supabase project is active and alive.`);
  } else {
    const errorText = await res.text();
    console.error(`⚠️ Supabase returned status ${res.status} in ${duration}ms:`, errorText);
    process.exit(1);
  }
} catch (err) {
  console.error('❌ Network error while pinging Supabase:', err.message);
  process.exit(1);
}

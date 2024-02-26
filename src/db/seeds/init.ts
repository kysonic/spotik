import sql from '@/db/client';
import { faker } from '@faker-js/faker';

async function run() {
  await sql`SELECT (1 + 1);`;
}

run().then(() => {
  console.log('Done!');
  process.exit(0);
});

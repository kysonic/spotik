import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL ?? '', {
  debug: (connect, query) => {
    console.log(query);
  },
});

export default sql;

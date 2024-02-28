import { faker } from '@faker-js/faker';
import SongsDao from '../dao/Songs';

async function run() {
  // Songs
  const songs = await SongsDao.find();

  for (let song of songs) {
    await SongsDao.update(song.id, {
      updated_at: faker.date.between({
        from: '2020-01-01T00:00:00.000Z',
        to: new Date(),
      }),
    });
  }
}

run().then(() => {
  console.log('Done!');
  process.exit(0);
});

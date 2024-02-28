import { faker } from '@faker-js/faker';
import ArtistsDao from '../dao/Artists';
import AlbumsDao from '../dao/Albums';
import SongsDao from '../dao/Songs';

const BATCH_SIZE = process.env.BATCH_SIZE ? +process.env.BATCH_SIZE : 10;

async function run() {
  for (let i = 0; i < BATCH_SIZE; i++) {
    console.log(`Starting artist ${i}`);
    const artist = await ArtistsDao.insert({
      nickname: faker.person.fullName(),
      about: faker.person.bio(),
      career_start: faker.date.birthdate().toDateString(),
      cover: faker.image.avatar(),
    });

    const ALBUMS = Math.floor(Math.random() * 8 + 1);

    for (let j = 0; j < ALBUMS; j++) {
      const album = await AlbumsDao.insert({
        title: faker.music.songName(),
        release_date: faker.date.birthdate().toDateString(),
        cover: faker.image.urlLoremFlickr(),
        artist_id: artist.id,
      });

      const SONGS = Math.floor(Math.random() * 20 + 1);

      for (let k = 0; k < SONGS; k++) {
        await SongsDao.insert({
          title: faker.music.songName().substring(0, 49),
          length: faker.number.int(360),
          plays_count: 0,
          genres: Array.from({ length: Math.floor(Math.random() * 5 + 1) }).map(
            () => faker.music.genre().substring(0, 99)
          ),
          cover: faker.image.urlLoremFlickr(),
          album_id: album.id,
        });
      }
    }
    console.log(`Artist ${i} is completed`);
  }
}

run().then(() => {
  console.log('Done!');
  process.exit(0);
});

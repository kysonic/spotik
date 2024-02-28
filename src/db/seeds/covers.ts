import { faker } from '@faker-js/faker';
import ArtistsDao from '../dao/Artists';
import AlbumsDao from '../dao/Albums';
import SongsDao from '../dao/Songs';

async function run() {
  // Artists
  const artists = await ArtistsDao.find();

  for (let artist of artists) {
    if (!artist.cover) {
      await ArtistsDao.update(artist.id, {
        cover: faker.image.avatar(),
      });
    }
  }

  // Albums
  const albums = await AlbumsDao.find();

  for (let album of albums) {
    if (!album.cover) {
      await AlbumsDao.update(album.id, {
        cover: faker.image.urlLoremFlickr(),
      });
    }
  }

  // Songs
  const songs = await SongsDao.find();

  for (let song of songs) {
    if (!song.cover) {
      await SongsDao.update(song.id, {
        cover: faker.image.urlLoremFlickr(),
      });
    }
  }
}

run().then(() => {
  console.log('Done!');
  process.exit(0);
});

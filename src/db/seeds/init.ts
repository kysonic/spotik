import { faker } from '@faker-js/faker';
import ArtistsDao from '../dao/Artists';

async function run() {
  const artistsCount = Math.floor(Math.random() * 20);
  for (let i = 0; i < artistsCount; i++) {
    const artist = await ArtistsDao.insert({
      nickname: faker.person.fullName(),
      about: faker.person.bio(),
      career_start: faker.date.birthdate().toDateString(),
    });
  }
}

run().then(() => {
  console.log('Done!');
  process.exit(0);
});

import { mockServerResponses } from './mockServerResponses';

describe('[function] mockServerResponses', () => {
  test('it returns correct batches', async () => {
    const totalFeeds = 40;
    const { loadNextFeeds } = mockServerResponses(totalFeeds);

    const batchSize = 10;
    let data: Awaited<ReturnType<typeof loadNextFeeds>> = [];

    const attempts = Math.round(totalFeeds / batchSize);
    for (let attempt = 0; attempt < attempts; attempt++) {
      const newData = await loadNextFeeds({
        batchSize,
        lastDate: data.at(-1)?.isoDate
      });

      data = data.concat(newData);

      // данные загружаются пачками, а не все сразу
      expect(data.length).toBe(batchSize * (attempt + 1));
    }

    for (let feedIndex = 0; feedIndex < data.length; feedIndex++) {
      const feed = data[feedIndex];
      // данные загрузились в корректном порядке
      expect(feed.title).toBe(`Какая-то новость #${feedIndex + 1}`);
    }
  });
});
// код набросал на коленке, не рекомендую опираться на него в плане оформления или стайл гайдов

type Feed = {
  title: string;
  feed: string;
  isoDate: string;
  imageUrl: string | null;
};

export function mockServerResponses(totalFeedsCount = 100) {
  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  function makeFeed(feedIndex: number, date: Date): Feed {
    const mockFeed = () => {
      const isFullText = feedIndex % 7 === 0;
      if (isFullText) {
        return loremIpsum;
      }

      const randomLength = Math.round(Math.random() * loremIpsum.length);

      return loremIpsum.substring(0, randomLength);
    };

    const squidwardImg =
      'https://static.wikia.nocookie.net/hunger_games_simulator/images/d/d9/Squidwardtentacles.png';

    const patrickImg =
      'https://static.wikia.nocookie.net/scumbob/images/c/cf/Patrick.png';

    let imageUrl: string | null = null;
    if (feedIndex % 3 === 0) {
      imageUrl = squidwardImg;
    } else if (feedIndex % 5 === 0) {
      imageUrl = patrickImg;
    }

    return {
      title: `Какая-то новость #${feedIndex}`,
      feed: mockFeed(),
      isoDate: date.toISOString(),
      imageUrl,
    };
  }

  const now = new Date();

  const feeds = new Array(totalFeedsCount).fill(undefined).map((_, index) => {
    const olderDateMilliseconds = now.setMinutes(-index);
    const olderDate = new Date(olderDateMilliseconds);
    return makeFeed(index + 1, olderDate);
  });

  type RequestDto = {
    batchSize: number;
    lastDate: string | undefined;
  };

  async function loadNextFeeds(requestDto: RequestDto) {
    return new Promise<Feed[]>((resolve) => {
      const randomTimeInMilliseconds = Math.random()  * 1e3;

      setTimeout(() => {
        const { batchSize, lastDate: lastDateIsoString } = requestDto;

        let lastFeedIndex = 0;

        if (lastDateIsoString) {
          const lastDateMilliseconds = Number(new Date(lastDateIsoString));

          lastFeedIndex = feeds.findIndex((feed) => {
            const feedTimeMilliseconds = Number(new Date(feed.isoDate));
            return feedTimeMilliseconds < lastDateMilliseconds;
          });
        }

        const nextFeeds = feeds.slice(lastFeedIndex, lastFeedIndex + batchSize);
        return resolve(nextFeeds);
      }, randomTimeInMilliseconds);
    });
  }

  return { loadNextFeeds };
}

// Как использовать:
// import { FC, useState } from 'react';
//
// const { loadNextFeeds } = mockServerResponses();
//
// const MyComponent: FC = () => {
//   const [feeds, setFeeds] = useState<Awaited<ReturnType<typeof loadNextFeeds>>>(
//     []
//   );
//
//   const loadMore = async () => {
//     const newFeeds = await loadNextFeeds({
//       batchSize: 10,
//       lastDate: feeds.at(-1)?.date,
//     });
//     setFeeds((prevFeeds) => prevFeeds.concat(newFeeds));
//   }
//
//   return null;
// }
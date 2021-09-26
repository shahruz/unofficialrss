import RSS from 'rss';
import Episode from 'src/types/Episode';
import Podcast from 'src/types/Podcast';

import { UserType } from '../models/User';

interface Props {
  podcast: Podcast;
  episodes: Episode[];
  user: UserType;
  token: string;
}

const NON_PREMIUM_PODCAST_DESCRIPTION =
  'This podcast is not a Stitcher premium feed. Some episodes may not be added to the feed. You may want to subscribe to this podcast\'s public feed.\n\n';
const NON_PREMIUM_EPISODE_DESCRIPTION =
  'This episode is a free episode. This podcast feed may no longer be a premium feed.\n\n';
const FOOTER_TEXT =
  '\n\nThis feed was generated at UnofficialRSS.com for private use.';

const getLink = (podcast: Podcast, episode?: Episode) => {
  if (episode) {
    return episode.link || `https://stitcher.com/show/${podcast.slug}/episode/${episode.slug}`;
  }
  return podcast.link || `https://stitcher.com/show/${podcast.slug}`;
}

const generateFeed = ({ podcast, episodes, user, token }: Props) => {
  let podcastDescription = podcast.showType === 'PREMIUM' ?
    `${podcast.description}${FOOTER_TEXT}` :
    `${NON_PREMIUM_PODCAST_DESCRIPTION}${podcast.description}${FOOTER_TEXT}`;

  const rss = new RSS({
    title: podcast.title,
    description: podcastDescription,
    image_url: podcast.image,
    feed_url: `${process.env.NEXT_PUBLIC_DOMAIN}/feed/${podcast.id}.xml?u=${token}`,
    site_url: getLink(podcast),
    generator: 'Unofficial RSS',
    language: 'en',
    copyright: 'Stitcher Premium',
    ttl: 60,
    pubDate: new Date(),
    custom_namespaces: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0'
    },
    custom_elements: [
      { 'itunes:summary': podcastDescription },
      { 'itunes:block': 'yes' },
      { 'googleplay:block': 'yes' },
      {
        'itunes:owner': [
          { 'itunes:name': 'Unofficial RSS' },
          { 'itunes:email': 'help@unofficialrss.com' }
        ]
      },
      {
        'itunes:image': {
          _attr: {
            href: podcast.image
          }
        }
      }
    ]
  });

  for (const episode of episodes) {
    const episodeURL = episode.isPremium ?
      `${process.env.NEXT_PUBLIC_DOMAIN}/episode/${episode.id}.mp3?u=${token}` :
      episode.audioURL;
    const episodeDescription = episode.isPremium ?
      episode.description :
      `${NON_PREMIUM_EPISODE_DESCRIPTION}${episode.description}`;

    // TO DISABLE ADDING FREE EPISODES, WRAP THIS IN `if (epiosde.isPremium)`
    rss.item({
      title: episode.title,
      description: episodeDescription,
      date: episode.published,
      guid: `Unofficial-RSS-v2-${episode.id}`,
      url: getLink(podcast, episode),
      enclosure: {
        url: episodeURL,
        type: 'audio/mpeg',
        size: 1
      },
      custom_elements: [
        { 'itunes:duration': episode.duration },
        { 'googleplay:explicit': episode.explicit },
        { 'itunes:explicit': episode.explicit },
      ]
    });
  }
  const xml = rss.xml();
  return xml;
};

export default generateFeed;

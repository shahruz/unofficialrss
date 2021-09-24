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

const isUrl = (url?: String) => {
    return url && url.match(/^https?:\/\//i)
};

const getLink = (podcast: Podcast, episode?: Episode) => {
  if (episode) {
    return isUrl(episode.link) && episode.link ||
        `https://stitcher.com/show/${podcast.slug}/episode/${episode.slug}`;
  }
  return isUrl(podcast.link) && podcast.link ||
    `https://stitcher.com/show/${podcast.slug}`;
};

const FOOTER_TEXT =
    '\n\nThis feed was generated at UnofficialRSS.com for private use.';

const generateFeed = ({ podcast, episodes, user, token }: Props) => {
  const rss = new RSS({
    title: podcast.title,
    description: `${podcast.description}${FOOTER_TEXT}`,
    image_url: podcast.image,
    feed_url: `${process.env.NEXT_PUBLIC_DOMAIN}/feed/${podcast.id}.xml?u=${token}`,
    site_url: getLink(podcast),
    generator: 'Unofficial RSS',
    language: 'en',
    copyright: podcast.author,
    ttl: 60,
    pubDate: new Date(),
    custom_namespaces: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0'
    },
    custom_elements: [
      { 'itunes:author':  podcast.author },
      { 'itunes:summary': `${podcast.description}${FOOTER_TEXT}` },
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
    const episodeURL = `${process.env.NEXT_PUBLIC_DOMAIN}/episode/${episode.id}.mp3?u=${token}`;
    rss.item({
      title: episode.title,
      description: `${episode.description}${FOOTER_TEXT}`,
      date: episode.published,
      guid: `Unofficial-RSS-v2-${episode.id}`,
      url: getLink(podcast, episode),
      enclosure: {
        url: episodeURL,
        type: 'audio/mpeg',
        size: 1
      },
      custom_elements: [
        {'itunes:episodeType': episode.episode_type },
        {'itunes:season': episode.season },
        {'itunes:duration': episode.duration },
        {'googleplay:explicit': episode.explicit },
        {'itunes:explicit': episode.explicit }
      ]
    });
  }
  const xml = rss.xml();
  return xml;
};

export default generateFeed;

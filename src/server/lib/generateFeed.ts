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

const FOOTER_TEXT =
  '\n\nThis feed was generated at UnofficialRSS.com for private use.';

const generateFeed = ({ podcast, episodes, user, token }: Props) => {
  const rss = new RSS({
    title: podcast.title,
    description: `${podcast.description}${FOOTER_TEXT}`,
    image_url: podcast.image,
    feed_url: `${process.env.NEXT_PUBLIC_DOMAIN}/feed/${podcast.id}.xml?u=${token}`,
    site_url: process.env.NEXT_PUBLIC_DOMAIN as string,
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
      { 'itunes:author': 'Stitcher Premium' },
      {
        'itunes:summary': podcast.description
      },
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
      url: episodeURL,
      enclosure: {
        url: episodeURL,
        type: 'audio/mpeg',
        size: 1
      },
      custom_elements: [{ 'itunes:duration': episode.duration }]
    });
  }
  const xml = rss.xml();
  return xml;
};

export default generateFeed;

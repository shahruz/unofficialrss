interface Episode {
  audioURL: string;
  description: string;
  duration: number;
  explicit?: boolean;
  guid: string;
  htmlDescription?: string;
  id: number;
  link?: string;
  podcastID: number;
  published: Date;
  slug: string;
  title: string;
  isPremium: boolean;
  season?: string;
  episode_type?: string;
}

export default Episode;

interface Episode {
  id: number;
  guid: string;
  podcastID: number;
  title: string;
  description: string;
  htmlDescription: string;
  audioURL: string;
  published: Date;
  duration: number;
}

export default Episode;

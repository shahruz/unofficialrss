interface StitcherEpisode {
  id: number;
  show_id: number;
  title: string;
  description: string;
  html_description: string;
  audio_url_restricted: string;
  date_published: number;
  guid: string;
  duration: number;
  duration_restricted: number | null;
}

export default StitcherEpisode;

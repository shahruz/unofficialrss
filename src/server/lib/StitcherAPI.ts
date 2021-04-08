import type StitcherShow from 'src/types/StitcherShow';
import type Podcast from 'src/types/Podcast';
import dayjs from 'dayjs';
import StitcherEpisode from 'src/types/StitcherEpisode';
import Episode from 'src/types/Episode';

const BASE_URL = process.env.API_BASE;

export const getPremiumShows = async (): Promise<Podcast[]> =>
  (await get('/premium')).data.shows.map(stitcherShowToPodcast);

export const getFeedDetails = async (id: number, allPages?: boolean) => {
  let page: any,
    pageNumber = 0;
  let podcast: Podcast | undefined;
  let episodes: Episode[] = [];
  do {
    page = await get(`/show/${id}/latestEpisodes?page=${pageNumber}`);
    if (!podcast) podcast = stitcherShowToPodcast(page.data.shows[0]);
    episodes = [
      ...episodes,
      ...page.data.episodes.map(stitcherEpisodeToEpisode)
    ];
    pageNumber++;
  } while (
    allPages &&
    page.orchestration.start_index + page.orchestration.page_size <
      page.orchestration.total_count
  );
  return { podcast, episodes };
};

export const getSearchPremiumShows = async (
  query: string
): Promise<Podcast[]> => {
  const page = await get(`/search/shows?query=${query}`);
  const shows =
    page.data?.shows
      .filter((show: StitcherShow) => show.restricted.includes('Premium'))
      .filter((show: StitcherShow) => !!show.id)
      .map(stitcherShowToPodcast) || [];
  return shows;
};

const get = (url: string) => fetch(BASE_URL + url).then(res => res.json());

const stitcherShowToPodcast = (show: StitcherShow): Podcast => ({
  id: show.id,
  title: show.title,
  description: show.description,
  image: show.image_large,
  episodeCount: show.episode_count,
  color: show.color_primary
});

const stitcherEpisodeToEpisode = (episode: StitcherEpisode): Episode => ({
  id: episode.id,
  podcastID: episode.show_id,
  title: episode.title,
  description: episode.description,
  htmlDescription: episode.html_description,
  published: dayjs(episode.date_published * 1000).toDate(),
  duration: episode.duration_restricted || episode.duration,
  guid: episode.guid,
  audioURL: episode.audio_url_restricted
});

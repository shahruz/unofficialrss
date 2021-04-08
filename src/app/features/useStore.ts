import create from 'zustand';
import type Podcast from 'src/types/Podcast';

type State = {
  activePodcast: Podcast | null;
};

const useStore = create<State>(set => ({
  activePodcast: null
}));

export default useStore;

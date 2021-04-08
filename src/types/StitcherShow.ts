interface StitcherShow {
  id: number;
  classic_id: number;
  title: string;
  description: string;
  html_description: string;
  episode_count: number;
  date_created: number;
  date_published: number;
  color_primary: string;
  image_thumbnail: string;
  image_small: string;
  image_large: string;
  image_base_url: string;
  link: string;
  stitcher_link: string;
  publisher?: string;
  is_published: boolean;
  is_public: boolean;
  seasons: [];
  categories: Array<{
    id: number;
    parent_id: number;
    name: string;
  }>;
  primary_category_id: number;
  years: Array<number>;
  restricted: Array<string>;
  slug: string;
  tags: Array<{
    id: number;
    name: string;
    display_name: string;
    type: number;
  }>;
}

export default StitcherShow;

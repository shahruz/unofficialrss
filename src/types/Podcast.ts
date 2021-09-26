interface Podcast {
  id: number;
  title: string;
  description: string;
  link?: string;
  htmlDescription?: string;
  image: string;
  episodeCount: number;
  color: string;
  slug: string;
  showType: string;

  // date_created: number;
  // date_published: number;
  // color_primary: string;
  // seasons: [];
  // categories: Array<{
  //   id: number;
  //   parent_id: number;
  //   name: string;
  // }>;
  // primary_category_id: number;
  // years: Array<number>;
  // restricted: Array<string>;
  // slug: string;
  // tags: Array<{
  //   id: number;
  //   name: string;
  //   display_name: string;
  //   type: number;
  // }>;
}

export default Podcast;

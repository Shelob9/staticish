export interface Post {
    content: {
      rendered: String;
    };
    title: {
      rendered: String;
    };
    slug: String;
    link: String;
    id: Number;
    type: String;
  }
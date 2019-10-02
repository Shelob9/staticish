export interface ContentObject { 
    rendered: String;
    protected?: Boolean;
    raw? : String;  
};

export interface Post {
    id: Number;
    date: String;
    date_gmt: String;
    modified: String;
    modified_gmt: String;
    status: String;
    type: String;
    link: String;
    title: ContentObject;
    content: ContentObject;
    excerpt: ContentObject;
    author: Number,
    featured_media: Number,
    parent: Number,
    menu_order: Number,
    comment_status: String;
    ping_status: String;
    template: String;
    meta: any;
    slug: String;
    guid: {rendered: String }
    _links: any;
};
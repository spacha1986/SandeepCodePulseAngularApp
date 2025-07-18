export interface AddBlogPostRequest {
    title: string;
    shortDescription: string;
    content: string;
    urlHandle: string;
    author: string;
    featuredImageUrl: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: string[];
}
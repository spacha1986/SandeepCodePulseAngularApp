import { Category } from "../../category/models/category.model";

export interface BlogPost {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    urlHandle: string;
    author: string;
    featuredImageUrl: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: Category[];
}
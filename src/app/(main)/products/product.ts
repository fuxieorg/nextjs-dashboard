import { Media } from "../media/Media";

export interface Product {
  id: number;
  title: string;
  description: string | undefined;
  price: number;
  status: "active" | "draft" | "archived";
}

export interface ProductFormData {
  id: number;
  title: string;
  description: string | undefined;
  price: number;
  status: "active" | "draft" | "archived";
  content: string | undefined;
  imageIds: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string | undefined;
  price: number | string;
  status: "active" | "draft" | "archived";
  content: string | undefined;
  image: {
    image: Media;
  }[];
}

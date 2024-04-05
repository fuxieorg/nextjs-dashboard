export interface Product {
  coverImage: any;
  id: number;
  title: string;
  description?: string;
  price: number;
  status: "active" | "draft" | "archived";
}

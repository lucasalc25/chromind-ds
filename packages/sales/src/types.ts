import { StockStatus } from "./components/atoms/StockBadge";

export type StockState = "em-estoque" | "poucas-unidades" | "sem-estoque";

export type Product = {
  id: string;
  niche: string;
  brand?: string;
  name: string;
  description?: string[];
  price: number;
  originalPrice?: number;
  avaliations: number;
  rating: number;
  stock: StockStatus;
  categories: string[];
  images?: string[];
  tags?: string[];
};

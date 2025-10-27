import React from "react";
import { ThemeProvider } from "@prisma-ui/core";
import { Product, toyShopTheme } from "@prisma-ui/sales";

export const withTheme = (ui: React.ReactNode) => (
  <ThemeProvider theme={toyShopTheme} mode="light">
    {ui}
  </ThemeProvider>
);

export const makeProduct = (
  id: string,
  name: string,
  overrides: Partial<Product> = {}
): Product => ({
  id,
  niche: "toy-shop",
  brand: overrides.brand ?? "TestBrand",
  name,
  price: 80,
  originalPrice: 100,
  avaliations: 6,
  rating: 4.4,
  stock: "em-estoque",
  categories: ["Brinquedos"],
  images: ["/images/toys/car1.jpg", "/images/toys/car2.jpg"],
  description: ["Escala 1:16", "Bateria AA"],
  ...overrides,
});

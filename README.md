# Prisma UI

**Prisma UI** é um Design System modular e temático baseado em *Atomic Design*, criado por **Lucas Alcântara Holanda** para interfaces de vendas. Combina consistência visual, reuso de componentes e personalização por nicho (brinquedos, pets, roupas, eletrônicos e farmácia, inicialmente).

---

## 🚀 Instalação

```bash
pnpm add @prisma-ui
```

> Requer React 18+ e TypeScript.

---

## 🧱 Estrutura do monorepo

```
packages/ 
  core/        → tokens neutros, ThemeProvider, hooks
  sales/       → temas e componentes específicos (de átomos a templates)
  prisma-ui    → ponto de entrada unificado (reexporta core + sales)
apps/
  sandbox/     → demonstração dos componentes e temas (ComponentsGallery)
```

---

## ✨ Uso básico

```tsx
import { ThemeProvider, ProductCard, toyShopTheme } from "@prisma-ui";

export function App() {
  return (
    <ThemeProvider theme={toyShopTheme}>
      <ProductCard product={mockProduct} />
    </ThemeProvider>
  );
}
```

---

## 🎨 Temas disponíveis

| Nicho       | Tema                   | Cor principal     |
| ----------- | ---------------------- | ----------------- |
| Brinquedos  | `toyShopTheme`         | Rosa vibrante     |
| Pets        | `petShopTheme`         | Laranja quente    |
| Roupas      | `clothingShopTheme`    | Preto minimalista |
| Eletrônicos | `electronicsShopTheme` | Azul tecnológico  |
| Farmácia    | `drugstoreShopTheme`   | Verde turquesa    |
| Cursos      | `courseShopTheme`      | Amarelo acadêmico |

---

## ⚛️ Estrutura por nível

| Nível          | Local        | Exemplos                                                      |
| :------------- | :----------- | :------------------------------------------------------------ |
| **Átomos**     | `/atoms`     | `Button`, `Tag`, `Text`, `FavoriteButton`                     |
| **Moléculas**  | `/molecules` | `PriceBox`, `BuyActions`, `ProductHeader`                     |
| **Organismos** | `/organisms` | `ProductInfoSection`, `PurchaseSection`, `ShippingCalculator` |
| **Templates**  | `/templates` | `ProductDetail`, `ComponentsGallery`          |

---

## 💡 Uso e aplicação

O Prisma UI foi projetado para oferecer uma base escalável e modular para interfaces de e-commerce. Seus componentes podem ser utilizados individualmente ou em conjunto, permitindo que desenvolvedores criem rapidamente catálogos de produtos, páginas detalhadas e fluxos de compra completos, com estilos consistentes e adaptados ao tema de cada nicho.

- Estrutura alinhada ao padrão Atomic Design (átomos → templates)

- Theming dinâmico: escolha de temas por segmento (brinquedos, pets etc.)

- Suporte a modo claro e escuro via ThemeProvider

- Componentes responsivos e personalizáveis via tokens (colors, spacing, radii, typography)

---

## 🧑‍💻 Autor

**Lucas Alcântara Holanda** <br>
Estudante de Ciência da Computação (UNIP) <br>
Desenvolvedor Front-End e criador do Prisma UI <br>
🔗 [GitHub](https://github.com/lucasalc25) · [LinkedIn](https://www.linkedin.com/in/lucas-alcantara-holanda)

---


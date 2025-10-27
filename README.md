# Chromind

**Chromind** é um Design System modular e temático baseado em _Atomic Design_ para interfaces de vendas. Combina consistência visual, reuso de componentes e personalização de tema por nicho (brinquedos, pets, roupas, eletrônicos e farmácia, inicialmente).

---

## 🧰 Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Design Tokens](https://img.shields.io/badge/Design%20Tokens-2DD4BF?style=for-the-badge)

---

## 🎨 Temas e Psicologia das Cores

Cada tema do Chromind foi desenvolvido com base na psicologia das cores aplicada ao marketing, alinhando a identidade visual de cada nicho à emoção ou percepção que deseja despertar nos consumidores:

| Nicho           | Tema                   | Cor principal     | Psicologia da cor                                                                                        |
| --------------- | ---------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| **Brinquedos**  | `toyShopTheme`         | Rosa vibrante     | Transmite **alegria**, **imaginação** e **afeto**, estimulando o aspecto lúdico e criativo.              |
| **Pets**        | `petShopTheme`         | Laranja quente    | Representa **energia**, **acolhimento** e **entusiasmo**, reforçando o vínculo emocional com os animais. |
| **Roupas**      | `clothingShopTheme`    | Preto minimalista | Evoca **elegância**, **sofisticação** e **exclusividade**, muito usado em marcas de moda e lifestyle.    |
| **Eletrônicos** | `electronicsShopTheme` | Azul tecnológico  | Expressa **confiança**, **precisão** e **modernidade**, características comuns em marcas de tecnologia.  |
| **Farmácia**    | `drugstoreShopTheme`   | Verde turquesa    | Associa-se à **saúde**, **equilíbrio** e **bem-estar**, transmitindo **calma** e **credibilidade**.      |

---

## ⚛️ Estrutura por nível

| Nível          | Local        | Exemplos                                                      |
| :------------- | :----------- | :------------------------------------------------------------ |
| **Átomos**     | `/atoms`     | `Button`, `Tag`, `Text`, `FavoriteButton`                     |
| **Moléculas**  | `/molecules` | `PriceBox`, `BuyActions`, `ProductHeader`                     |
| **Organismos** | `/organisms` | `ProductInfoSection`, `PurchaseSection`, `ShippingCalculator` |
| **Templates**  | `/templates` | `ProductDetail`, `ComponentsGallery`                          |

---

## 🧱 Estrutura do monorepo

```
packages/
  core/        → tokens neutros, ThemeProvider, hooks
  sales/       → temas e componentes específicos (de átomos a templates)
  chromind    → ponto de entrada unificado (reexporta core + sales)
```

---

## 💡 Aplicação

O Chromind foi pensado para acelerar o desenvolvimento de interfaces comerciais com foco em consistência, estética e personalização temática. Seus componentes podem ser utilizados individualmente ou em conjunto, permitindo que desenvolvedores criem rapidamente catálogos de produtos, páginas detalhadas e fluxos de compra completos, com estilos consistentes e adaptados ao tema de cada nicho.

- Estrutura alinhada ao padrão Atomic Design (átomos → templates)

- Theming dinâmico: escolha de temas por segmento (brinquedos, pets etc.)

- Suporte a modo claro e escuro via ThemeProvider

- Componentes responsivos e personalizáveis via tokens (colors, spacing, radii, typography)

---

## 🚀 Instalação

Você pode instalar este pacote usando npm ou yarn:

```bash
pnpm add chromind
```
```bash
yarn add chromind
```

> Requer React 18+ e TypeScript.

---

## ✨ Uso básico

Após a instalação, importe os módulos no seu projeto React:

```tsx
import { ThemeProvider, useTheme } from "@chromind/core";
import { ProductCard, BuyActions } from "@chromind/sales";

function App() {
  return (
    <ThemeProvider>
      <ProductCard />
      <BuyActions />
    </ThemeProvider>
  );
}
```
---

## 🧑‍💻 Autor

**Lucas Alcântara Holanda** <br>
Estudante de Ciência da Computação (UNIP) <br>
Desenvolvedor Front-End e criador do Chromind <br>

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lucasalc25)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-alcantara-holanda)

> 🧩 Projeto desenvolvido como parte do Trabalho de Conclusão de Curso em Ciência da Computação - Universidade Paulista (UNIP), 2025.

---

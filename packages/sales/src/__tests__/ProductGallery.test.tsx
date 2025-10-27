import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductGallery } from "@prisma-ui/sales";
import { withTheme } from "../test-utils/helpers";

const images = [
  { id: "1", src: "/images/pets/pet1.jpg" },
  { id: "2", src: "/images/pets/pet2.jpg" },
  { id: "3", src: "/images/pets/pet3.jpg" },
];

describe("ProductGallery - navegação e acessibilidade", () => {
  test("seta inicial: Anterior desabilitado e imagem 1 ativa", () => {
    render(
      withTheme(<ProductGallery images={images} productName="Caminha Pet" />)
    );

    // imagem ativa inicial
    expect(screen.getByRole("img", { name: /imagem 1/i })).toHaveAttribute(
      "src",
      "/images/pets/pet1.jpg"
    );

    // botão anterior desabilitado, próximo habilitado
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /próximo/i })).not.toBeDisabled();

    // thumb 1 marcada como atual
    expect(
      screen.getByRole("button", { name: /miniatura 1/i })
    ).toHaveAttribute("aria-current", "true");
  });

  test("navega pelo botão Próximo e depois Anterior", () => {
    render(
      withTheme(<ProductGallery images={images} productName="Caminha Pet" />)
    );

    // vai para imagem 2
    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));
    expect(screen.getByRole("img", { name: /imagem 2/i })).toHaveAttribute(
      "src",
      "/images/pets/pet2.jpg"
    );
    expect(
      screen.getByRole("button", { name: /miniatura 2/i })
    ).toHaveAttribute("aria-current", "true");

    // volta para imagem 1 (anterior)
    fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
    expect(screen.getByRole("img", { name: /imagem 1/i })).toHaveAttribute(
      "src",
      "/images/pets/pet1.jpg"
    );
    expect(
      screen.getByRole("button", { name: /miniatura 1/i })
    ).toHaveAttribute("aria-current", "true");
  });

  test("desabilita Próximo na última imagem e Anterior na primeira", () => {
    render(
      withTheme(<ProductGallery images={images} productName="Caminha Pet" />)
    );

    // avançar até a última
    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));
    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));
    expect(screen.getByRole("img", { name: /imagem 3/i })).toHaveAttribute(
      "src",
      "/images/pets/pet3.jpg"
    );

    // próximo desabilitado no fim
    expect(screen.getByRole("button", { name: /próximo/i })).toBeDisabled();

    // voltar ao início e checar anterior desabilitado
    fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
    fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
    expect(screen.getByRole("img", { name: /imagem 1/i })).toHaveAttribute(
      "src",
      "/images/pets/pet1.jpg"
    );
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();
  });

  test("clica nas miniaturas e atualiza imagem e aria-current", () => {
    render(
      withTheme(<ProductGallery images={images} productName="Caminha Pet" />)
    );

    fireEvent.click(screen.getByRole("button", { name: /miniatura 3/i }));
    expect(screen.getByRole("img", { name: /imagem 3/i })).toHaveAttribute(
      "src",
      "/images/pets/pet3.jpg"
    );
    expect(
      screen.getByRole("button", { name: /miniatura 3/i })
    ).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: /miniatura 2/i }));
    expect(screen.getByRole("img", { name: /imagem 2/i })).toHaveAttribute(
      "src",
      "/images/pets/pet2.jpg"
    );
    expect(
      screen.getByRole("button", { name: /miniatura 2/i })
    ).toHaveAttribute("aria-current", "true");
  });

  test("modo controlado: usa activeIndex/onChangeIndex", () => {
    const onChangeIndex = jest.fn();

    const Controlled = () => {
      const [idx, setIdx] = React.useState(1);
      return (
        <ProductGallery
          images={images}
          productName="Ração Pedigree"
          activeIndex={idx}
          onChangeIndex={(i) => {
            onChangeIndex(i);
            setIdx(i); // espelha para simular controle externo
          }}
        />
      );
    };

    render(withTheme(<Controlled />));

    // começa na imagem 2
    expect(screen.getByRole("img", { name: /imagem 2/i })).toHaveAttribute(
      "src",
      "/images/pets/pet2.jpg"
    );

    // avança para 3
    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));
    expect(onChangeIndex).toHaveBeenCalledWith(2);
    expect(screen.getByRole("img", { name: /imagem 3/i })).toHaveAttribute(
      "src",
      "/images/pets/pet3.jpg"
    );

    // volta para 2 via miniatura
    fireEvent.click(screen.getByRole("button", { name: /miniatura 2/i }));
    expect(onChangeIndex).toHaveBeenCalledWith(1);
    expect(screen.getByRole("img", { name: /imagem 2/i })).toHaveAttribute(
      "src",
      "/images/pets/pet2.jpg"
    );
  });
});

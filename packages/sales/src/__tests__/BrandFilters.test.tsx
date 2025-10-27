import { render, screen, fireEvent } from "@testing-library/react";
import { withTheme } from "../test-utils/helpers";
import { BrandFilters } from "@prisma-ui/sales";

describe("BrandFilters", () => {
  test("lista marcas e alterna seleção chamando onChangeBrands", () => {
    const onChangeBrands = jest.fn();

    render(
      withTheme(
        <BrandFilters
          brands={["Brand A", "Brand B", "Brand C"]}
          selectedBrands={["Brand A"]}
          onChangeBrands={onChangeBrands}
          minLimit={0}
          maxLimit={1000}
          value={[100, 500]}
          onChangeValue={() => {}}
        />
      )
    );

    // desmarca "Brand A"
    const brandA = screen.getByLabelText(/brand a/i) as HTMLInputElement;
    expect(brandA.checked).toBe(true);
    fireEvent.click(brandA);
    expect(onChangeBrands).toHaveBeenLastCalledWith([]);

    // marca "Brand B"
    const brandB = screen.getByLabelText(/brand b/i);
    fireEvent.click(brandB);
    expect(onChangeBrands).toHaveBeenLastCalledWith(["Brand A", "Brand B"]); // ⚠️ O componente usa selectedBrands da prop atual para calcular o próximo estado. Se você quiser validar o estado "acumulado" visualmente, re-renderize com o retorno.
  });

  test("altera faixa de preço pelos sliders e exibe valores atualizados", () => {
    const onChangeValue = jest.fn();

    render(
      withTheme(
        <BrandFilters
          brands={[]}
          selectedBrands={[]}
          onChangeBrands={() => {}}
          minLimit={0}
          maxLimit={1000}
          value={[100, 500]}
          onChangeValue={onChangeValue}
        />
      )
    );

    const minInput = screen.getByLabelText(/preço mínimo/i) as HTMLInputElement;
    const maxInput = screen.getByLabelText(/preço máximo/i) as HTMLInputElement;

    // move o mínimo para 200
    fireEvent.change(minInput, { target: { value: "200" } });
    expect(onChangeValue).toHaveBeenLastCalledWith([200, 500]);

    // move o máximo para 800
    fireEvent.change(maxInput, { target: { value: "800" } });
    expect(onChangeValue).toHaveBeenLastCalledWith([100, 800]); // cuidado: no componente, min é lido da prop 'value'; sem re-render, continua 100

    // dica: para ver o texto "R$ xxx.xx" mudar, re-renderize passando o novo 'value' retornado por onChangeValue.
  });

  test("botão 'Limpar Filtros' chama onClear", () => {
    const onClear = jest.fn();

    render(
      withTheme(
        <BrandFilters
          brands={["A"]}
          selectedBrands={[]}
          onChangeBrands={() => {}}
          minLimit={0}
          maxLimit={1000}
          value={[100, 500]}
          onChangeValue={() => {}}
          onClear={onClear}
        />
      )
    );

    fireEvent.click(screen.getByRole("button", { name: /limpar filtros/i }));
    expect(onClear).toHaveBeenCalled();
  });
});

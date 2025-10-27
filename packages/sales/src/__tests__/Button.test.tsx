import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@prisma-ui/sales";
import { withTheme } from "../test-utils/helpers";

test("renderiza o texto e dispara onClick", () => {
  const onClick = jest.fn();
  render(withTheme(<Button onClick={onClick}>Comprar</Button>));
  const btn = screen.getByRole("button", { name: /comprar/i });
  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalledTimes(1);
});

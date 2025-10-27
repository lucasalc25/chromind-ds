import { render, screen, fireEvent } from "@testing-library/react";
import { FavoriteButton } from "@prisma-ui/sales";
import { withTheme } from "../test-utils/helpers";

test("toggle de favorito chama callback", () => {
  const onToggle = jest.fn();
  render(withTheme(<FavoriteButton isFavorite={false} onToggle={onToggle} />));
  fireEvent.click(screen.getByRole("button"));
  expect(onToggle).toHaveBeenCalledTimes(1);
});

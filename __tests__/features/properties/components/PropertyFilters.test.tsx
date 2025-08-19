import PropertyFilters from "@/features/properties/components/PropertyFilters";
import { PropertyFiltersValues } from "@/features/properties/types";
import { render, screen, fireEvent } from "@testing-library/react";

const initialFilters: PropertyFiltersValues = {
    name: "Casa Bonita",
    address: "Calle Falsa 123",
    minPrice: 100000,
    maxPrice: 500000,
};

const setup = (props = {}) => {
    const defaultProps = {
        initialFilters,
        onSubmit: jest.fn(),
    };
    return render(<PropertyFilters {...defaultProps} {...props} />);
};

describe("PropertyFilters", () => {
    it("renderiza el botón para abrir filtros", () => {
        setup();
        expect(screen.getByRole("button", { name: /abrir filtros/i })).toBeInTheDocument();
    });

    it("muestra los valores iniciales en los campos", () => {
        setup();

        fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));

        expect(screen.getByDisplayValue("Casa Bonita")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Calle Falsa 123")).toBeInTheDocument();
        expect(screen.getByDisplayValue("100000")).toBeInTheDocument();
        expect(screen.getByDisplayValue("500000")).toBeInTheDocument();
    });

    it("actualiza los filtros locales al escribir", () => {
        setup();

        fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));

        const inputName = screen.getByLabelText(/nombre de la propiedad/i);
        fireEvent.change(inputName, { target: { value: "Villa Nueva" } });

        expect(screen.getByDisplayValue("Villa Nueva")).toBeInTheDocument();
    });

    it("aplica los filtros al hacer click en 'Aplicar filtros'", () => {
        const onSubmit = jest.fn();
        setup({ onSubmit });

        fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));
        fireEvent.click(screen.getByRole("button", { name: /aplicar filtros/i }));

        expect(onSubmit).toHaveBeenCalledWith(initialFilters);
    });

    it("limpia los filtros al hacer click en 'Limpiar filtros'", () => {
        const onSubmit = jest.fn();
        setup({ onSubmit });

        fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));
        fireEvent.click(screen.getByRole("button", { name: /limpiar filtros/i }));

        expect(onSubmit).toHaveBeenCalledWith({});
    });
});

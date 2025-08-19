import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Property } from "@/features/properties/types";
import PropertyEditModal from "@/features/properties/components/PropertyEditModal";
import { updateProperty } from "@/features/properties/api";

jest.mock("@/features/properties/api", () => ({
    updateProperty: jest.fn(),
}));

const mockProperty: Property = {
    idProperty: "123",
    idOwner: "owner-1",
    name: "Casa Bonita",
    address: "Calle Falsa 123",
    price: 150000,
    year: 2023,
    codeInternal: "A-001",
    createdAt: new Date(),
    traces: [],
    image: { _id: "1", file: "http://test.com/house.jpg", enabled: true },
};

const setup = (props = {}) => {
    const defaultProps = {
        isOpen: true,
        onClose: jest.fn(),
        onSuccess: jest.fn(),
        initialProperty: mockProperty,
    };
    return render(<PropertyEditModal {...defaultProps} {...props} />);
};

describe("PropertyEditModal", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza los campos del formulario con los valores iniciales", () => {
        setup();

        expect(screen.getByDisplayValue("Casa Bonita")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Calle Falsa 123")).toBeInTheDocument();
        expect(screen.getByDisplayValue("150000")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2023")).toBeInTheDocument();
    });

    it("cierra el modal al hacer click en 'Cancelar'", () => {
        const onClose = jest.fn();
        setup({ onClose });

        fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
        expect(onClose).toHaveBeenCalled();
    });

    it("llama a updateProperty y onSuccess al enviar el formulario válido", async () => {
        const onSuccess = jest.fn();
        (updateProperty as jest.Mock).mockResolvedValueOnce({});

        setup({ onSuccess });

        fireEvent.click(screen.getByRole("button", { name: /guardar cambios/i }));

        await waitFor(() => {
            expect(updateProperty).toHaveBeenCalled();
            expect(onSuccess).toHaveBeenCalled();
        });
    });

    it("muestra un error si updateProperty falla", async () => {
        (updateProperty as jest.Mock).mockRejectedValueOnce(new Error("fail"));

        setup();

        fireEvent.click(screen.getByRole("button", { name: /guardar cambios/i }));

        expect(
            await screen.findByText("Error al actualizar la propiedad. Intente de nuevo.")
        ).toBeInTheDocument();
    });
});

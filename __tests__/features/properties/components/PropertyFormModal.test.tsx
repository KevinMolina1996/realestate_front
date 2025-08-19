import { createProperty } from "@/features/properties/api";
import PropertyFormModal from "@/features/properties/components/PropertyFormModal";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("@/features/properties/api", () => ({
    createProperty: jest.fn(),
}));

describe("PropertyFormModal", () => {
    const onClose = jest.fn();
    const onSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("muestra errores si se intenta enviar vacío", async () => {
        render(<PropertyFormModal isOpen={true} onClose={onClose} onSuccess={onSuccess} />);

        fireEvent.click(screen.getByText(/Crear Propiedad/i));

        expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
        expect(screen.getByText("La dirección es obligatoria")).toBeInTheDocument();
        expect(screen.getByText("El precio debe ser mayor a 0")).toBeInTheDocument();
        expect(screen.getByText("El año debe ser válido")).toBeInTheDocument();
        expect(screen.getByText("La imagen es obligatoria")).toBeInTheDocument();
    });

    it("llama a onClose al hacer click en Cancelar", () => {
        render(<PropertyFormModal isOpen={true} onClose={onClose} onSuccess={onSuccess} />);
        fireEvent.click(screen.getByText(/Cancelar/i));
        expect(onClose).toHaveBeenCalled();
    });
});

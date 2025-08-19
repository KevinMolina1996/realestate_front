import PropertyDetail from "@/features/properties/components/PropertyDetail";
import { PropertyWithOwner } from "@/features/properties/types";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/features/properties/components/PropertyEditModal", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="edit-modal">Modal abierto</div> : null,
}));

const mockPropertyWithOwner: PropertyWithOwner = {
    property: {
        idProperty: "123",
        name: "Casa Bonita",
        address: "Calle Falsa 123",
        price: 1500000,
        codeInternal: "ABC-001",
        year: 2023,
        idOwner: "owner-1",
        image: {
            _id: "img-1",
            file: "http://example.com/house.jpg",
            enabled: true,
        },
        traces: [],
        createdAt: new Date("2023-05-01"),
    },
    owner: {
        name: "Juan Pérez",
        address: "Avenida Siempre Viva 742",
        birthDay: new Date("1990-01-01"),
    },
};

describe("PropertyDetail", () => {
    it("renderiza el nombre, dirección y precio de la propiedad", () => {
        render(<PropertyDetail propertyWithOwner={mockPropertyWithOwner} />);

        expect(screen.getByText("Casa Bonita")).toBeInTheDocument();
        expect(screen.getByText("Calle Falsa 123")).toBeInTheDocument();
        expect(screen.getByText("$1,500,000")).toBeInTheDocument();
    });

    it("abre el modal al hacer click en 'Editar'", () => {
        render(<PropertyDetail propertyWithOwner={mockPropertyWithOwner} />);
        const editButton = screen.getByRole("button", { name: /editar/i });
        fireEvent.click(editButton);
        expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
    });

    it("muestra la imagen de la propiedad si existe", () => {
        render(<PropertyDetail propertyWithOwner={mockPropertyWithOwner} />);
        const img = screen.getByAltText("Calle Falsa 123");
        expect(img).toHaveAttribute("src", "http://example.com/house.jpg");
    });

    it("muestra 'Sin imagen' si no hay imagen de la propiedad", () => {
        const withoutImage = {
            ...mockPropertyWithOwner,
            property: { ...mockPropertyWithOwner.property, image: { _id: "", file: "", enabled: false } },
        };

        render(<PropertyDetail propertyWithOwner={withoutImage} />);
        expect(screen.getByText("Sin imagen")).toBeInTheDocument();
    });
});

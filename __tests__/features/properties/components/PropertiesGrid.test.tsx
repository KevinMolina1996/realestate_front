import React from "react";
import { render, screen } from "@testing-library/react";
import { Property } from "@/features/properties/types";
import PropertiesGrid from "@/features/properties/components/PropertiesGrid";
import PropertyCard from "@/features/properties/components/PropertyCard";

// Mock de los datos de propiedades
const mockProperties: Property[] = [
    {
        idProperty: "1",
        name: "Casa en la playa",
        address: "Cancún",
        price: 250000,
        codeInternal: "",
        year: 0,
        idOwner: "",
        image: { _id: "", file: "", enabled: true },
        traces: [],
        createdAt: new Date()
    },
    {
        idProperty: "2",
        name: "Casa en la playa",
        address: "Cancún",
        price: 250000,
        codeInternal: "",
        year: 0,
        idOwner: "",
        image: { _id: "", file: "", enabled: true },
        traces: [],
        createdAt: new Date()
    },
];

// Mock del componente PropertyCard para evitar probar su lógica interna
jest.mock("@/features/properties/components/PropertyCard", () => {
    return jest.fn(() => <div data-testid="property-card-mock" />);
});

describe("PropertiesGrid", () => {
    it("renderiza correctamente la lista de propiedades", () => {
        render(<PropertiesGrid properties={mockProperties} />);

        // Verifica que el contenedor del grid existe
        const gridElement = screen.getByTestId("properties-grid");
        expect(gridElement).toBeInTheDocument();

        // Verifica que se renderizan los PropertyCard mockeados
        const propertyCards = screen.getAllByTestId("property-card-mock");
        expect(propertyCards).toHaveLength(mockProperties.length);
    });

    it("pasa las props correctas a cada PropertyCard", () => {
        render(<PropertiesGrid properties={mockProperties} />);

        const calls = (PropertyCard as jest.Mock).mock.calls;

        // Tomamos solo las props (primer argumento) y quitamos duplicados
        const uniqueProps = calls.map(call => call[0]).filter(
            (prop, index, arr) =>
                index === arr.findIndex(p => p.property.idProperty === prop.property.idProperty)
        );

        expect(uniqueProps).toHaveLength(mockProperties.length);

        uniqueProps.forEach((props, index) => {
            expect(props).toEqual({ property: mockProperties[index] });
        });
    });

});
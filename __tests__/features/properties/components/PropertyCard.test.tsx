import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Property } from "@/features/properties/types";
import PropertyCard from "@/features/properties/components/PropertyCard";

jest.mock("next/link", () => {
    return ({ href, children }: any) => <a href={href}>{children}</a>;
});

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("PropertyCard", () => {
    const mockProperty: Property = {
        idProperty: "1",
        name: "Casa en Cali",
        address: "Calle 123",
        price: 250000000,
        codeInternal: "ABC123",
        year: 2020,
        idOwner: "owner123",
        image: {
            _id: "img1",
            file: "house.jpg",
            enabled: true
        },
        traces: [],
        createdAt: new Date()
    };

    it("renderiza el nombre y la imagen de la propiedad", () => {
        render(<PropertyCard property={mockProperty} />);
        expect(screen.getByText("Casa en Cali")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", mockProperty.image!.file);
    });

    it("muestra 'EN VENTA' si no tiene traces", () => {
        render(<PropertyCard property={mockProperty} />);
        expect(screen.getByText("EN VENTA")).toBeInTheDocument();
    });

    it("muestra 'VENDIDA' si tiene traces", () => {
        const soldProperty = {
            ...mockProperty, traces: [{
                dateSale: "2025-08-18",
                name: "Venta inicial",
                value: 200000000,
                tax: 15000
            }]
        };
        render(<PropertyCard property={soldProperty} />);
        expect(screen.getByText("VENDIDA")).toBeInTheDocument();
    });
});

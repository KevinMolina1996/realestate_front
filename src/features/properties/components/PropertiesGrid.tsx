import React from "react";
import { Property } from "../types";
import PropertyCard from "./PropertyCard";

const PropertiesGrid: React.FC<{ properties: Property[] }> = ({ properties }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16" data-testid="properties-grid">
            {properties.map((property) => (
                <PropertyCard key={property.idProperty} property={property} />
            ))}
        </div>
    );
};

export default PropertiesGrid;
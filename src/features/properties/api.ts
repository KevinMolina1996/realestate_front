import { Property, PropertyDto, PropertyFiltersValues, PropertyUpdateDto, PropertyWithOwner } from "./types";

const BASE_URL = "http://localhost:5254/api/";
const PROPERTIES_ENDPOINT = `${BASE_URL}${"properties"}`;

export const getProperties = async (filters?: PropertyFiltersValues): Promise<Property[]> => {
    try {
        const queryParams = new URLSearchParams();

        if (filters?.name) queryParams.append('name', filters.name);
        if (filters?.address) queryParams.append('address', filters.address);
        if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());

        const response = await fetch(`${PROPERTIES_ENDPOINT}?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error('Error al obtener propiedades');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

export const getPropertyById = async (id: string): Promise<PropertyWithOwner> => {
    const res = await fetch(`${PROPERTIES_ENDPOINT}/${id}`);
    if (!res.ok) throw new Error("Property not found");
    return res.json();
};

export const createProperty = async (property: PropertyDto): Promise<void> => {
    const res = await fetch(PROPERTIES_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
    });

    if (!res.ok) throw new Error("Failed to create property");
};

export const updateProperty = async (property: PropertyUpdateDto): Promise<void> => {
    const res = await fetch(`${PROPERTIES_ENDPOINT}/${property.propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
    });

    if (!res.ok) throw new Error("Failed to create property");
};

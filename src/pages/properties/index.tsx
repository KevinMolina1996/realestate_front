import { getProperties } from "@/features/properties/api";
import PropertiesGrid from "@/features/properties/components/PropertiesGrid";
import { Property, PropertyFiltersValues } from "@/features/properties/types";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from "react";
import PropertyFormModal from "@/features/properties/components/PropertyFormModal";
import { FloatingCreateButton } from "@/shared/components/FloatingCreateButton";
import PropertyFilters from "@/features/properties/components/PropertyFilters";

const PropertiesPage: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<PropertyFiltersValues>({
        name: '',
        address: '',
        minPrice: null,
        maxPrice: null
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, [filters]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const data = await getProperties(filters);
            setProperties(data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterSubmit = (newFilters: PropertyFiltersValues) => {
        const processedFilters = {
            name: newFilters.name || undefined,
            address: newFilters.address || undefined,
            minPrice: newFilters.minPrice ? Number(newFilters.minPrice) : undefined,
            maxPrice: newFilters.maxPrice ? Number(newFilters.maxPrice) : undefined
        };
        setFilters(processedFilters);
    };

    const handleCreateSuccess = () => {
        fetchProperties();
        setIsCreateModalOpen(false);
    };

    return (
        <div className="max-w-screen-2xl mx-auto px-8 py-12 relative">
            <section className="mb-16">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold">FILTROS</h2>
                        <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PropertyFilters
                            initialFilters={{
                                name: filters.name || '',
                                address: filters.address || '',
                                minPrice: filters.minPrice || null,
                                maxPrice: filters.maxPrice || null
                            }}
                            onSubmit={handleFilterSubmit}
                        />

                        <FloatingCreateButton onClick={() => setIsCreateModalOpen(true)} />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">Cargando propiedades...</div>
                ) : (
                    <PropertiesGrid properties={properties} />
                )}
            </section>

            <PropertyFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
};

export default PropertiesPage;
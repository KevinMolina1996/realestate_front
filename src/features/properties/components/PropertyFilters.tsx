import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { PropertyFiltersValues } from '../types';

interface PropertyFiltersProps {
    initialFilters: PropertyFiltersValues;
    onSubmit: (filters: PropertyFiltersValues) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ initialFilters, onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        name: initialFilters.name || '',
        address: initialFilters.address || '',
        minPrice: initialFilters.minPrice?.toString() || '',
        maxPrice: initialFilters.maxPrice?.toString() || ''
    });

    // Sincronizar con los filtros iniciales cuando cambian
    useEffect(() => {
        setLocalFilters({
            name: initialFilters.name || '',
            address: initialFilters.address || '',
            minPrice: initialFilters.minPrice?.toString() || '',
            maxPrice: initialFilters.maxPrice?.toString() || ''
        });
    }, [initialFilters]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        // Convertir a formato para el backend
        const backendFilters: PropertyFiltersValues = {
            name: localFilters.name || undefined,
            address: localFilters.address || undefined,
            minPrice: localFilters.minPrice ? Number(localFilters.minPrice) : undefined,
            maxPrice: localFilters.maxPrice ? Number(localFilters.maxPrice) : undefined
        };
        onSubmit(backendFilters);
        setIsOpen(false);
    };

    const resetFilters = () => {
        const clearedFilters = {
            name: '',
            address: '',
            minPrice: '',
            maxPrice: ''
        };
        setLocalFilters(clearedFilters);
        onSubmit({}); // Envía objeto vacío para limpiar todos los filtros
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Abrir filtros"
            >
                <FunnelIcon className="h-5 w-5 text-gray-600" />
                <span>Filtrar propiedades</span>
            </button>

            {/* Panel de filtros */}
            <div
                className={`fixed inset-0 left-auto w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 border-l-2 border-gray-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-hidden={!isOpen}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-semibold">Filtros de búsqueda</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Cerrar filtros"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="h-[calc(100%-120px)] overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campo Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre de la propiedad
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={localFilters.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ej. Villa Paradiso"
                            />
                        </div>

                        {/* Campo Dirección */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={localFilters.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ej. Av. Principal 123"
                            />
                        </div>

                        {/* Rango de Precios */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rango de precio
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="number"
                                        id="minPrice"
                                        name="minPrice"
                                        value={localFilters.minPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Mínimo"
                                        min="0"
                                        step="1000"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        name="maxPrice"
                                        value={localFilters.maxPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Máximo"
                                        min="0"
                                        step="1000"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Pie del panel de filtros */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white flex justify-between">
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                    <div className="space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={applyFilters}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyFilters;
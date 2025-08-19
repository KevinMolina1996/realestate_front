import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Property, PropertyDto, PropertyTrace, PropertyUpdateDto } from "../types";
import { updateProperty } from "../api";
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

interface PropertyEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialProperty: Property;
}

export default function PropertyEditModal({
    isOpen,
    onClose,
    onSuccess,
    initialProperty
}: PropertyEditModalProps) {
    console.log(initialProperty)
    const [property, setProperty] = useState<Property>(initialProperty);
    const [isSold, setIsSold] = useState(initialProperty.traces.length > 0 ? true : false);
    const [trace, setTrace] = useState<PropertyTrace>({
        dateSale: initialProperty.traces.length > 0 ? new Date(initialProperty.traces[0].dateSale).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        name: initialProperty.traces.length > 0 ? initialProperty.traces[0].name : "Venta",
        value: initialProperty.price,
        tax: initialProperty.traces.length > 0 ? initialProperty.traces[0].tax : 0
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setProperty(initialProperty);
        setIsSold(initialProperty.traces.length > 0 ? true : false);
        setTrace({
            dateSale: initialProperty.traces.length > 0 ? new Date(initialProperty.traces[0].dateSale).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            name: initialProperty.traces.length > 0 ? initialProperty.traces[0].name : "Venta",
            value: initialProperty.price,
            tax: initialProperty.traces.length > 0 ? initialProperty.traces[0].tax : 0
        });
    }, [initialProperty]);

    const handlePropertyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProperty(prev => ({
            ...prev,
            [name]: name.includes("price") || name.includes("year")
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleTraceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTrace(prev => ({
            ...prev,
            [name]: name.includes("value") || name.includes("tax")
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const newErrors: Record<string, string> = {};
        if (!property.name) newErrors.name = "El nombre es obligatorio";
        if (!property.address) newErrors.address = "La dirección es obligatoria";
        if (!property.price || property.price <= 0) newErrors.price = "El precio debe ser mayor a 0";
        if (!property.year || property.year <= 0) newErrors.year = "El año debe ser válido";

        if (isSold) {
            if (!trace.dateSale) newErrors.dateSale = "La fecha de venta es obligatoria";
            if (!trace.value || trace.value <= 0) newErrors.value = "El valor debe ser mayor a 0";
            if (trace.tax < 0) newErrors.tax = "El impuesto no puede ser negativo";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const mapPropertyToDto = (property: Property): PropertyDto => {
                return {
                    id: property.idProperty,
                    idOwner: property.idOwner,
                    name: property.name,
                    address: property.address,
                    price: property.price,
                    year: property.year
                };
            };

            const updateData: PropertyUpdateDto = {
                propertyId: property.idProperty,
                property: mapPropertyToDto(property),
                trace: isSold ? trace : null,
                isSold
            };

            await updateProperty(updateData);
            onSuccess();
            handleClose();
        } catch (err) {
            setErrors({ form: "Error al actualizar la propiedad. Intente de nuevo." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setProperty(initialProperty);
        setIsSold(false);
        setErrors({});
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 border-l-2 border-gray-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-semibold">Editar Propiedad</h3>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="h-[calc(100%-120px)] overflow-y-auto p-6">
                    {errors.form && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {errors.form}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                            <input
                                type="text"
                                name="name"
                                value={property.name}
                                onChange={handlePropertyChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección*</label>
                            <input
                                type="text"
                                name="address"
                                value={property.address}
                                onChange={handlePropertyChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                required
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio*</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={property.price}
                                    onChange={handlePropertyChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Año*</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={property.year}
                                    onChange={handlePropertyChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.year ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    required
                                />
                                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={isSold}
                                    onChange={(e) => setIsSold(e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-900 font-medium">Marcar como vendida</span>
                            </label>

                            {isSold && (
                                <div className="mt-4 space-y-4 pl-2 border-l-4 border-blue-200">
                                    <h4 className="font-medium text-gray-700">Datos de la venta</h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de venta*</label>
                                        <input
                                            type="date"
                                            name="dateSale"
                                            value={trace.dateSale}
                                            onChange={handleTraceChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.dateSale ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                            required
                                        />
                                        {errors.dateSale && <p className="mt-1 text-sm text-red-600">{errors.dateSale}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor de venta*</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={trace.value}
                                            onChange={handleTraceChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.value ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                        {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Impuestos</label>
                                        <input
                                            type="number"
                                            name="tax"
                                            value={trace.tax}
                                            onChange={handleTraceChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.tax ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                            min="0"
                                            step="0.01"
                                        />
                                        {errors.tax && <p className="mt-1 text-sm text-red-600">{errors.tax}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white flex justify-between">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            'Guardando...'
                        ) : (
                            <>
                                <CheckIcon className="h-5 w-5 mr-1" />
                                Guardar cambios
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useState, ChangeEvent, FormEvent } from "react";
import { PropertyDto } from "../types";
import { createProperty } from "../api";
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PropertyFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PropertyFormModal({ isOpen, onClose, onSuccess }: PropertyFormModalProps) {
    const [property, setProperty] = useState<PropertyDto>({
        id: "",
        idOwner: "",
        name: "",
        address: "",
        price: 0,
        year: 0,
        fileName: "",
        image: ""
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProperty(prev => ({
            ...prev,
            [name]: name.includes("price") || name.includes("year")
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProperty(prev => ({
                        ...prev,
                        fileName: file.name,
                        image: event.target?.result as string
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
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
        if (!imageFile) newErrors.image = "La imagen es obligatoria";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const cleanBase64 = property.image?.split(",")[1];
            const propertyToSend = { ...property, image: cleanBase64 };
            await createProperty(propertyToSend);

            onSuccess();
            handleClose();
        } catch (err) {
            setErrors({ form: "Error al crear la propiedad. Intente de nuevo." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setProperty({
            id: "",
            idOwner: "",
            name: "",
            address: "",
            price: 0,
            year: 0,
            fileName: "",
            image: ""
        });
        setImageFile(null);
        setErrors({});
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 border-l-2 border-gray-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-semibold">Nueva Propiedad</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID Propietario*</label>
                            <input
                                type="text"
                                name="idOwner"
                                value={property.idOwner}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                            <input
                                type="text"
                                name="name"
                                value={property.name}
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.year ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    required
                                />
                                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen*</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.image ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                required
                            />
                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            {imageFile && (
                                <p className="mt-1 text-sm text-gray-500">
                                    Archivo seleccionado: {imageFile.name}
                                </p>
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
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creando...' : 'Crear Propiedad'}
                    </button>
                </div>
            </div>
        </div>
    );
}
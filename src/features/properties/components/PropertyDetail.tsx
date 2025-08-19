import {
    ArrowLeftIcon,
    PencilIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    UserIcon,
    CakeIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PropertyWithOwner } from '../types';
import { useState } from 'react';
import PropertyEditModal from './PropertyEditModal';

interface PropertyDetailProps {
    propertyWithOwner: PropertyWithOwner;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyWithOwner }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <Link
                    href="/properties"
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    <span>Volver al listado</span>
                </Link>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <div className="relative h-96 w-full overflow-hidden">
                    {propertyWithOwner.property.image.file ? (
                        <img
                            src={propertyWithOwner.property.image.file}
                            alt={propertyWithOwner.property.address}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">Sin imagen</span>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-800 uppercase tracking-wide">
                            Código: {propertyWithOwner.property.codeInternal}
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-normal text-gray-900 mb-2">
                                {propertyWithOwner.property.name}
                            </h1>
                            <div className="flex items-center text-gray-600">
                                <MapPinIcon className="h-5 w-5 mr-1" />
                                <span>{propertyWithOwner.property.address}</span>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <PencilIcon className="h-5 w-5 mr-2" />
                                <span>Editar</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <CurrencyDollarIcon className="h-6 w-6 text-gray-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Precio</p>
                                <p className="text-xl font-medium">
                                    ${propertyWithOwner.property.price?.toLocaleString('es-MX') || '0'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Año</p>
                                <p className="text-xl font-medium">{propertyWithOwner.property.year || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Propietario</p>
                                {propertyWithOwner.owner ? (
                                    <p className="text-xl font-medium">{propertyWithOwner.owner.name}</p>
                                ) : (
                                    <p className="text-xl font-medium">ID: {propertyWithOwner.property.idOwner}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {propertyWithOwner.owner && (
                        <div className="border-t border-gray-200 pt-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Información del Propietario</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-500">Nombre</span>
                                    </div>
                                    <p className="font-medium">{propertyWithOwner.owner.name}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-500">Dirección</span>
                                    </div>
                                    <p className="font-medium">{propertyWithOwner.owner.address}</p>
                                </div>

                                {propertyWithOwner.owner.birthDay && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <CakeIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-500">Fecha de nacimiento</span>
                                        </div>
                                        <p className="font-medium">{formatDate(propertyWithOwner.owner.birthDay)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-semibold mb-4">Información adicional</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <EyeIcon className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-500">Código Interno</span>
                                </div>
                                <p className="font-medium">{propertyWithOwner.property.codeInternal || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-500">Fecha de creación</span>
                                </div>
                                <p className="font-medium">{formatDate(propertyWithOwner.property.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Imágenes</h2>
                    {propertyWithOwner.property.image?.file ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="border rounded-lg overflow-hidden group relative">
                                <img
                                    src={propertyWithOwner.property.image.file}
                                    alt="Propiedad"
                                    className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
                                />
                                <div className="p-2 text-sm text-gray-600 truncate">
                                    {propertyWithOwner.property.image.file || 'imagen.jpg'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No hay imágenes disponibles</p>
                    )}
                </div>
            </div>

            <div className="mt-8 bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Mapa de ubicación</p>
                    </div>
                </div>
            </div>

            <PropertyEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={() => {
                    window.location.reload();
                }}
                initialProperty={propertyWithOwner.property}
            />
        </div>
    );
};

export default PropertyDetail;
import React from "react";
import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Property } from "../types";

interface Props {
    property: Property;
}

const PropertyCard: React.FC<Props> = ({ property }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            {property.image?.file && (
                <div className="relative aspect-[4/3] overflow-hidden group">
                    <img
                        src={property.image.file}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs px-3 py-1 font-semibold uppercase tracking-wide">
                        {property.traces.length > 0 ? "VENDIDA" : "EN VENTA"}
                    </span>
                    <Link
                        href={`/properties/detail/${property.idProperty}`}
                        className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <button className="flex items-center gap-1 p-2 bg-white/90 text-gray-800 rounded-full shadow hover:bg-white transition-colors">
                            <EyeIcon className="h-4 w-4" />
                        </button>
                    </Link>
                </div>
            )}

            <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                        {property.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded whitespace-nowrap">
                        {property.codeInternal}
                    </span>
                </div>

                <div className="mt-2 flex justify-between items-end">
                    <p className="text-lg font-semibold text-gray-900">
                        ${property.price.toLocaleString("es-MX")}
                    </p>
                    <p className="text-xs text-gray-400">
                        {new Date(property.createdAt).toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
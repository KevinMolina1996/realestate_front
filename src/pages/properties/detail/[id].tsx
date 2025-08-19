import { GetServerSideProps } from 'next';
import { getPropertyById } from '@/features/properties/api';
import { PropertyWithOwner } from '@/features/properties/types';
import PropertyDetail from '@/features/properties/components/PropertyDetail';

interface Props {
    property: PropertyWithOwner;
}

const PropertyDetailPage: React.FC<Props> = ({ property }) => {
    return <PropertyDetail propertyWithOwner={property} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { id } = context.params as { id: string };

        if (!id || typeof id !== 'string') {
            return {
                notFound: true,
            };
        }

        const property = await getPropertyById(id);

        if (!property) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                property: JSON.parse(JSON.stringify(property))
            },
        };
    } catch (error) {
        console.error('Error fetching property:', error);
        return {
            notFound: true,
        };
    }
};

export default PropertyDetailPage;
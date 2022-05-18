import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { Supplier } from 'src/types/supplier';
import { addItem } from '@contexts/cart/cart.utils';

type VendorCardProps = {
  shop: Supplier;
};

const VendorCard: React.FC<VendorCardProps> = ({ shop }) => {
  const { t } = useTranslation();
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  return (
    <Link
      href={`${ROUTES.SHOPS}/${shop.id}`}
      className="flex items-center px-5 xl:px-7 py-5 xl:py-7 border border-skin-base rounded-lg shadow-vendorCard cursor-pointer relative bg-white transition-all hover:shadow-vendorCardHover"
    >
      <div className="relative flex flex-shrink-0 items-center justify-center bg-skin-thumbnail rounded-full overflow-hidden w-16 xl:w-20 h-16 xl:h-20">
        <Image
          alt={shop.name}
          unoptimized={true}
          src={shop.image_url == null ? '/icons/logo.png' : shop.image_url}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col ms-4 xl:ms-5">
        <Heading variant="mediumHeading" className="pb-1.5">
          {shop.name}
        </Heading>
        <Text className="xl:leading-6">{shop.contact_person}</Text>
      </div>
    </Link>
  );
};

export default VendorCard;

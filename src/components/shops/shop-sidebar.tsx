import { useState } from 'react';
import Image from 'next/image';
import Text from '@components/ui/text';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import {
  IoLocationOutline,
  IoCallOutline,
  IoGlobeOutline,
} from 'react-icons/io5';
import { Supplier } from 'src/types/supplier';

interface ShopSidebarProps {
  data?: Supplier;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data }) => {
  const {
    query: { slug },
  } = useRouter();
  const [descriptionState, setDescriptionState] = useState(Boolean(false));
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.SHOPS}/${slug}`;
  const { t } = useTranslation('common');
  const descriptionHandel = () => {
    return setDescriptionState(true);
  };
  return (
    <div className="flex flex-col pt-10 lg:pt-14 px-6">
      <div className="text-center w-full border-b border-gray-base pb-8 px-5 sm:px-8 lg:px-0 2xl:px-7">
        <div className="w-32 h-32 mx-auto">
          <Image
            unoptimized
            src={data?.image_url!}
            alt={data?.name}
            width={128}
            height={128}
            className="rounded-xl"
          />
        </div>
        <Heading variant="titleLarge" className="mt-6 mb-1.5">
          {data?.name}
        </Heading>
        {/* <Text variant="small">data</Text>
        <div className="flex items-center flex-wrap justify-center space-s-2 pt-4 mt-0.5">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </LinkedinShareButton>
        </div> */}
      </div>
      <div className="space-y-6 py-7">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10">
            <IoLocationOutline className="text-2xl text-skin-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="text-skin-base font-medium text-15px mb-1">
              {t('text-address')}:
            </h4>
            <Text>{data?.contact_person}</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10">
            <IoCallOutline className="text-2xl text-skin-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="text-skin-base font-medium text-15px mb-1">
              Số điện thoại :
            </h4>
            <Text>{data?.phone_number}</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10">
            <IoGlobeOutline className="text-2xl text-skin-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="text-skin-base font-medium text-15px mb-1">
              {t('text-website')}:
            </h4>
            <Text>
              <a
                href={`https://unibean.net`}
                className="text-[#0077E5] hover:text-skin-muted"
              >
                {data?.contact_person}
              </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;

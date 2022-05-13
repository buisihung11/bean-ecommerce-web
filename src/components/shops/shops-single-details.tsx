import { useShopQuery } from '@framework/shop/get-shop';
import Text from '@components/ui/text';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { Element } from 'react-scroll';
import Container from '@components/ui/container';
import { Drawer } from '@components/common/drawer/drawer';
import ShopSidebar from '@components/shops/shop-sidebar';
import ShopSidebarDrawer from '@components/shops/shop-sidebar-drawer';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import { useTranslation } from 'next-i18next';
import useWindowSize from '@utils/use-window-size';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Supplier } from 'src/types/supplier';

const ShopsSingleDetails: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation('common');
  // const { data, isLoading } = useShopQuery(slug as string);
  const { openShop, displayShop, closeShop } = useUI();
  const { width } = useWindowSize();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  const { data, isLoading } = useQuery(['suppliers'], () =>
    http
      .get<{ data: Supplier[] }>(`/stores/1305/suppliers`)
      .then((res) => res.data.data)
  );

  const supplier = data?.find((item) => item.id == Number(slug));

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* <div
        className="flex justify-center h-56 md:h-64 w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${
            width! <= 480 ? supplier?.image_url! : supplier?.image_url!
          })`,
        }}
      /> */}
      <div className="flex lg:hidden items-center px-4 md:px-6 py-4 border-b border-skin-base mb-7">
        <div className="flex flex-shrink-0">
          <Image
            unoptimized
            src={supplier?.image_url!}
            alt={supplier?.name}
            width={66}
            height={66}
            className="rounded-md"
          />
        </div>
        <div className="ps-4">
          <h2 className="text-skin-base text-15px font-semibold">
            {supplier?.name}
          </h2>
          <button
            className="font-medium text-sm block text-skin-primary transition-all hover:text-skin-muted"
            onClick={openShop}
          >
            {t('text-more-info')}
          </button>
        </div>
      </div>
      <Container>
        <Element
          name="grid"
          className="flex flex-col lg:flex-row lg:pt-8 pb-16 lg:pb-20"
        >
          <div className="flex-shrink-0 hidden lg:block lg:w-80 xl:w-[350px] 2xl:w-96 lg:sticky lg:top-16 category-mobile-sidebar">
            <div className="border border-[#EFF2F4] shadow-vendorSidebar rounded-lg">
              <ShopSidebar data={supplier} />
            </div>
          </div>

          <div className="w-full lg:ps-7">
            <AllProductFeed />
          </div>
        </Element>
      </Container>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayShop}
        onClose={closeShop}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <ShopSidebarDrawer data={supplier} />
      </Drawer>
    </>
  );
};

export default ShopsSingleDetails;

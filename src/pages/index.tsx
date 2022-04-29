import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import BundleGrid from '@components/bundle/bundle-grid';
import CollectionGrid from '@components/common/collection-grid';
import HeroBannerCard from '@components/hero/hero-banner-card';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import CategoryGridBlock from '@components/common/category-grid-block';
import { homeSixHeroBanner as heroBanner } from '@framework/static/banner';
import { homeSixBanner as banner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { LIMITS } from '@framework/utils/limits';
import ShopsPageContent from '@components/shops/shops-page-content';
import { useEffect, useState } from 'react';
import http from '@framework/utils/http';
import { Product } from 'src/types/product';
import { useSessionStorage } from 'react-use';
import HighlightedBar from '@components/common/highlighted-bar';
import Image from '@components/ui/image';
import Countdown from '@components/common/countdown';
export default function Home() {
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'borobazar-highlightedBar',
    'false'
  );
  // const [filter, setFilter] = useState({
  //   'category-id': null,
  //   'supplier-id': null,
  //   'time-slot': ['00:00:00', '22:30:00'],
  // });

  // const { data, isLoading } = useQuery(['products', filter], () =>
  //   http
  //     .get<{ data: Product[] }>(`/stores/1305/products`, { params: filter })
  //     .then((res) => res.data.data)
  // );
  // console.log('filter :>> ', data);
  return (
    <>
      <HighlightedBar>
        <div className="flex items-center">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center bg-skin-fill w-9 h-9 rounded-full me-2.5">
            <Image
              width={23}
              height={23}
              src="/assets/images/delivery-box.svg"
              alt="Delivery Box"
            />
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: 'Thời gian nhận đơn',
            }}
          />
        </div>
        <Countdown date={Date.now() + 4000000 * 71} />
      </HighlightedBar>

      {/* <Seo
        title="Grocery & Food Store React Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      /> */}
      {/* <HeroBannerCard
        banner={heroBanner}
        className="hero-banner-six min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[650px] py-20 py:pt-24 mb-5 2xl:bg-center"
      /> */}
      <Container>
        {/* <BundleGrid
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          data={bundle}
        /> */}
        <CategoryGridBlock />
        <BestSellerGroceryProductFeed />
        {/* <BannerCard
          banner={banner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={false}
        />
        <PopularProductFeed /> */}

        <ShopsPageContent />
        {/* <CollectionGrid
        headingPosition="center"
        className="xl:pt-2 2xl:pt-4 3xl:pt-6 pb-1 lg:pb-0 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
      /> */}
        <DownloadApps />
      </Container>
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([
    API_ENDPOINTS.CATEGORIES,
    { limit: LIMITS.CATEGORIES_LIMITS },
  ]);
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS },
    ],
    fetchBestSellerGroceryProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
    fetchPopularProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};

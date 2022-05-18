import { Fragment } from 'react';
import ProductCard from '@components/product/product-cards/product-card';
import type { FC } from 'react';
import { useProductsQuery } from '@framework/product/get-all-products';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import SectionHeader from '@components/common/section-header';
import { useModalAction } from '@components/common/modal/modal.context';
import slice from 'lodash/slice';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LIMITS } from '@framework/utils/limits';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Product } from 'src/types/product';
interface ProductFeedProps {
  element?: any;
  className?: string;
}
const AllProductFeed: FC<ProductFeedProps> = ({ element, className = '' }) => {
  const { t } = useTranslation('common');
  const {
    query: { slug },
  } = useRouter();

  // const { query } = useRouter();
  // const {
  //   isFetching: isLoading,
  //   isFetchingNextPage: loadingMore,
  //   fetchNextPage,
  //   hasNextPage,
  //   data,
  //   error,
  // } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  const { data, isLoading } = useQuery(['products'], () =>
    http
      .get<{ data: Product[] }>(`/stores/1305/suppliers/${slug}/products`, {
        params: { 'time-slot': ['00:00:00', '22:30:00'] },
      })
      .then((res) => res.data.data)
  );
  console.log('products :>> ', data);

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader sectionHeading="Danh sách món ăn" className="mb-0" />
        <div
          className="lg:hidden transition-all text-skin-primary -mt-1.5 font-semibold text-sm md:text-15px hover:text-skin-base"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t('text-categories')}
        </div>
      </div>
      {false ? (
        <Alert message={'dâđ'} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5">
          {isLoading
            ? Array.from({ length: 20 }).map((_, idx) => (
                <ProductCardLoader key={idx} uniqueKey={idx} />
              ))
            : data?.map((product: Product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
        </div>
      )}
    </div>
  );
};

export default AllProductFeed;

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Product } from 'src/types/product';

interface ProductGridProps {
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  console.log('query :>> ', query);
  // const {
  //   isFetching: isLoading,
  //   isFetchingNextPage: loadingMore,
  //   fetchNextPage,
  //   hasNextPage,
  //   data,
  //   error,
  // } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  const [filter, setFilter] = useState({
    'category-id': null,
    'supplier-id': null,
    'time-slot': ['00:00:00', '22:30:00'],
  });

  const { data, isLoading } = useQuery(['products'], () =>
    http
      .get<{ data: Product[] }>(`/stores/1305/products`, {
        ...query,
      })
      .then((res) => res.data.data)
  );
  console.log('product :>> ', data);

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {false ? (
          <div className="col-span-full">
            {/* <Alert message={error?.message} /> */}
          </div>
        ) : isLoading ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.map((product: Product) => (
            <ProductCard
              key={`product--key-${product.product_id}`}
              product={product}
            />
          ))
        )}
        {/* end of error state */}
      </div>
      {/* {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )} */}
    </>
  );
};

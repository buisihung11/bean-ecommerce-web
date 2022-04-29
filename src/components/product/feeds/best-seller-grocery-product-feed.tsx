import type { FC } from 'react';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductsGridBlock from '../products-grid-block';
import { LIMITS } from '@framework/utils/limits';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Product } from 'src/types/product';

interface ProductFeedProps {
  className?: string;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading } = useQuery(['products'], () =>
    http
      .get<{ data: Product[] }>(`/stores/1305/products`, {
        params: { 'time-slot': ['00:00:00', '22:30:00'] },
      })
      .then((res) => res.data.data)
  );
  return (
    <ProductsGridBlock
      sectionHeading="Danh sách món ăn"
      // sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={data}
      loading={isLoading}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
};
export default BestSellerGroceryProductFeed;

import BundleCard from '@components/cards/bundle-card';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';
import SectionHeader from '@components/common/section-header';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Supplier } from 'src/types/supplier';
import { Product } from 'src/types/product';
import ProductCard from '@components/product/product-cards/product-card';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface Props {
  className?: string;
  supplier?: Supplier;
}

const breakpoints = {
  '2560': {
    slidesPerView: 7,
    spaceBetween: 24,
  },
  '1440': {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  '1280': {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 4,
    spaceBetween: 18,
  },
  '768': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '530': {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  '0': {
    slidesPerView: 2,
    spaceBetween: 15,
  },
};

const BundleGrid: React.FC<Props> = ({
  className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',
  supplier,
}) => {
  const { width } = useWindowSize();
  const { data, isLoading } = useQuery(['products'], () =>
    http
      .get<{ data: Product[] }>(
        `/stores/1305/suppliers/${supplier?.id}/products`,
        {
          params: { 'time-slot': ['00:00:00', '22:30:00'] },
        }
      )
      .then((res) => res.data.data)
  );
  return (
    <div className={cn('heightFull', className)}>
      <div className="py:1">
        <SectionHeader
          sectionHeading={`${supplier?.name}`}
          // sectionSubHeading="text-favorite-different-categories"
          headingPosition="center"
        />
      </div>
      {width! < 2570 ? (
        <Carousel breakpoints={breakpoints}>
          {data?.map((item: Product) => (
            <SwiperSlide key={`bundle-key-${item.product_id}`}>
              {/* <BundleCard
                bundle={item}
                href={`${ROUTES.BUNDLE}/${item.slug}`}
              /> */}
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data?.map((item: Product) => (
            <ProductCard key={item.product_id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BundleGrid;

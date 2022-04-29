import dynamic from 'next/dynamic';
import CategoryCard from '@components/cards/category-card';
import SectionHeader from '@components/common/section-header';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { ROUTES } from '@utils/routes';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import { LIMITS } from '@framework/utils/limits';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Category } from 'src/types/category';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface CategoriesProps {
  className?: string;
}
const breakpoints = {
  '2560': {
    slidesPerView: 15,
    spaceBetween: 24,
  },
  '1440': {
    slidesPerView: 13,
    spaceBetween: 20,
  },
  '1280': {
    slidesPerView: 11,
    spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 9,
    spaceBetween: 18,
  },
  '768': {
    slidesPerView: 7,
    spaceBetween: 16,
  },
  '530': {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 15,
  },
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
  className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',
}) => {
  const { width } = useWindowSize();

  const { data, isLoading } = useQuery(['categories'], () =>
    http.get<{ data: Category[] }>(`/categories`).then((res) => res.data.data)
  );

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="Danh mục sản phẩm"
        // sectionSubHeading="text-favorite-different-categories"
        headingPosition="center"
      />
      <div className="block 2xl:flex justify-center flex-wrap 3xl:-mx-3.5">
        {width! < 1536 ? (
          <Carousel
            autoplay={false}
            breakpoints={breakpoints}
            buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
          >
            {isLoading && !data
              ? Array.from({ length: 20 }).map((_, idx) => {
                  return (
                    <SwiperSlide key={`category--key-${idx}`}>
                      <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
                    </SwiperSlide>
                  );
                })
              : data?.map((category) => (
                  <SwiperSlide key={`category--key-${category.id}`}>
                    <CategoryCard
                      item={category}
                      // href={{
                      //   pathname: ROUTES.SEARCH,
                      //   query: { category: category.slug },
                      // }}
                    />
                  </SwiperSlide>
                ))}
          </Carousel>
        ) : isLoading && !data ? (
          Array.from({ length: 20 }).map((_, idx) => {
            return (
              <div
                key={`category-card-${idx}`}
                className="flex-shrink-0 lg:px-3.5 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
              >
                <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
              </div>
            );
          })
        ) : (
          data?.map((category) => (
            <CategoryCard
              key={`category--key-${category.id}`}
              item={category}
              // href={{
              //   pathname: ROUTES.SEARCH,
              //   query: { category: category.slug },
              // }}
              className="flex-shrink-0 2xl:px-3.5 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryGridBlock;

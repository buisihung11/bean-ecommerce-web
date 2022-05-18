import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useState } from 'react';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';
import { Product } from 'src/types/product';
import { Category } from 'src/types/category';

export const CategoryFilter = () => {
  const { t } = useTranslation('common');
  const { data, isLoading } = useQuery(['categories'], () =>
    http.get<{ data: Category[] }>(`/categories`).then((res) => res.data.data)
  );
  console.log('categories :>> ', data);

  if (isLoading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  // if (error) return <Alert message={error?.message} />;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">{t('text-categories')}</Heading>
      <div className="max-h-full overflow-hidden rounded border border-skin-base">
        <Scrollbar className="w-full category-filter-scrollbar">
          {data?.length ? (
            <CategoryFilterMenu items={data} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              {t('text-no-results-found')}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};

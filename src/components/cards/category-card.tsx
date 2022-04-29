import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';
import { Category } from 'src/types/category';

interface Props {
  item: Category;
  // href: LinkProps['href'];
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <Link href={{}} className={cn('group block w-full text-center', className)}>
      <div className="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-full overflow-hidden bg-skin-thumbnail">
        <div
          className={`flex flex-shrink-0 transition-all duration-700 w-full h-full transform scale-50 group-hover:scale-100 ${
            dir === 'rtl'
              ? 'translate-x-full group-hover:translate-x-0'
              : '-translate-x-full group-hover:translate-x-0'
          }`}
        >
          <Image
            unoptimized={true}
            src={
              (item.pic_url == null ? '/icons/logo.png' : item.pic_url) ??
              categoryPlaceholder
            }
            alt={item.category_name || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-full"
          />
        </div>
        <div
          className={`flex flex-shrink-0 transition-all duration-700 w-full h-full transform scale-100 group-hover:scale-50 ${
            dir === 'rtl'
              ? 'translate-x-full group-hover:translate-x-0'
              : '-translate-x-full group-hover:translate-x-0'
          }`}
        >
          <Image
            src={
              (item.pic_url == null ? '/icons/logo.png' : item.pic_url) ??
              categoryPlaceholder
            }
            alt={item.category_name || t('text-card-thumbnail')}
            width={178}
            height={178}
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <h3 className="capitalize text-skin-base text-sm sm:text-15px lg:text-base truncate">
        {item.category_name}
      </h3>
    </Link>
  );
};

export default CategoryCard;

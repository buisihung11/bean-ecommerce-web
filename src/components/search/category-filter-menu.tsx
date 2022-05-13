import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useMemo, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import { FaCheck } from 'react-icons/fa';
import { Category } from 'src/types/category';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = 'hover:bg-skin-two border-t border-skin-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  depth = 0,
  item,
}: {
  className?: string;
  item: Category;
  depth?: number;
}) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );
  const isActive = checkIsActive(selectedCategories, `${item.id}`);

  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  // const { slug, name, children: items, icon } = item;

  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  function onClick() {
    const { category, ...restQuery } = query;
    let currentFormState = selectedCategories.includes(`${item.id}`)
      ? selectedCategories.filter((i) => i !== `${item.id}`)
      : [...selectedCategories, category];
    router.push(
      {
        pathname,
        query: {
          'category-id': `${item.id}`,
          'time-slot': ['00:00:00', '22:30:00'],
        },
      },
      undefined,
      { scroll: false }
    );

    displaySidebar && closeSidebar();
    // }
  }

  // let expandIcon;
  // if (Array.isArray(items) && items.length) {
  //   expandIcon = !isOpen ? (
  //     <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
  //   ) : (
  //     <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
  //   );
  // }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-skin-two': isOpen },
          className
        )}
      >
        <button
          className={cn(
            'flex items-center w-full text-start cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 }
          )}
          // onClick={handleChange}
        >
          <div className="inline-flex flex-shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto me-2.5 md:me-4 2xl:me-3 3xl:me-4">
            <Image
              unoptimized={true}
              src={item.pic_url ?? '/assets/placeholder/category-small.svg'}
              alt={item.category_name || t('text-category-thumbnail')}
              width={40}
              height={40}
            />
          </div>

          <span className="text-skin-base capitalize py-0.5">
            {item.category_name}
          </span>
          {depth > 0 && (
            <span
              className={`w-[22px] h-[22px] text-13px flex items-center justify-center border-2 border-skin-four rounded-full ms-auto transition duration-500 ease-in-out group-hover:border-skin-yellow text-skin-inverted ${
                selectedCategories.includes(`${item.id}`) &&
                'border-skin-yellow bg-skin-yellow'
              }`}
            >
              {selectedCategories.includes(`${item.id}`) && <FaCheck />}
            </span>
          )}
        </button>
      </li>
    </>
  );
}

function CategoryFilterMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: Category) => (
        <CategoryFilterMenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;

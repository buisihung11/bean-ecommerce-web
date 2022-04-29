import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { useTranslation } from 'next-i18next';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import {
  IoArrowRedoOutline,
  IoBuild,
  IoCompass,
  IoMail,
  IoMailOutline,
} from 'react-icons/io5';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { Product } from 'src/types/product';
import UserIcon from '@components/icons/user-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import { EmailIcon } from 'react-share';
import AccountAddressIcon from '@components/icons/account-address';
import { ImAddressBook } from 'react-icons/im';
import { FaBuilding, FaRegBuilding } from 'react-icons/fa';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export default function ProductPopup() {
  const { t } = useTranslation('common');
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: 'USD',
  });
  const variations = getVariations(data.variations);
  // const { slug, image, name, unit, description, gallery, tag, quantity } = data;
  const product: Product = data;
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${product.product_id}`;
  // const handleChange = () => {
  //   setShareButtonStatus(!shareButtonStatus);
  // };
  // const isSelected = !isEmpty(variations)
  //   ? !isEmpty(attributes) &&
  //     Object.keys(variations).every((variation) =>
  //       attributes.hasOwnProperty(variation)
  //     )
  //   : true;
  // let selectedVariation: any = {};
  // if (isSelected) {
  //   selectedVariation = data?.variation_options?.find((o: any) =>
  //     isEqual(
  //       o.options.map((v: any) => v.value).sort(),
  //       Object.values(attributes).sort()
  //     )
  //   );
  // }
  // const item = generateCartItem(data, selectedVariation);
  // const outOfStock = isInCart(item.id) && !isInStock(item.id);
  // function addToCart() {
  //   if (!isSelected) return;
  //   // to show btn feedback while product carting
  //   setAddToCartLoader(true);
  //   setTimeout(() => {
  //     setAddToCartLoader(false);
  //   }, 1500);
  //   addItemToCart(item, selectedQuantity);
  //   toast(t('text-added-bag'), {
  //     progressClassName: 'fancy-progress-bar',
  //     position: width! > 768 ? 'bottom-right' : 'top-right',
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // }
  // function addToWishlist() {
  //   setAddToWishlistLoader(true);
  //   setFavorite(!favorite);
  //   const toastStatus: string =
  //     favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
  //   setTimeout(() => {
  //     setAddToWishlistLoader(false);
  //   }, 1500);
  //   toast(toastStatus, {
  //     progressClassName: 'fancy-progress-bar',
  //     position: width! > 768 ? 'bottom-right' : 'top-right',
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${product.product_id}`);
  }

  // useEffect(() => setSelectedQuantity(1), [data.id]);

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 pt-4 md:pt-7 2xl:pt-10">
          <div className="lg:flex items-start justify-between">
            <div className="xl:flex items-center justify-center overflow-hidden mb-6 md:mb-8 lg:mb-0">
              <div className="w-auto flex items-center justify-center">
                <Image
                  src={product.pic_url ?? '/icons/logo.png'}
                  alt={product.product_name}
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col lg:ps-5 xl:ps-8 2xl:ps-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300 hover:text-skin-primary">
                    {product.product_name}
                  </h2>
                </div>

                <div className="flex items-center mt-5">
                  <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
                    {product.price} đ
                  </div>
                </div>
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                <h2 className="text-skin-base text-lg md:text-xl xl:text-xl font-medium transition-colors duration-300">
                  Đặt hàng:
                </h2>
                {/* <Button className="w-full px-1.5" loading={addToCartLoader}>
                  <CartIcon color="#ffffff" className="me-3" />
                  Đặt hàng vui lòng liên hệ BeanOi
                </Button> */}

                <div className="grid grid-cols-1 gap-2.5">
                  <Button
                    variant="border"
                    className={`group hover:text-skin-primary ${
                      favorite === true && 'text-skin-primary'
                    }`}
                  >
                    <PhoneIcon className="mx-2"></PhoneIcon>
                    0358817512
                  </Button>
                  <Button
                    variant="border"
                    className={`w-full hover:text-skin-primary ${
                      shareButtonStatus === true && 'text-skin-primary'
                    }`}
                  >
                    <UserIcon className="mx-2"></UserIcon>
                    Admin BeanOi
                  </Button>
                  <Button
                    variant="border"
                    className={`group hover:text-skin-primary ${
                      favorite === true && 'text-skin-primary'
                    }`}
                  >
                    <IoMailOutline className="mx-2" size={22}></IoMailOutline>
                    example@gmail.com
                  </Button>
                  <Button
                    variant="border"
                    className={`group hover:text-skin-primary ${
                      favorite === true && 'text-skin-primary'
                    }`}
                  >
                    <FaRegBuilding className="mx-2" size={22}></FaRegBuilding>
                    Room 8011, S1.06
                  </Button>
                </div>
              </div>

              {/* <div className="pt-6 xl:pt-8">
                <Heading className="mb-3 lg:mb-3.5">Thông Tin Liên Hệ</Heading>
                <UserIcon color="#ffffff" className="me-3">
                  BeanOi
                </UserIcon>
                <Text variant="small">{product.category_name}</Text>
              </div> */}
            </div>
          </div>
        </div>
        {/* <RelatedProductFeed
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
        /> */}
      </div>
    </div>
  );
}

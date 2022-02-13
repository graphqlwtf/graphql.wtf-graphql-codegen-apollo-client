import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { getCartId } from "../lib/cart";
import { Product } from "../components/Product";

import tee from "../public/tee.png";
import pillow from "../public/pillow.png";

const ProductPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ cartId }) => (
  <div className="grid gap-12 grid-cols-2">
    <Product cartId={cartId} id="1" name="T-Shirt" price={1000} image={tee} />
    <Product cartId={cartId} id="2" name="Pillow" price={1500} image={pillow} />
  </div>
);

export const getServerSideProps: GetServerSideProps<{
  cartId: string;
}> = async ({ req, res }) => {
  const cartId = getCartId({ req, res });

  return { props: { cartId } };
};

export default ProductPage;

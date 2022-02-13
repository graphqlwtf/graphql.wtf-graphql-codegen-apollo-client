import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../graphql/generated/schema";
import { getCartId } from "../lib/cart";

const CartPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ cartId }) => {
  const { data } = useGetCartQuery({ variables: { id: cartId } });
  const [removeItem] = useRemoveFromCartMutation();

  return (
    <div className="space-y-3 md:space-y-6">
      {data?.cart?.items.map((item) => (
        <div key={item.id}>
          <h2 className="space-x-3">
            <span className="font-bold">{item.name}</span>
            <button
              onClick={() =>
                removeItem({
                  variables: {
                    cartId,
                    itemId: item.id,
                  },
                })
              }
            >
              &times;
            </button>
          </h2>
          <p className="text-gray-500">
            {item.lineTotal.formatted} (x{item.quantity})
          </p>
        </div>
      ))}

      <p className="text-xl font-bold">
        Sub total
        <br />
        <span className="text-gray-500 text-2xl font-normal">
          {data?.cart?.subTotal?.formatted}
        </span>
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  cartId: string;
}> = async ({ req, res }) => {
  const cartId = getCartId({ req, res });

  return { props: { cartId } };
};

export default CartPage;

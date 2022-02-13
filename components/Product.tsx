import { HTMLProps } from "react";
import Image from "next/image";

import { useAddToCartMutation } from "../graphql/generated/schema";

export const Product = ({
  cartId,
  id,
  name,
  price,
  image,
}: HTMLProps<HTMLDivElement> & {
  cartId: string;
  id: string;
  name: string;
  price: number;
  image: StaticImageData;
}) => {
  const [addToCart] = useAddToCartMutation({
    onCompleted: () => alert("Added!"),
    variables: {
      cartId,
      itemId: id,
      name,
      price,
    },
  });

  return (
    <div>
      <Image src={image} />

      <div className="bg-gray-100 rounded p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-700 font-bold text-xl">{name}</h2>
          <p className="space-x-3">
            <span className="text-gray-500">${price / 100}</span>
            <button
              className="bg-pink-500 text-white font-bold p-2 rounded"
              onClick={() => addToCart()}
            >
              Add to Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

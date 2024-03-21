/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  return (
    <div>
      <div className="flex w-full flex-row justify-evenly md:justify-end pt-2">
        <p className="my-1 md:mr-10 cursor-pointer">Help</p>
        <p className="my-1 md:mr-10 cursor-pointer">Orders & Returns</p>
        <p className="my-1 md:mr-10 cursor-pointer">Hi, John</p>
      </div>
      <div className="flex flex-col lg:flex-row items-center py-2">
        <p
          className="m-auto lg:mr-auto lg:ml-16 my-3 lg:my-0 cursor-pointer text-3xl font-bold"
          onClick={() => router.push("/")}
        >
          ECOMMERCE
        </p>
        <div className="mx-auto flex w-full lg:w-2/5 flex-row justify-evenly py-2 font-bold">
          <p className="cursor-pointer">Categories</p>
          <p className="cursor-pointer">Sales</p>
          <p className="cursor-pointer">Clearance</p>
          <p className="cursor-pointer">New Stock</p>
          <p className="cursor-pointer">Trending</p>
        </div>
        <div className="ml-auto flex flex-row justify-evenly">
          <p className="mr-16">
            <img
              src="/assets/magnifying-glass.png"
              className="h-8 w-8 cursor-pointer"
              alt="search"
            />
          </p>
          <p className="mr-16">
            <img
              src="/assets/cart.png"
              className="h-8 w-8 cursor-pointer"
              alt="cart"
            />
          </p>
        </div>
      </div>
      <div className="my-2 bg-neutral-200 py-2 text-center">
        <p>&lt; &nbsp; Get 10% off on business signup &nbsp; &gt;</p>
      </div>
    </div>
  );
}

export default Navbar;

import { useState, useEffect } from "react";
import ProductsService from "../services/products.services";
import { useLocation } from "react-router-dom";
import ImageCarousal from "../components/ImageCarousal";
import { setLoading } from "../store/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { addToCart} from "../store/slices/cartSlice";

function ProductPage() {

const dispatch = useDispatch()

  let { state } = useLocation();
  const [product, setProduct] = useState(null);
  const [selectedColorVariantIndex, setSelectedColorVariantIndex] =
    useState(null);
  const [selectedSizeVariantIndex, setSelectedSizeVariantIndex] =
    useState(null);

  const getAProduct = async () => {
    const response = await ProductsService.getProduct(state?.productId);
    // console.log(response.product);
    setProduct(response?.product);
  };

  useEffect(() => {
    getAProduct();
  }, []);

  useEffect(() => {
    const currentColorVariantIndex = product?.colorvariants?.reduce(
      (acc, curr, index) => {
        return curr._id === state.colorVariantId ? index : acc;
      },
      null
    );

    setSelectedColorVariantIndex(currentColorVariantIndex);
  }, [product]);

  useEffect(() => {
    const currentSizeVariantIndex = product?.colorvariants[
      selectedColorVariantIndex
    ].sizevariants?.reduce((acc, curr, index) => {
      return curr._id === state.sizeVariantId ? index : acc;
    }, null);

    setSelectedSizeVariantIndex(currentSizeVariantIndex);
  }, [selectedColorVariantIndex]);

  const handleCart = () => {
    if (product) {
      dispatch(addToCart(product)); 
    }
    
  }

  return (
    <>
      <div className="max-w-7xl w-full flex ">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 my-4">
            <div className="p-4 w-full">
              {product?.colorvariants[selectedColorVariantIndex]?.images && (
                <ImageCarousal
                  images={
                    product?.colorvariants[selectedColorVariantIndex]?.images
                  }
                />
              )}
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="py-1 rounded-sm w-full font-bold text-xl">
                  {product?.name}
                </p>
                <p className="text-slate-400 font-light text-sm">
                  {product?.category?.name}
                </p>
              </div>
              <div className="flex flex-col text-lg font-bold">
                <div className="flex flex-row ">
                  <p className="line-through">
                    ₹
                    {
                      product?.colorvariants[selectedColorVariantIndex]
                        ?.sizevariants[selectedSizeVariantIndex]?.mrp
                    }
                  </p>
                  <p>
                    ₹
                    {
                      product?.colorvariants[selectedColorVariantIndex]
                        ?.sizevariants[selectedSizeVariantIndex]?.selling_price
                    }
                  </p>
                </div>
                <p className="text-slate-500 font-light text-sm">
                  Inclusive of All Taxes + Free Shipping
                </p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p>
                  {" "}
                  COLOR:{" "}
                  <span className="text-slate-500">
                    {product?.colorvariants[selectedColorVariantIndex]?.name}
                  </span>{" "}
                </p>
                <div className="flex flex-row gap-4">
                  {product?.colorvariants?.map((item, index, arr) => {
                    return (
                      <img
                        key={item._id}
                        onClick={() => {
                          setSelectedColorVariantIndex(index);
                        }}
                        className={`w-10 h-10 rounded-full ${
                          selectedColorVariantIndex === index
                            ? ` border-2 border-green-500`
                            : `border-2 border-slate-300`
                        }`}
                        src={arr[index]?.thumbnail.url}
                      ></img>
                    );
                  })}
                </div>
              </div>
              <div>SELECT SIZE</div>
              <div className="w-full flex flex-row gap-2 font-light ">
                {product?.colorvariants[
                  selectedColorVariantIndex
                ]?.sizevariants?.map((size, index, arr) => {
                  return (
                    <div
                      key={size._id}
                      className={`w-10 h-10 border-black border grid place-content-center ${
                        selectedSizeVariantIndex === index
                          ? "bg-black text-white"
                          : "bg-slate-100 text-black "
                      }`}
                      onClick={() => {
                        setSelectedSizeVariantIndex(index);
                      }}
                    >
                      <p className="text-lg font-light">{size.name}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-row gap-2 items-center">
                <label>QTY:</label>
                <select
                  name=""
                  id=""
                  className="px-2 py-2 cursor-pointer border-[1px] border-black"
                >
                  <option disabled value="Select...">
                    Select...
                  </option>
                  {["1", "2", "3", "4", "5"].map((i) => {
                    return <option value={i}>{i}</option>;
                  })}
                </select>
              </div>
              <button className="py-2 px-4 font-bold text-black border border-black hover:bg-black hover:text-white"
               onClick={handleCart}>
                ADD TO CART
              </button>
            </div>
            <div className="p-4 w-full">
              <p className="p-1  text-md ">{product?.description}</p>
              <p className="p-1 text-sm text-slate-500">{product?.keyword}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ProductPage;

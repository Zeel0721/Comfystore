import Product from "./Product";
import { Row } from "antd";
import { useGetFeaturedProductQuery } from "../Features/productApi";
import { Loading } from "./Loading";

export default function Home() {
  const { data: featuredProduct, isLoading } = useGetFeaturedProductQuery();

  return featuredProduct !== undefined && !isLoading ? (
    <>
      <div className="py-20 px-6 mx-40">
        <div className="flex justify-around">
          <div className="home-desctiption">
            <h1 className="mt-6 text-6xl font-bold mb-8 home-header-text">
              We are changing the way people shop
            </h1>
            <p className="text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <button className="product-btn" id="product-btn">
              OUR PRODUCTS
            </button>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-3xl overflow-scroll home-image">
            {featuredProduct.length &&
              featuredProduct.map(
                (value: any) =>
                  value.category.includes("example") && (
                    <div className="home-image-container" key={value.name}>
                      <img
                        className="max-w-none rounded-3xl object-cover"
                        src={`data:image/png;base64,${value.image}`}
                        alt={`${value.name} image`}
                      />
                    </div>
                  )
              )}
          </div>
        </div>
        <div className="w-12/12 mt-20 feature-section">
          <div className="px-8">
            <div className="pb-1.5 feature-header-container">
              <h1 className="feature-text font-semibold text-3xl pb-5">
                Featured Products
              </h1>
            </div>
          </div>
          {featuredProduct.length && (
            <Row className="w-full my-14" justify="space-around" align="middle">
              {featuredProduct.map(
                (item: any) =>
                  item.category.includes("featured") && (
                    <Product key={item.name} item={item} />
                  )
              )}
            </Row>
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

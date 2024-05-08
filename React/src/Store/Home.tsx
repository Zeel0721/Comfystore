import { useLayoutEffect, useState } from "react";
import { getFeaturedProduct } from "../functions";
import { CircularProgress, Grid } from "@mui/material";
import Product from "./Product";

export default function Home() {
  const [featuredProduct, setFeaturedProduct] = useState<any[]>([]);

  useLayoutEffect(() => {
    getFeaturedProduct(setFeaturedProduct);
  }, []);

  return (
    <>
      <div className="home">
        <div className="home-main">
          <div className="home-desctiption">
            <h1 className="home-header-text">
              We are changing the way people shop
            </h1>
            <p className="home-description-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <button className="product-btn" id="product-btn">
              OUR PRODUCTS
            </button>
          </div>
          <div className="home-image">
            {featuredProduct.length ? (
              featuredProduct.map(
                (value: any) =>
                  value.category.includes("example") && (
                    <div className="home-image-container" key={value.name}>
                      <img
                        src={URL.createObjectURL(value.image)}
                        alt={`${value.name} image`}
                      />
                    </div>
                  )
              )
            ) : (
              <div className="home-content-container">
                <CircularProgress className="home-loading" color="secondary" />
              </div>
            )}
          </div>
        </div>
        <div className="feature-section">
          <div className="feature-header">
            <div className="feature-header-container">
              <h1 className="feature-text">Featured Products</h1>
            </div>
          </div>
          <div className="feature-products">
            {featuredProduct.length ? (
              <Grid container columnGap={2} className="product-grid-container">
                {featuredProduct.map(
                  (item: any) =>
                    item.category.includes("featured") && (
                      <Product key={item.name} item={item} />
                    )
                )}
              </Grid>
            ) : (
              <div className="home-content-container">
                <CircularProgress className="home-loading" color="secondary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

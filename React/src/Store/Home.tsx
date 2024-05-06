export default function Home() {
  return (
    <>
        <div className="home">
            <div className="home-main">
                <div className="home-desctiption">
                    <h1 className="home-header-text">We are changing the way people shop
                    </h1>
                    <p className="home-description-text">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
                    </p>
                    <button className="product-btn" id='product-btn'>OUR PRODUCTS</button>
                </div>
                <div className="home-image">
                    <img src="\images\Home 1.webp" alt="Furniture-image" />
                    <img src="\images\Home 2.webp" alt="Furniture-image" />
                    <img src="\images\Home 3.webp" alt="Furniture-image" />
                    <img src="\images\Home 4.webp" alt="Furniture-image" />
                </div>
            </div>
            <div className="feature-section">
                <div className="feature-header">
                    <h1 className="feature-text">Featured Products</h1>
                </div>
                <div className="feature-products">

                </div>
            </div>
        </div>
    </>
  )
}
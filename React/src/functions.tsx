import axios from "axios";

export function refreshAccessToken(refreshToken: string | null) {
  if (!refreshToken) return;
  axios
    .get("http://localhost:3000/auth/refresh", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    .then((value) => {
      sessionStorage.setItem("accessToken", value.data);
    })
    .catch((error) => console.error(error));
  return sessionStorage.getItem("accessToken");
}
export function getProduct(
  setProduct: any,
  page: number = 1,
  setFilterOptions: any
) {
  axios.get(`http://localhost:3000/product/${page}`).then((value) => {
    const products = value.data.map((item: any) => {
      item.image = new Blob([new Uint8Array(item.image.data).buffer]);
      return item;
    });
    const name = products.map((item: any) => item.name);
    const category = Array.from(
      new Set(
        products
          .map((item: any) =>
            item.category.filter(
              (value: any) => value !== "example" && value !== "featured"
            )
          )
          .flat()
      )
    );
    const company = Array.from(
      new Set(products.map((item: any) => item.company))
    );
    setProduct(products);
    setFilterOptions({ name, category, company });
  });
}
export function getFeaturedProduct(setFeaturedProduct: any) {
  axios
    .get("http://localhost:3000/product/")
    .then((value) => {
      const products = value.data.map((item: any) => {
        item.image = new Blob([new Uint8Array(item.image.data).buffer]);
        return item;
      });
      setFeaturedProduct(products);
    })
    .catch((error) => console.error(error));
}

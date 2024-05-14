import axios from "axios";
import { FilterOption, Products } from "./types";

export function refreshAccessToken(refreshToken: string | null) {
  if (!refreshToken) return;
  axios
    .get("http://localhost:3000/auth/refresh", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    .then((value) => {
      localStorage.setItem("refreshToken", value.data.refreshToken);
      sessionStorage.setItem("accessToken", value.data.accessToken);
    })
    .catch((error) => console.error(error));
  return sessionStorage.getItem("accessToken");
}

export function getFeaturedProduct(
  setFeaturedProduct: (value: Products[]) => void
) {
  axios
    .get("http://localhost:3000/product/get")
    .then((value) => {
      setFeaturedProduct(value.data);
    })
    .catch((error) => console.error(error));
}

export function getFilterDetail(
  setFilterOptions: (value: FilterOption) => void
) {
  axios.get("http://localhost:3000/product/getfilter").then((value) => {
    const products = value.data;
    const name = products.map((item: any) => item.name);
    const category: string[] = Array.from(
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
    const company: string[] = Array.from(
      new Set(products.map((item: any) => item.company))
    );
    category.unshift("all");
    company.unshift("all");
    setFilterOptions({ name, category, company });
  });
}

export async function filterProduct(
  setProduct: (value: Products[]) => void,
  setTotal: (value: number) => void,
  page: number,
  categoryValue: string = "all",
  companyValue: string = "all",
  sortValue: string,
  priceValue: number,
  freeShipping: boolean,
  searchValue?: string
) {
  await axios
    .get(`http://localhost:3000/product/filter/`, {
      params: {
        page,
        searchValue,
        categoryValue,
        companyValue,
        sortValue,
        priceValue,
        freeShipping,
      },
    })
    .then((value) => {
      setTotal(value.data.total);
      setProduct(value.data.products);
    });
}

import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import "../styles/products.css";
import Product from "./Product";
import { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { filterProduct, getFilterDetail } from "../functions";
import { FilterOption, SortOption, type Products } from "../types";

export default function Products() {
  const priceRangeRef = useRef<HTMLSpanElement>(null);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>();
  const [companyValue, setCompanyValue] = useState<string>();
  const sortOptions: SortOption[] = [
    { id: 1, value: "name", label: "A-Z" },
    { id: 2, value: "-name", label: "Z-A" },
    { id: 3, value: "-price", label: "High" },
    { id: 4, value: "price", label: "Low" },
  ];
  const [sortValue, setSortValue] = useState<string>("name");
  const [priceValue, setPriceValue] = useState<number>(1000);
  const [freeShipping, setFreeShipping] = useState<boolean>(false);
  const [products, setProducts] = useState<Products[]>();
  const [page, setPage] = useState<number>(1);
  const [filterOptions, setFilterOptions] = useState<FilterOption>();
  const inputControlStyle = { m: 1, width: 240 };
  const inputSize = "small";
  useLayoutEffect(() => {
    getFilterDetail(setFilterOptions);
    filterProduct(
      setProducts,
      setTotal,
      page,
      categoryValue,
      companyValue,
      sortValue,
      priceValue,
      freeShipping,
      searchValue
    );
  }, [page]);
  const setFilter = (e: any) => {
    e.preventDefault();
    filterProduct(
      setProducts,
      setTotal,
      page,
      categoryValue,
      companyValue,
      sortValue,
      priceValue,
      freeShipping,
      searchValue
    );
  };
  const resetFilter = () => {
    const price = document.getElementById("price-range") as HTMLInputElement;
    setSearchValue(() => "");
    setCategoryValue(() => "");
    setCompanyValue("");
    setSortValue("name");
    setPriceValue(1000);
    setFreeShipping(false);
    console.log(categoryValue);
    if (priceRangeRef.current) priceRangeRef.current.textContent = "$1000";
    price.value = "1000";
    filterProduct(
      setProducts,
      setTotal,
      page,
      categoryValue,
      companyValue,
      sortValue,
      priceValue,
      freeShipping,
      searchValue
    );
    window.location.reload();
  };
  return products?.length ? (
    <div className="products">
      <Grid container className="filter-product">
        <Grid item container className="first-row">
          <FormControl sx={inputControlStyle}>
            <Autocomplete
              freeSolo
              id="search-product"
              options={filterOptions ? filterOptions.name : [""]}
              size={inputSize}
              value={searchValue}
              onChange={(_: any, value: string | null) =>
                setSearchValue(value ? value : "")
              }
              renderInput={(params) => <TextField {...params} label="search" />}
            ></Autocomplete>
          </FormControl>
          <FormControl sx={inputControlStyle}>
            <InputLabel id="category-label" size={inputSize}>
              Select Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="product-category"
              value={categoryValue ? categoryValue : ""}
              label="Select Category"
              size={inputSize}
              onChange={(e: any) => setCategoryValue(e.target.value)}
            >
              {filterOptions &&
                filterOptions.category.map((category: any) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={inputControlStyle}>
            <InputLabel id="company-label" size={inputSize}>
              Select Company
            </InputLabel>
            <Select
              labelId="company-label"
              id="product-category"
              value={companyValue ? companyValue : ""}
              label="Select Company"
              size={inputSize}
              onChange={(e: any) => setCompanyValue(e.target.value)}
            >
              {filterOptions &&
                filterOptions.company.map((company: any) => (
                  <MenuItem key={company} value={company}>
                    {company}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={inputControlStyle}>
            <InputLabel id="sort-label" size={inputSize}>
              Sort By
            </InputLabel>
            <Select
              labelId="sort-label"
              id="sort-category"
              value={sortValue ? sortValue : ""}
              label="Sort By"
              size={inputSize}
              onChange={(e: any) => {
                setSortValue(e.target.value);
              }}
            >
              {sortOptions &&
                sortOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item container className="second-row">
          <FormControl className="price-range" sx={inputControlStyle}>
            <div className="range-header">
              <span className="price-range-text">Select Price</span>
              <span
                id="price-range-value"
                ref={priceRangeRef}
                className="price-range-value"
              >
                ${priceValue}
              </span>
            </div>
            <input
              className="price-range-slider animate-none"
              type="range"
              name="price-range"
              id="price-range"
              min={0}
              defaultValue={1000}
              max={1000}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                priceRangeRef.current
                  ? (priceRangeRef.current.textContent = `$${e.target.value}`)
                  : null;
              }}
              onMouseUp={(e: any) => setPriceValue(parseInt(e.target.value))}
            />
            <div className="range-footer">
              <span className="min-price">0</span>
              <span className="max-price">Max : $1,000.00</span>
            </div>
          </FormControl>
          <FormControl className="free-shipping" sx={inputControlStyle}>
            <FormControlLabel
              value="top"
              control={
                <Checkbox
                  id="shipping-checkbox"
                  value={freeShipping}
                  checked={freeShipping}
                  onChange={() => setFreeShipping((prev: boolean) => !prev)}
                />
              }
              label="Free Shipping"
              labelPlacement="top"
            />
          </FormControl>
          <FormControl className="btn" sx={inputControlStyle}>
            <Button
              id="search-btn"
              className="search"
              onClick={setFilter}
              variant="contained"
            >
              Search
            </Button>
          </FormControl>
          <FormControl className="btn" sx={inputControlStyle}>
            <Button variant="contained" onClick={resetFilter}>
              Reset
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <div className="product-control">
        <div className="product-count">{total} Products</div>
        <div className="product-display-control">
          <button id="grid-gtn">
            <WindowIcon />
          </button>
          <button id="line-btn">
            <DensityMediumIcon />
          </button>
        </div>
      </div>
      <Grid
        className="product-grid-container"
        justifyContent="center"
        alignItems="center"
        container
        gap={2}
      >
        {products &&
          products.map((item: any) => <Product key={item.name} item={item} />)}
      </Grid>
      {total && products?.length && (
        <Pagination
          className="page"
          count={Math.ceil(total / 9)}
          shape="rounded"
          onChange={(_: any, page: number) => setPage(page)}
        />
      )}
    </div>
  ) : (
    <div className="home-content-container">
      <CircularProgress className="home-loading" color="secondary" />
    </div>
  );
}

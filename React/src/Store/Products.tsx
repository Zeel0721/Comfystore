import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import "../styles/products.css";
import Product from "./Product";

export default function Products() {
  const selectCategory = () => {};
  const inputControlStyle = { m: 1, width: 240 };
  const inputSize = "small";
  const products = [
    {
      pic: `\\images\\Avant-Garde Lamp.webp`,
      name: "Avant-Garde Lamp",
      price: 179.99,
    },
    {
      pic: `\\images\\Chic Chair.webp`,
      name: "Chic Chair",
      price: 339.99,
    },
    {
      pic: `\\images\\Coffee Table.jpeg`,
      name: "Coffee Table",
      price: 179.99,
    },
  ];

  return (
    <div className="products">
      <Grid container className="filter-product">
        <Grid item container className="first-row">
          <FormControl sx={inputControlStyle}>
            <Autocomplete
              freeSolo
              id="search-product"
              options={["hey"]}
              size={inputSize}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            ></Autocomplete>
          </FormControl>
          <FormControl sx={inputControlStyle}>
            <InputLabel id="category-label" size={inputSize}>
              Select Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="product-category"
              value={""}
              label="Select Category"
              size={inputSize}
              onChange={selectCategory}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Tables"}>Tables</MenuItem>
              <MenuItem value={"Chairs"}>Chairs</MenuItem>
              <MenuItem value={"Kids"}>Kids</MenuItem>
              <MenuItem value={"Sofas"}>Sofas</MenuItem>
              <MenuItem value={"Beds"}>Beds</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={inputControlStyle}>
            <InputLabel id="company-label" size={inputSize}>
              Select Company
            </InputLabel>
            <Select
              labelId="company-label"
              id="product-category"
              value={""}
              label="Select Company"
              size={inputSize}
              onChange={selectCategory}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Modenza"}>Modenza</MenuItem>
              <MenuItem value={"Luxora"}>Luxora</MenuItem>
              <MenuItem value={"Artifex"}>Artifex</MenuItem>
              <MenuItem value={"Comfora"}>Comfora</MenuItem>
              <MenuItem value={"Homestead"}>Homestead</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={inputControlStyle}>
            <InputLabel id="sort-label" size={inputSize}>
              Sort By
            </InputLabel>
            <Select
              labelId="sort-label"
              id="sort-category"
              value={""}
              label="Sort By"
              size={inputSize}
              onChange={selectCategory}
            >
              <MenuItem value={"A-Z"}>A-Z</MenuItem>
              <MenuItem value={"Z-A"}>Z-A</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item container className="second-row">
          <FormControl className="price-range" sx={inputControlStyle}>
            <div className="range-header">
              <span className="price-range-text">Select Price</span>
              <span className="price-range-value">$1000</span>
            </div>
            <Slider
              className="price-range-slider"
              defaultValue={1000}
              min={0}
              max={1000}
              color="secondary"
            />
            <div className="range-footer">
              <span className="min-price">0</span>
              <span className="max-price">1000</span>
            </div>
          </FormControl>
          <FormControl className="free-shipping" sx={inputControlStyle}>
            <FormControlLabel
              value="top"
              control={<Checkbox id="shipping-checkbox" />}
              label="Free Shipping"
              labelPlacement="top"
            />
          </FormControl>
          <FormControl className="btn" sx={inputControlStyle}>
            <Button id="search-btn" variant="contained">
              Search
            </Button>
          </FormControl>
          <FormControl className="btn" sx={inputControlStyle}>
            <Button variant="contained">Reset</Button>
          </FormControl>
        </Grid>
      </Grid>
      <div className="product-control">
        <div className="product-count">22 Products</div>
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
        columnGap={2}
      >
        {products.map((item) => (
          <Product key={item.name} item={item} />
        ))}
      </Grid>
    </div>
  );
}

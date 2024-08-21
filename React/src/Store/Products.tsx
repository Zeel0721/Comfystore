import WindowIcon from "@mui/icons-material/Window";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import "../styles/products.css";
import Product from "./Product";
import { useEffect, useState } from "react";
import { SortOption, type Products } from "../types";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Slider,
} from "antd";
import {
  useGetFilterQuery,
  useGetProductMutation,
} from "../Features/productApi";
import { Loading } from "./Loading";

const { Search } = Input;

export default function Products() {
  const [form] = Form.useForm();
  const sortOptions: SortOption[] = [
    { id: 1, value: "name", label: "A-Z" },
    { id: 2, value: "-name", label: "Z-A" },
    { id: 3, value: "-price", label: "High" },
    { id: 4, value: "price", label: "Low" },
  ];
  const [products, setProducts] = useState<{
    products: Products[];
    total: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const { data: filterData } = useGetFilterQuery();
  const [getProduct] = useGetProductMutation();

  useEffect(() => {
    callGetProducts();
  }, [page]);

  const callGetProducts = async () => {
    const filter = form.getFieldsValue();
    await getProduct({ ...filter, page }).then((products) =>
      setProducts(products.data)
    );
  };

  const setFilter = async (filter: any) => {
    await getProduct({ ...filter, page }).then((products) =>
      setProducts(products.data)
    );
  };
  const resetFilter = async () => {
    form.resetFields();
    setPage(1);
    callGetProducts();
  };
  return filterData !== undefined ? (
    <div className="flex flex-col justify-center items-center products">
      <Form
        form={form}
        name="filter"
        onFinish={setFilter}
        className="mt-12 w-3/4 grid grid-cols-4 justify-items-center py-6 gap-8 rounded-lg filter-product"
      >
        <Form.Item name="search">
          <Search placeholder="input search text" enterButton size="middle" />
        </Form.Item>
        <Form.Item name="category" className="w-52">
          <Select placeholder="Select Category" size="middle">
            {filterData.category.map((category: any) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="company" className="w-52">
          <Select placeholder="Select Company" size="middle">
            {filterData.company.map((company: any) => (
              <Select.Option key={company} value={company}>
                {company}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="sort" className="w-52">
          <Select placeholder="Select Order" size="middle">
            {sortOptions &&
              sortOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="price" initialValue={1000} className="w-52">
          <Slider min={0} max={1000} />
        </Form.Item>
        <Form.Item name="freeShipping" label="Free Shipping">
          <Checkbox />
        </Form.Item>
        <Form.Item className="btn">
          <Button className="w-52" id="search-btn" htmlType="submit">
            Search
          </Button>
        </Form.Item>
        <Form.Item className="btn">
          <Button className="w-52" htmlType="button" onClick={resetFilter}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <div className="w-3/4 mt-10 flex justify-between font-bold pb-4 border-b product-control">
        <div>{products?.total} Products</div>
        <div className="product-display-control">
          <button id="grid-gtn">
            <WindowIcon />
          </button>
          <button id="line-btn">
            <DensityMediumIcon />
          </button>
        </div>
      </div>
      <Row
        className="w-10/12 my-14 px-8"
        justify="space-around"
        align="middle"
        gutter={[0, 30]}
      >
        {products &&
          products.products.map((item: any) => (
            <Product key={item.name} item={item} />
          ))}
      </Row>
      <Pagination
        className="py-8"
        total={products?.total}
        current={page}
        onChange={(page: number) => setPage(page)}
      />
    </div>
  ) : (
    <Loading />
  );
}

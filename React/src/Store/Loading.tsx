import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Loading = () => (
  <div className="home-content-container">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </div>
);

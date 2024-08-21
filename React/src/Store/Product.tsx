import { Flex } from "antd";

interface item {
  image: any;
  name: string;
  price: number;
}
export default function Product({ item }: { item: item }) {
  return (
    <Flex
      vertical
      justify="space-around"
      align="center"
      className="pt-2 pb-6 shadow-lg rounded-2xl item-container"
    >
      <div>
        <img
          className="w-80 h-48 rounded-xl object-cover"
          src={`data:image/png;base64,${item.image}`}
        />
      </div>
      <div className="pt-6 text-xl font-bold">{item.name}</div>
      <div className="pt-3 font-medium">${item.price}</div>
    </Flex>
  );
}

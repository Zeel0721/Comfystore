import { Grid } from "@mui/material";

interface item {
  pic: string;
  name: string;
  price: number;
}
export default function Product({ item }: { item: item }) {
  return (
    <Grid
      className="item-container"
      direction="column"
      justifyContent="center"
      alignItems="center"
      item
      rowGap={3}
      container
    >
      <Grid item className="product-image">
        <img src={item.pic} />
      </Grid>
      <Grid item>{item.name}</Grid>
      <Grid item>${item.price}</Grid>
    </Grid>
  );
}

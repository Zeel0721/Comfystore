import { Grid } from "@mui/material";

interface item {
  image: any;
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
      container
    >
      <Grid item className="product-image">
        <img src={`data:image/png;base64,${item.image}`} />
      </Grid>
      <Grid item className="product-name">
        {item.name}
      </Grid>
      <Grid item className="product-price">
        ${item.price}
      </Grid>
    </Grid>
  );
}

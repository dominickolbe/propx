import Grid from "@mui/joy/Grid";
import { Property } from "propx-models/types";
import { PropertyCard } from "../PropertyCard";

export const PropertyList = (props: { properties: Property[] }) => {
  const { properties } = props;
  return (
    <Grid container spacing={3}>
      {properties.map((property) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={property._id}>
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
};

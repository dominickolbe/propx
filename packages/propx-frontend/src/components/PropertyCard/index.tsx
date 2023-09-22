import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Property } from "propx-models/types";
import { API_BASE } from "../../constants";
import { locale, numberFormatConfig } from "../../utils";

export const PropertyCard = (props: { property: Property }) => {
  const { property } = props;
  return (
    <Card variant="soft" sx={{ height: "100%" }}>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={`${API_BASE}${property.image}`} loading="lazy" alt="" />
      </AspectRatio>
      <Typography
        level="title-md"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineClamp: "3",
          "-webkit-line-clamp": "3",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
        }}
      >
        {property.address}
      </Typography>
      <CardOverflow sx={{ mt: "auto" }}>
        <Divider inset="none" />
        <CardContent
          orientation="horizontal"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography level="body-sm">
            {formatDistanceToNow(parseISO(property.createdAt))}
          </Typography>
          <Typography fontSize="lg" fontWeight="lg" sx={{ ml: "auto" }}>
            {property.price.toLocaleString(locale, numberFormatConfig)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

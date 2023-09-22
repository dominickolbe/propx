import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";

export const CardLoading = () => (
  <Card variant="soft">
    <AspectRatio ratio="16/9">
      <Skeleton variant="overlay" animation="wave">
        <img
          alt=""
          src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        />
      </Skeleton>
    </AspectRatio>
    <Typography level="body-sm">
      <Skeleton>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries.
      </Skeleton>
    </Typography>
    <Typography fontSize="lg" fontWeight="lg" sx={{ ml: "auto" }}>
      <Skeleton>£2000</Skeleton>
    </Typography>
  </Card>
);

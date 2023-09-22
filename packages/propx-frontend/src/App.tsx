import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import { PropertyList } from "./components/PropertyList";
import { usePropertyStore } from "./store";
import { useEffect, useState } from "react";
import Typography from "@mui/joy/Typography";
import { CardLoading } from "./components/CardLoading";
import Grid from "@mui/joy/Grid";
import { getRandomNumber } from "./utils";
import { BasicModalDialog } from "./components/BasicModalDialog";
import { PropertyCreate } from "propx-models/types";
import Alert from "@mui/joy/Alert";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
function App() {
  const properties = usePropertyStore((state) => state.properties);
  const loadPropertyData = usePropertyStore((state) => state.load);
  const isLoading = usePropertyStore((state) => state.isLoading);
  const add = usePropertyStore((state) => state.add);

  // random number of placeholder cards while data is being loaded
  const loadingCardsNumber = getRandomNumber(1, 3);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    loadPropertyData();
  }, [loadPropertyData]);

  const onAddNewProperty = (property: PropertyCreate) => {
    add({
      ...property,
      _id: getRandomNumber(1000, 5000).toFixed(0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <Box
        sx={{ display: "flex", minHeight: "100dvh" }}
        justifyContent={"center"}
      >
        <Box
          component="main"
          className="MainContent"
          maxWidth={"xl"}
          sx={{
            padding: {
              xs: 2,
              md: 6,
            },
            mt: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              my: 1,
              gap: 1,
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mb: { xs: 4, sm: 6 },
            }}
          >
            <Typography level="h2">Properties</Typography>
            <BasicModalDialog onAddNewProperty={(e) => onAddNewProperty(e)} />
          </Box>

          {isLoading && !properties.length ? (
            <Grid container spacing={3}>
              {[...Array(loadingCardsNumber)].map((e, i) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={i}>
                  <CardLoading />
                </Grid>
              ))}
            </Grid>
          ) : (
            <PropertyList properties={properties} />
          )}
          {showAlert && (
            <Alert
              variant="plain"
              color="success"
              sx={{
                position: "fixed",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              startDecorator={<FileDownloadDoneOutlinedIcon color="success" />}
              size="md"
            >
              New Property added
            </Alert>
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;

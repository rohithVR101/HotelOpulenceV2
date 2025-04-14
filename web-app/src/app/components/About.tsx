import { Button, Container, CssBaseline } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

export default function About() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography level="h1" component="h1">
          Indulge in Opulence. Book Now.
        </Typography>
        <Typography level="body-lg" sx={{ my: 2 }}>
          Experience luxury and comfort in the heart of the city.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", my: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography level="h2" component="h2">
            Cozy Rooms
          </Typography>
          <Typography level="body-md">
            Enjoy our well-furnished rooms with all modern amenities.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography level="h2" component="h2">
            Fine Dining
          </Typography>
          <Typography level="body-md">
            Savor delicious meals prepared by top chefs.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography level="h2" component="h2">
            Great Location
          </Typography>
          <Typography level="body-md">
            Located in the heart of the city, close to all attractions.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

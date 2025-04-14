import { Button, Container, CssBaseline } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles/";
import RoomSearch from "./RoomSearch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CTA() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "fill",
            zIndex: -1,
          }}
        >
          <source src="/lobby.mp4" type="video/mp4" />
        </video>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            WebkitBackgroundFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            color: " #fff",
          }}
        >
          <Typography level="h1" component="h1">
            Indulge in Opulence. Book Now.
          </Typography>
          <Typography level="body-lg" sx={{ my: 2 }}>
            Experience luxury and comfort in the heart of the city.
          </Typography>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <RoomSearch searchType="initial" />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            fontSize: "large",
          }}
          onClick={scrollToBottom}
        >
          <ExpandMoreIcon />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

import Header from "@/app/components/Header";
import Footer from "../components/Footer";
import { Box, Typography, Grid } from "@mui/joy";
import styles from "./page.module.css";
import Image from "next/image";

function About() {
  const features = [
    {
      title: "Prime Location",
      description:
        "Nestled in the heart of the city, Hotel Opulence offers easy access to major attractions, shopping districts, and business centers.",
      image: "/outside.jpg",
    },
    {
      title: "Seamless Check-in/out",
      description:
        "Experience our streamlined arrival and departure process with dedicated concierge service available 24/7.",
      image: "/lobby.jpg",
    },
    {
      title: "Indoor Dining",
      description:
        "Savor exquisite cuisine at our signature restaurants featuring international and local delicacies.",
      image: "/indoor_dining.jpg",
    },
    {
      title: "Poolside Dining",
      description:
        "Enjoy casual meals and refreshing beverages at our luxury poolside restaurant with stunning views.",
      image: "/poolside_dining.jpg",
    },
    {
      title: "Luxury Pool",
      description:
        "Immerse yourself in our temperature-controlled pool overlooking the city skyline.",
      image: "/pool.jpg",
    },
    {
      title: "Room Service",
      description:
        "24/7 in-room dining service offering a curated menu of international cuisine and local specialties.",
      image: "/room_service.jpg",
    },
  ];

  return (
    <>
      <Header />
      <Box className={styles.container}>
        <Typography level="h1" className={styles.title}>
          About Hotel Opulence
        </Typography>
        <Typography level="body-lg" className={styles.intro}>
          Welcome to Hotel Opulence, where luxury meets exceptional service. Our
          commitment to excellence ensures an unforgettable stay in the heart of
          the city.
        </Typography>

        {features.map((feature, index) => (
          <Grid
            key={index}
            container
            spacing={4}
            className={styles.featureRow}
            sx={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
          >
            <Grid xs={12} md={6} className={styles.featureImage}>
              <Image
                src={feature.image}
                alt={feature.title}
                loading="lazy"
                width={500}
                height={300}
                className={styles.image}
              />
            </Grid>
            <Grid xs={12} md={6} className={styles.featureContent}>
              <Typography level="h3" sx={{ mb: 2 }}>
                {feature.title}
              </Typography>
              <Typography level="body-md">{feature.description}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Footer />
    </>
  );
}
export default About;

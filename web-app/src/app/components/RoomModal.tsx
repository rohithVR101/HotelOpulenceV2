import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import RoomDetails from "@/model/RoomDetails";
import { Box, Divider } from "@mui/joy";
import Image from "next/image";
import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BathtubIcon from "@mui/icons-material/Bathtub";
import NewspaperIcon from "@mui/icons-material/Newspaper";

interface RoomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  room: RoomDetails;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
  wifi: <WifiIcon />,
  tv: <TvIcon />,
  tv2: <TvIcon />,
  ac: <AcUnitIcon />,
  "room-service": <RoomServiceIcon />,
  laundry: <LocalLaundryServiceIcon />,
  parking: <LocalParkingIcon />,
  "mini-fridge": <KitchenIcon />,
  bathtub: <BathtubIcon />,
  newspaper: <NewspaperIcon />,
};

const amenityLabels: { [key: string]: string } = {
  wifi: "Free WiFi",
  tv: "1 Smart TV with OTTs",
  tv2: "1 Smart TV with Cable",
  ac: "AC",
  "room-service": "Room Service",
  laundry: "Laundry",
  parking: "Parking",
  "mini-fridge": "Mini Fridge",
  bathtub: "Bathtub",
  newspaper: "Daily Newspaper",
};

export default function RoomModal({ open, setOpen, room }: RoomModalProps) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 2 }}
        >
          {room.name}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Image
            src={room.image}
            alt={room.name}
            width={460}
            height={280}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </Box>

        <Typography level="body-md" sx={{ mb: 2 }}>
          {room.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BedIcon />
            <Typography level="body-sm">{room.bedType}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon />
            <Typography level="body-sm">Sleeps {room.capacity}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SquareFootIcon />
            <Typography level="body-sm">{room.size} sq ft</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AttachMoneyIcon />
            <Typography level="body-sm">${room.cost}/night</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography level="title-sm" sx={{ mb: 2 }}>
          Amenities
        </Typography>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}
        >
          {room.amenities.map((amenity) => (
            <Box
              key={amenity}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {amenityIcons[amenity]}
              <Typography level="body-sm">{amenityLabels[amenity]}</Typography>
            </Box>
          ))}
        </Box>
      </Sheet>
    </Modal>
  );
}

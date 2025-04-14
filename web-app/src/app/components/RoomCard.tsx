import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import RoomDetails from "@/model/RoomDetails";
import Image from "next/image";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import {
  AccordionGroup,
  accordionClasses,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import RoomModal from "./RoomModal";
import { useState } from "react";

interface RoomCardProps {
  cardType: "option" | "selected";
  roomDetails: RoomDetails;
}

export default function RoomCard({ cardType, roomDetails }: RoomCardProps) {
  const store = useUserStore();
  const router = useRouter();
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);

  const openCloseModal = () => {
    setDetailsModalOpen(!detailsModalOpen);
  };

  return (
    <>
      <Card sx={{ width: 320 }}>
        <div>
          <Typography level="title-lg">
            {Math.ceil(store.userSelection.trip.count / roomDetails.capacity)} x{" "}
            {roomDetails.name}
          </Typography>
          {cardType === "option" && (
            <Typography level="body-sm">{roomDetails.description}</Typography>
          )}
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
          ></IconButton>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Image
            src={roomDetails.image}
            loading="lazy"
            alt=""
            width={320}
            height={200}
            onClick={() => {
              setDetailsModalOpen(true);
            }}
          />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            {cardType === "selected" && store.userSelection && (
              <Typography level="body-sm">
                Arrival:{" "}
                {new Date(store.userSelection.trip.fromDate).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </Typography>
            )}
            {cardType === "selected" && store.userSelection && (
              <Typography level="body-sm">
                Departure:{" "}
                {new Date(store.userSelection.trip.toDate).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </Typography>
            )}
            {cardType === "selected" && store.userSelection && (
              <Typography level="body-sm">
                Number of Nights:{" "}
                {Math.ceil(
                  (new Date(store.userSelection.trip.toDate).getTime() -
                    new Date(store.userSelection.trip.fromDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </Typography>
            )}
            {cardType === "selected" && (
              <Typography level="body-sm">Check-in Time : 2:00 PM</Typography>
            )}
            {cardType === "selected" && (
              <Typography level="body-sm">Check-out Time : 12:00 AM</Typography>
            )}
            {cardType === "selected" ? (
              <AccordionGroup
                sx={(theme) => ({
                  maxWidth: 400,
                  [`& .${accordionClasses.root}`]: {
                    marginTop: "0.5rem",
                    transition: "0.2s ease",
                    '& button:not([aria-expanded="true"])': {
                      transition: "0.2s ease",
                      paddingBottom: "0.625rem",
                    },
                    "& button:hover": {
                      background: "transparent",
                    },
                  },
                  [`& .${accordionClasses.root}.${accordionClasses.expanded}`]:
                    {
                      bgcolor: "background.level1",
                      borderRadius: "md",
                      borderBottom: "1px solid",
                      borderColor: "background.level2",
                    },
                  '& [aria-expanded="true"]': {
                    boxShadow: `inset 0 -1px 0 ${theme.vars.palette.divider}`,
                  },
                })}
              >
                <Accordion>
                  <AccordionSummary>
                    <Typography level="body-xs">Total price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      $
                      {roomDetails.cost *
                        Math.ceil(
                          store.userSelection.trip.count / roomDetails.capacity
                        )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography level="body-sm">
                      Nightly Cost : ${roomDetails.cost} x{" "}
                      {Math.ceil(
                        store.userSelection.trip.count / roomDetails.capacity
                      )}{" "}
                      = $
                      {roomDetails.cost *
                        Math.ceil(
                          store.userSelection.trip.count / roomDetails.capacity
                        )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            ) : (
              <>
                <Typography level="body-xs">Total price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  $
                  {roomDetails.cost *
                    Math.ceil(
                      store.userSelection.trip.count / roomDetails.capacity
                    )}
                </Typography>
              </>
            )}
          </div>
          {cardType === "option" && (
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              onClick={() => {
                store.setUserSelection({
                  ...store.userSelection,
                  room: roomDetails,
                  roomCount: Math.ceil(
                    store.userSelection.trip.count / roomDetails.capacity
                  ),
                  totalCost:
                    roomDetails.cost *
                    Math.ceil(
                      store.userSelection.trip.count / roomDetails.capacity
                    ),
                });
                router.push("/booking");
              }}
            >
              Book now
            </Button>
          )}
        </CardContent>
      </Card>
      <RoomModal
        open={detailsModalOpen}
        setOpen={openCloseModal}
        room={roomDetails}
      />
    </>
  );
}

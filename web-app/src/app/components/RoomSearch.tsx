"use client";

import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import { useRef, useState } from "react";
import { Button, Stack } from "@mui/joy";
import Link from "next/link";
import { useUserStore } from "@/store/UserStore";
import TripDetails from "@/model/TripDetails";

interface TypeProp {
  searchType: "initial" | "update";
}

export default function RoomSearch(props: TypeProp) {
  const userStore = useUserStore();
  const previousSearch: TripDetails = userStore.userSelection.trip;
  const [fromDate, setFromDate] = useState(previousSearch.fromDate);
  const [toDate, setToDate] = useState(previousSearch.toDate);
  const [count, setCount] = useState(previousSearch.count);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function getToday(): string {
    return new Date().toJSON().slice(0, 10);
  }

  function getChosenFromDate(): string {
    if (fromDate) {
      var from = new Date(fromDate);
      from.setDate(from.getDate() + 1);
      return from.toJSON().slice(0, 10);
    } else {
      return new Date().toJSON().slice(0, 10);
    }
  }

  function getAllowedBookingDate(): string {
    var today = new Date();
    today.setDate(today.getDate() + 90);
    return today.toJSON().slice(0, 10);
  }

  return (
    <Box
      sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}
    >
      <Stack spacing={1.5} sx={{ minWidth: 300 }}>
        <FormLabel>From</FormLabel>
        <Input
          type="date"
          value={fromDate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFromDate(event?.target?.value)
          }
          slotProps={{
            input: {
              min: getToday(),
              max: getAllowedBookingDate(),
            },
          }}
        />
      </Stack>
      <Stack spacing={1.5} sx={{ minWidth: 300 }}>
        <FormLabel>To</FormLabel>
        <Input
          type="date"
          value={toDate}
          disabled={!fromDate || fromDate.length === 0}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setToDate(event?.target?.value)
          }
          slotProps={{
            input: {
              min: getChosenFromDate(),
              max: getAllowedBookingDate(),
            },
          }}
        />
      </Stack>
      <Stack spacing={1.5} sx={{ minWidth: 300 }}>
        <FormLabel>People</FormLabel>
        <Input
          type="number"
          value={count}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCount(parseInt(event?.target?.value))
          }
          slotProps={{
            input: {
              ref: inputRef,
              min: 1,
              max: 10,
              step: 1,
            },
          }}
        />
      </Stack>

      <Link href={"/rooms"}>
        <Button
          variant="solid"
          color="primary"
          size="lg"
          sx={{ marginTop: "2rem" }}
          onClick={() => {
            userStore.setUserSelection({
              ...userStore.userSelection,
              trip: {
                fromDate: fromDate,
                toDate: toDate,
                count: count,
              },
            });
          }}
        >
          {props.searchType === "initial" ? "Book Now" : "Update"}
        </Button>
      </Link>
    </Box>
  );
}

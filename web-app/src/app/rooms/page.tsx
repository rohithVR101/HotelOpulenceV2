"use client";
import Room from "../components/RoomCard";
import React, { useState } from "react";
import SearchBox from "@/app/components/SearchBox";
import RoomDetails, { AmenityType } from "@/model/RoomDetails";
import Header from "@/app/components/Header";
import RoomSearch from "../components/RoomSearch";
import RoomCard from "../components/RoomCard";
import styles from "./page.module.css";
import BookingStages from "../components/BookingStages";

export default function RoomList() {
  const allRooms = [
    {
      id: "1",
      name: "Standard Room",
      cost: 100,
      description:
        "Cozy room with one queen bed, ideal for solo travelers or couples.",
      image: "/standard.jpg",
      capacity: 2,
      size: 500,
      bedType: "1 x Queen Bed",
      amenities: [
        "wifi",
        "ac",
        "tv",
        "room-service",
        "parking",
      ] as AmenityType[],
    },
    {
      id: "2",
      name: "Deluxe Room",
      cost: 150,
      description:
        "Spacious room with a king bed, featuring a work desk and a mini-fridge.",
      image: "/deluxe.jpg",
      capacity: 3,
      size: 700,
      bedType: "1 x King Bed",
      amenities: [
        "wifi",
        "ac",
        "tv",
        "mini-fridge",
        "newspaper",
        "room-service",
        "parking",
      ] as AmenityType[],
    },
    {
      id: "3",
      name: "Suite",
      cost: 200,
      description:
        "Luxurious suite with a separate living area, a king bed in the bedroom, and a bathtub.",
      image: "/suite.jpg",
      capacity: 4,
      size: 1200,
      bedType: "1 x King Bed + 1 Sofa Bed",
      amenities: [
        "wifi",
        "ac",
        "tv",
        "tv2",
        "mini-fridge",
        "bathtub",
        "newspaper",
        "room-service",
        "laundry",
        "parking",
      ] as AmenityType[],
    },
  ];
  const [hotelRooms, setHotelRooms] = useState<RoomDetails[]>(allRooms);

  const searchFilterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHotelRooms(
      allRooms.filter((room) =>
        room.name.toLowerCase().includes(event?.target?.value?.toLowerCase())
      )
    );
  };

  return (
    <>
      <Header />
      <BookingStages currentStep="selection" />
      <main className={styles.container}>
        <section className={styles.searchSection}>
          <RoomSearch searchType="update" />
          <SearchBox
            className="search-room-type"
            placeholder="Filter room types…"
            onChangeHandler={searchFilterHandler}
          />
        </section>
        <div className={styles.roomGrid}>
          {hotelRooms.map((room) => {
            return (
              <RoomCard key={room.id} cardType="option" roomDetails={room} />
            );
          })}
        </div>
      </main>
    </>
  );
}

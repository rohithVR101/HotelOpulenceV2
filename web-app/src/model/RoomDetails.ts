export type AmenityType =
    | "wifi"
    | "tv"
    | "tv2"
    | "ac"
    | "room-service"
    | "laundry"
    | "parking"
    | "mini-fridge"
    | "bathtub"
    | "newspaper";

export default interface RoomDetails {
    id: string;
    name: string;
    cost: number;
    description: string;
    image: string;
    capacity: number;
    bedType: string;
    size: number;
    amenities: AmenityType[];
}
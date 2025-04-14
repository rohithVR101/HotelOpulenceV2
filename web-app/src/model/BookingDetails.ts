import RoomDetails from "./RoomDetails";
import TripDetails from "./TripDetails";

export default interface BookingDetails {
    trip: TripDetails;
    room: RoomDetails;
    roomCount: number;
    totalCost: number;
}
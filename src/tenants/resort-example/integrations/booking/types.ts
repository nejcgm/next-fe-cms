export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  priceFrom: number;
  image: string;
  gallery: string[];
  amenities: string[];
  maxGuests: number;
  size: number;
  bedType: string;
}

export interface Availability {
  date: string;
  available: boolean;
  price: number;
}

export interface BookingRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface BookingResponse {
  bookingId: string;
  status: "confirmed" | "pending" | "failed";
  totalPrice: number;
  confirmationCode: string;
}

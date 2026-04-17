import type { Room, Availability, BookingResponse } from "./types";

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Alpine Suite",
    slug: "alpine-suite",
    description: "Our flagship suite with panoramic mountain views, featuring a king-size bed, fireplace, and private balcony.",
    shortDescription: "Panoramic mountain views with fireplace",
    priceFrom: 350,
    image: "/images/rooms/alpine-suite.jpg",
    gallery: [],
    amenities: ["King bed", "Fireplace", "Balcony", "Jacuzzi", "WiFi"],
    maxGuests: 2,
    size: 55,
    bedType: "King",
  },
  {
    id: "room-2",
    name: "Forest Room",
    slug: "forest-room",
    description: "Cozy room nestled among the pines, perfect for nature lovers seeking tranquility.",
    shortDescription: "Cozy retreat among the pines",
    priceFrom: 180,
    image: "/images/rooms/forest-room.jpg",
    gallery: [],
    amenities: ["Queen bed", "Forest view", "WiFi", "Breakfast included"],
    maxGuests: 2,
    size: 32,
    bedType: "Queen",
  },
  {
    id: "room-3",
    name: "Family Chalet",
    slug: "family-chalet",
    description: "Spacious chalet with two bedrooms, perfect for families or groups of friends.",
    shortDescription: "Spacious two-bedroom family chalet",
    priceFrom: 420,
    image: "/images/rooms/family-chalet.jpg",
    gallery: [],
    amenities: ["2 bedrooms", "Kitchen", "Living room", "WiFi", "Parking"],
    maxGuests: 5,
    size: 85,
    bedType: "King + Twin",
  },
  {
    id: "room-4",
    name: "Deluxe Double",
    slug: "deluxe-double",
    description: "Elegant double room with modern amenities and garden views.",
    shortDescription: "Elegant room with garden views",
    priceFrom: 150,
    image: "/images/rooms/deluxe-double.jpg",
    gallery: [],
    amenities: ["Queen bed", "Garden view", "WiFi", "Mini bar"],
    maxGuests: 2,
    size: 28,
    bedType: "Queen",
  },
  {
    id: "room-5",
    name: "Panorama Loft",
    slug: "panorama-loft",
    description: "Stunning loft apartment with floor-to-ceiling windows and 180-degree mountain views.",
    shortDescription: "Stunning loft with 180° mountain views",
    priceFrom: 290,
    image: "/images/rooms/panorama-loft.jpg",
    gallery: [],
    amenities: ["King bed", "Kitchenette", "Balcony", "WiFi", "Workspace"],
    maxGuests: 2,
    size: 45,
    bedType: "King",
  },
  {
    id: "room-6",
    name: "Cozy Single",
    slug: "cozy-single",
    description: "Comfortable single room ideal for solo travelers.",
    shortDescription: "Comfortable room for solo travelers",
    priceFrom: 95,
    image: "/images/rooms/cozy-single.jpg",
    gallery: [],
    amenities: ["Single bed", "Garden view", "WiFi", "Breakfast included"],
    maxGuests: 1,
    size: 18,
    bedType: "Single",
  },
];

export async function getMockRooms(): Promise<Room[]> {
  return mockRooms;
}

export async function getMockRoomBySlug(slug: string): Promise<Room | null> {
  return mockRooms.find((r) => r.slug === slug) ?? null;
}

export async function checkMockAvailability(): Promise<Availability[]> {
  return [
    { date: "2026-04-01", available: true, price: 250 },
    { date: "2026-04-02", available: true, price: 250 },
    { date: "2026-04-03", available: false, price: 0 },
    { date: "2026-04-04", available: true, price: 280 },
    { date: "2026-04-05", available: true, price: 280 },
  ];
}

export async function createMockBooking(): Promise<BookingResponse> {
  return {
    bookingId: "BK-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    status: "confirmed",
    totalPrice: 750,
    confirmationCode: "CONF-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
  };
}

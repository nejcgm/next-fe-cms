import { apiClient } from "@shared/lib/api-client";
import { env } from "@/env";
import type { Availability, BookingRequest, BookingResponse, Room } from "./types";

const BASE_URL = env.RESORT_BOOKING_API_URL ?? "https://api.booking-provider.com";
const API_KEY = env.RESORT_BOOKING_API_KEY ?? "";

export async function getRooms(): Promise<Room[]> {
  try {
    return await apiClient(`${BASE_URL}/rooms`, {
      headers: { "X-API-Key": API_KEY },
    });
  } catch (error) {
    console.error("Booking: getRooms failed", error);
    return [];
  }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  try {
    const rooms = await getRooms();
    return rooms.find((r) => r.slug === slug) ?? null;
  } catch (error) {
    console.error("Booking: getRoomBySlug failed", error);
    return null;
  }
}

export async function checkAvailability(
  from: string,
  to: string,
  roomType?: string
): Promise<Availability[]> {
  try {
    return await apiClient(`${BASE_URL}/availability`, {
      params: { from, to, roomType },
      headers: { "X-API-Key": API_KEY },
    });
  } catch (error) {
    console.error("Booking: checkAvailability failed", error);
    return [];
  }
}

export async function createBooking(data: BookingRequest): Promise<BookingResponse | null> {
  try {
    return await apiClient(`${BASE_URL}/bookings`, {
      method: "POST",
      body: data,
      headers: { "X-API-Key": API_KEY },
    });
  } catch (error) {
    console.error("Booking: createBooking failed", error);
    return null;
  }
}

export type FlightDateError =
  "MISSING" | "PAST_DEPARTURE" | "RETURN_BEFORE_DEPARTURE";

export type HotelDateError = "MISSING" | "CHECKOUT_NOT_AFTER_CHECKIN";

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** REQ-FUNC-013 — 과거 출발일, 귀국일<출발일을 차단한다. */
export function validateFlightDates(
  departureDate: string,
  returnDate: string,
  today: string = todayIso(),
): FlightDateError | null {
  if (!departureDate || !returnDate) {
    return "MISSING";
  }
  if (departureDate < today) {
    return "PAST_DEPARTURE";
  }
  if (returnDate < departureDate) {
    return "RETURN_BEFORE_DEPARTURE";
  }
  return null;
}

/** REQ-FUNC-021 — 체크아웃이 체크인보다 뒤여야 한다(같은 날짜도 차단). */
export function validateHotelDates(
  checkInDate: string,
  checkOutDate: string,
): HotelDateError | null {
  if (!checkInDate || !checkOutDate) {
    return "MISSING";
  }
  if (checkOutDate <= checkInDate) {
    return "CHECKOUT_NOT_AFTER_CHECKIN";
  }
  return null;
}

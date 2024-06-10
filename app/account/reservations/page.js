import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title : "reservations"
}

export default async function Page() {
  // CHANGE
  const session = await auth();
  const guest =await getGuest(session.user.email);
const bookings = await getBookings(guest.id)
  // const bookings = [];

  return (
    <div> 
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

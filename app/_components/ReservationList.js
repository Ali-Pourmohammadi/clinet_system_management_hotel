'use client';
import ReservationCard from "./ReservationCard";
import { useOptimistic } from 'react';
import {deleteReservation} from '../_lib/actions';

export default function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currBookings , bookingId) => {
    return currBookings.filter(booking=> booking.id !== bookingId)
  });

  async function handleDelete(bookingId) {
    // optimisticDelete({ type: 'delete', id: bookingId });
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard 
          booking={booking} 
          key={booking.id} 
          onDelete={() => handleDelete(booking.id)} 
        />
      ))}
    </ul>
  );
}

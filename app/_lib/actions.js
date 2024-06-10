'use server';

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getGuest } from "./data-service";

// signIn
export  async function  signInAction(){
    await signIn('google' , {redirectTo:"/account"});
}

// SignOut
export async function signOutAction(){
    await signOut({redirectTo : "/"});
}

// submit profile form
export async function updateProfile(formData){
    const session  = await auth();
    if(!session) throw new Error("you must be logged in !");
    const nationalID = formData.get('nationalID');
    const [nationality , countryFlag] = formData.get("nationality").split("%");
    if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)){
        throw new Error("Please provide  a valid national ID");
        }
        const updateData = {nationalID , nationality  , countryFlag};

        const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)
    
      if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
      }
        // update ui after change 
        revalidatePath('/account/profile');
}

// delete reservation(bookings)
export default async function deleteReservation(bookingId){
  const session =  await auth();
  const guestBookings =  await getBookings(session.user.guestId);
// details for each users booking witch cabins
  const guestBookingsIds = guestBookings.map((booking)=> booking.id);
  if(!guestBookingsIds.includes(bookingId))throw new Error("You can Deleting this Reservation");
  console.log(guestBookingsIds);
  const {error} = await supabase.from('bookings').delete().eq('id', bookingId);
  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('account/reservations');
}
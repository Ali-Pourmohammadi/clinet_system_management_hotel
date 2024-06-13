/* eslint-disable import/no-anonymous-default-export */
'use server';

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getGuest } from "./data-service";
import { redirect } from "next/navigation";

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
 export async function deleteReservation(bookingId){
  const session =  await auth();
  if(!session.user) throw new Error("you must be logged in !");
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

// update the reservations

 export async function updateReservation(formData){

  // authorization
  const session =  await auth();
  if(!session) throw new Error("you must be logged in !");

  // guest bookings
  const guestBookings =  await getBookings(session.user.guestId);
  const bookingId = Number(formData.get('id'))
// details for each users booking witch cabins 
  const guestBookingsIds = guestBookings.map((booking)=> booking.id);
  if(!guestBookingsIds.includes(bookingId))throw new Error("You can Edit this Reservation");

  //create fields we want to update
  const updatedFields = {
    numGuests : formData.get("numGuests"),
    observations : formData.get("observations").slice(0, 1000),

  }
  const { error } = await supabase
  .from('bookings')
  .update(updatedFields)
  .eq('id', bookingId)
  .select()
  .single();

  // error handle
if (error) throw new Error('Booking could not be updated');
revalidatePath("/account/reservations");
redirect("/account/reservations");
}

export async function createReservation(bookingData , formData){
  const session =  await auth();
  if(!session) throw new Error("you must be logged in !");
  const newBooking ={
    ...bookingData,
    guestId: session.user.guestId,
    numGuests:Number(formData.get("numGuests")),
    observations : formData.get("observations").slice(0, 1000),
    extrasPrice:0,
    totalPrice: bookingData.cabinPrice,
    isPaid:false,
    hasBreakfast:false,
    status:"unconfirmed"
  }

  const {  error } = await supabase
  .from('bookings')
  .insert([newBooking])
  // So that the newly created object gets returned!
  .select()
  .single();

if (error) {
  console.error(error);
  throw new Error('Booking could not be created');
}
revalidatePath(`cabins/${bookingData.cabinId}`);
redirect(`/account/reservations`);
}
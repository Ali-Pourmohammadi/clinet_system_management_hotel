
import SubmitBtn from "@/app/_components/SubmitBtn";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
export  async function generateMetadata({params}){
    const {id} = await getBooking(params.bookingId);
    return {title :  `Booking ${id}` }
  }
  
  export default async function Page({params}) {
    // CHANGE
    const {bookingId} = params;
    // get booking data
    const {id : idFiled  , cabinId , observations, numGuests}  = await getBooking(bookingId);
    //get data of booked cabin
    const {maxCapacity} = await getCabin(cabinId);

    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Edit Reservation #{bookingId}
        </h2>
  
        <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
              defaultValue={numGuests}
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
  
          <div className="space-y-2">
            <label htmlFor="observations">
              Anything we should know about your stay?
            </label>
            <textarea
            defaultValue={observations}
              name="observations"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <input name="id" hidden value={Number(idFiled)} />
          </div>
          <div className="flex justify-end items-center gap-6">
            <SubmitBtn pendingLabel = "updating...">
              update reservation
            </SubmitBtn>
          </div>
        </form>
      </div>
    );
  }
  

import { auth } from '../_lib/auth';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'

 async function Reservation({cabin}) {
  const session = await auth();
const {user} = session;
const [settings , bookDates] = await Promise.all([
   getSettings(),
    getBookedDatesByCabinId(cabin.id)
])

return (
    <div className=" grid grid-cols-2 gap-3  border mt-3 border-primary-800 min-h-[400px]">
    <DateSelector settings = {settings} cabin = {cabin}  bookDates = {bookDates}/>
    <ReservationForm cabin={cabin} user={user}/>
  </div>
  )
}

export default Reservation

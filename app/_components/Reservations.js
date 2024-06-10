import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'

 async function Reservation({cabin}) {
const [settings , bookDates] = await Promise.all([
   getSettings(),
    getBookedDatesByCabinId(cabin.id)
])
  return (
    <div className=" grid grid-cols-2 gap-3  border mt-3 border-primary-800 min-h-[400px]">
    <DateSelector settings = {settings} cabin = {cabin}  bookDates = {bookDates}/>
    <ReservationForm cabin={cabin}/>
  </div>
  )
}

export default Reservation

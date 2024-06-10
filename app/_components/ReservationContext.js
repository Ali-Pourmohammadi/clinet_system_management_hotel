"use client";
import { Children, createContext, useContext, useState } from "react";
const ReservationContext = createContext();

const initialState = {from : undefined , to : undefined};
function ReservationProvider({children}){
    const [range  , setRange] = useState(initialState);

    function resetRange(){
        setRange(initialState);
    };
    return <ReservationContext.Provider value={{range , setRange , resetRange}}>
        {children}
    </ReservationContext.Provider>
}


function useReservation(){
    const context = useContext(ReservationContext);
    if(!context) throw new Error("you`re using context out of provider");
      return context
};
export {ReservationProvider , useReservation};
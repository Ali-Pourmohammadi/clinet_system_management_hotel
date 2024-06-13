"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import { updateProfile } from '../_lib/actions';
import {useFormStatus} from 'react-dom'
function UpdateProfile({children , guest}) {
    const [count, setCount] = useState();

    const {email , fullName , countryFlag , nationalID  , nationality} =guest
    return (
      <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col text-white" action={updateProfile}>
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            name='fullName'
            defaultValue={fullName}
          />
        </div>
  
        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            defaultValue={email}
            name='email'
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
  
        <div className="space-y-2">
          <div className="flex items-center justify-between relative">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              fill
              className="h-5 rounded-sm object-cover"
            />
          </div>
  
          {children}
        </div>
  
        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={nationalID}
          />
        </div>
  
        <div className="flex justify-end items-center gap-6">
          <SubmitBtn>
            Update profile
          </SubmitBtn>
        </div>
      </form>
    );
}

function SubmitBtn({children}){
  const {pending} = useFormStatus();
  return <button className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
    {pending ? 'Updating...':children}
  </button>
}

export default UpdateProfile

'use client'

import QuizTemplate from "@/ServerComponents/QuizTemplate";
import Image from "next/image";
import Step2of3 from '../../../public/images/step_2of3.png'
import arrow from '../../../public/images/arrow.png'
import info from '../../../public/images/info.png'
import tick from '../../../public/images/tick_blue.png'
import { useRouter } from "next/navigation";
import { useState } from "react";

const budgets = [0,10,15,20]

const benefits = [
  {
    title: "Universal Credit",
    code: "uc",
  },
  {
    title: "Jobseekers Allowance",
    code: "jsa",
  },
  {
    title: "Pension Credit",
    code: "pc",
  },
  {
    title: "Income Credit",
    code: "ic",
  },
  {
    title: "Disability Benefit",
    code: "db",
  },
  {
    title: "Income Support",
    code: "is",
  },
];

export default function Budget(
  {searchParams:{postCode}}:{searchParams:{postCode:string}}
) {
  const router = useRouter()

  const [budgetId, setBudgetId] = useState(0)

  const [selectedBenefits, setSelectedBenefits] =
    useState(Array(benefits.length).fill(false))

  return <QuizTemplate>
    <Image src={Step2of3} alt="Step 2 of 3"
      className="w-7/12 max-w-[220px] mb-4"
      />
  <div>
    <div className="flex flex-row items-center w-full">
      <div className="font-bold text-[#28D] text-lg text-left w-full flex-grow">
        Your monthly budget
      </div>
      <div className="w-8 ms-2 flex-none">
        <Image src={info} alt="info"/>
      </div>
    </div>
    <div className="flex flex-row justify-around w-full m-3">
      {budgets.map((budget,id)=>(
        <div key={budget}
        className="flex flex-col items-center cursor-pointer"
          onClick={()=>{setBudgetId(id)}}
        >
          <div className={
          "shadow-[inset_2px_2px_3px_#888] w-7 h-7"
          +" rounded-2xl flex justify-center items-center"
          }
        >
            {id === budgetId &&
            <div className="bg-[#28D] rounded-xl w-4 h-4"/>}
          </div>
          <div className="p-2">
          £{budget}{id === budgets.length-1 ? '+' : ''}
          </div>
        </div>
      ))}
    </div>
    <div className="flex flex-row items-center w-full mb-2">
      <div className="font-bold text-[#28D] text-lg text-left w-full flex-grow leading-5">
        Do you receive any of these benefits?
      </div>
      <div className="w-8 ms-2 flex-none">
        <Image src={info} alt="info"/>
      </div>
    </div>
    {benefits.map((benefit, i)=>(
      <div key={i} className="my-1 w-full flex flex-row justify-between items-center">
        {benefit.title}
        <div className="h-7 w-7 rounded-xl shadow-[inset_2px_2px_3px_#888] relative cursor-pointer"
           style={{border:'2px solid #28D'}}
           onClick={()=>{
             selectedBenefits[i] = !selectedBenefits[i]
             setSelectedBenefits([...selectedBenefits])
           }}
        >
          {selectedBenefits[i] &&
           <div className="w-10 h-10 absolute"
            style={{top:'-11px', left:'-3px'}}
          >
            <Image src={tick} alt="blue tick" />
          </div>}
        </div>
      </div>))}
  </div>
    <button className="mt-4" onClick={() => {
        router.push('/usage')
    }}>
        <Image src={arrow} alt="right arrow" className="w-8"/>
    </button>
  </QuizTemplate>
}

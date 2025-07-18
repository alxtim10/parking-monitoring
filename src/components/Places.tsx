'use client'
import { places } from "@/constants"
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";


const Places = () => {

  const router = useRouter();
  const [data, setData] = useState();
  const GetPlace = useCallback(async () => {
    const response = await fetch(`https://valet-production.up.railway.app/api/place/getbyid`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImlWVVpGNXhJSDNIWFE1QzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL25ra3F3Zmp4dGNrcGx3cm1paXlnLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJiZjkyYzZhYi1iMzEwLTQ0NWMtOTI2MS1iNDVjYmZkMzgxYzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzUyODI2NTcxLCJpYXQiOjE3NTI4MjI5NzEsImVtYWlsIjoiaW1hbTA3bkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiaW1hbTA3bkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJiZjkyYzZhYi1iMzEwLTQ0NWMtOTI2MS1iNDVjYmZkMzgxYzQifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc1MjgyMjk3MX1dLCJzZXNzaW9uX2lkIjoiYTk2MmY3MGMtOTc3Mi00Y2RhLWJjMzEtNjY2YTcyOGQzZDY2IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.Kr-LiDhRPF2B1X9yYx7yWQbc-WNLvxwlxmQjCVpbl4k`,
        'Content-Type': 'application/json',
      },
    }
    );

    const data = await response.json();
    console.log(data);
  }, [])

  useEffect(() => {
    GetPlace();
  }, [GetPlace])

  return (
    <section className='mt-5'>
      {/* <PlaceCarousel /> */}
      <div className='mt-2 flex flex-col gap-4'>
        {places.map((item, index) => {
          return (
            <div
              onClick={() => {
                router.push(`/parking/${item.id}`)
              }}
              key={index} className="border w-full rounded-2xl shadow-md p-2 cursor-pointer">
              <div className="relative rounded-xl h-44">
                <Image src={'/pim.jpg'} fill objectFit="cover" alt="asd" className="rounded-xl" />
              </div>
              <div className="mt-3 py-2 px-1">
                <h1 className="font-bold">{item.name}</h1>
                <div className="flex items-center justify-between">
                  <h1 className="text-sm">{item.location}</h1>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Places
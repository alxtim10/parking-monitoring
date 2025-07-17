'use client'
import { places } from "@/constants"
import { useRouter } from "next/navigation"


const Places = () => {
  const router = useRouter();
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
              <div className="h-36 w-full bg-blue-200 rounded-xl">
              </div>
              <div className="mt-3 py-2 px-1">
                <h1 className="font-bold">{item.name}</h1>
                <h1 className="text-sm">{item.location}</h1>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Places
'use client'
import { parking_plan, places } from '@/constants'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ZoomableCanvas from './ZoomableCanvas'

interface ParkingDetailProps {
    id: number
}

export default function ParkingDetail({ id }: ParkingDetailProps) {
    const router = useRouter();
    return (
        <section className="relative w-full min-h-screen overflow-auto touch-none">
            <div className="flex items-center justify-between mb-7">
                <ArrowLeft
                    onClick={() => {
                        router.back();
                    }}
                    className="w-5 h-5 cursor-pointer" />
                <h1 className='font-bold'>{places.find(item => item.id == id)?.name}</h1>
                <div className='w-5'></div>
            </div>
            <TransformWrapper
                centerOnInit={false}
                limitToBounds={false}
                panning={{ disabled: false }}
                pinch={{ disabled: false }}
                doubleClick={{ disabled: true }}
            >
                <TransformComponent>
                    <h1 className='ml-5 flex items-center gap-1 text-sm'>Entrance <ArrowRight className='w-3 h-3 ' /></h1>
                    <div className="flex flex-col items-center gap-2 p-6">

                        <div className='flex flex-col items-center gap-10'>
                            {/* Top Row (reverse to face bottom row) */}
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(0, 4).map((slot, index) => (
                                    <div
                                        key={slot.id}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs rotate-180">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(4, 8).map((slot, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-10'>
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(8, 12).map((slot, index) => (
                                    <div
                                        key={slot.id}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs rotate-180">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>


                            {/* Bottom Row */}
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(12, 16).map((slot, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-10'>
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(16, 20).map((slot, index) => (
                                    <div
                                        key={slot.id}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs rotate-180">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(20, 24).map((slot, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </section>
    );
}

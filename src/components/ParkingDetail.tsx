'use client'
import { parking_plan, places } from '@/constants'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface ParkingDetailProps {
    id: number
}

const ParkingDetail = ({ id }: ParkingDetailProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: -15, y: 20 });
    const [scale, setScale] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const container = containerRef.current;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = -e.deltaY * 0.001;
            setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 2));
        };

        container?.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX - translate.x, y: e.clientY - translate.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setTranslate({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <section>
            <div className="flex items-center justify-between">
                <ArrowLeft
                    onClick={() => {
                        router.back();
                    }}
                    className="w-5 h-5 cursor-pointer" />
                <h1 className='font-bold'>{places.find(item => item.id == id)?.name}</h1>
                <div className='w-5'></div>
            </div>
            <div
                ref={containerRef}
                className="relative w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="transition-transform duration-100 ease-in-out"
                    style={{
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                    }}
                >

                    <h1 className='ml-7 flex items-center gap-1 text-sm'>Entrance <ArrowRight className='w-3 h-3 '/></h1>
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
                </div>

            </div>
        </section>
    )
}

export default ParkingDetail
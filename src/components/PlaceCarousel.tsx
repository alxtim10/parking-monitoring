import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { list_location } from "@/constants"

const PlaceCarousel = () => {
    return (
        <Carousel
            opts={{
                align: "start",
                dragFree: true
            }}
            orientation="horizontal"
            className="mt-2"
        >
            <CarouselContent className="flex gap-3 w-full ml-0">
                {list_location.map((data, index) => (
                    <CarouselItem key={index} className="!basis-auto !shrink-0 !grow-0 p-1 cursor-pointer">
                        <div className="border w-72 rounded-2xl shadow-sm p-2">
                            <div className="h-36 w-full bg-blue-200 rounded-xl">
                            </div>
                            <div className="mt-3">
                                <h1 className="font-bold">Pondok Indah Mall</h1>
                                <h1 className="text-sm">Jakarta Selatan</h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default PlaceCarousel
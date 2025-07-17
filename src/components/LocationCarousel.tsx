import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { list_location } from "@/constants"

const LocationCarousel = () => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
                dragFree: true
            }}
            orientation="horizontal"
            className="mt-2"
        >
            <CarouselContent className="flex gap-2 w-full ml-0">
                {list_location.map((data, index) => (
                    <CarouselItem key={index} className="!basis-auto !shrink-0 !grow-0 p-0 cursor-pointer">
                        <div className="border rounded-xl px-3 py-2 shadow-sm whitespace-nowrap">
                            <h1 className="text-sm">{data.text}</h1>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default LocationCarousel
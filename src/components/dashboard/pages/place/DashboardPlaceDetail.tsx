'use client'
import React, { useEffect, useState } from 'react'

interface ParkingDetailProps {
    id: string;
}

type PlaceDetailType = {
    place_id: string;
    name: string;
    type: string;
    description: string;
    address: string;
    city: string;
    province: string;
    country: string;
    latitude: number;
    longitude: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    floors: FloorType[];
};

type FloorType = {
    floor_id: string;
    floor_name: string;
    description: string;
    floor_number: number;
};



const DashboardPlaceDetail = ({ id }: ParkingDetailProps) => {

    const [token, setToken] = useState<string>();
    const [data, setData] = useState<PlaceDetailType[]>();

    useEffect(() => {
        if (token) {
            const getPlace = async () => {
                try {
                    const response = await fetch(
                        `https://valet-production.up.railway.app/api/place/getbyid`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: id,
                            }),
                        }
                    );
                    const data = await response.json();
                    setData(data.data);
                    console.log(data);
                } catch {
                    console.log("error");
                }
            };

            getPlace();
        }
    }, [token]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let userToken = localStorage.getItem("bokirToken");
            if (userToken) {
                setToken(userToken);
            }
        }
    }, []);

    return (
        <div>
            {data && (
                <>
                    {JSON.stringify(data)}
                </>
            )}
        </div>
    )
}

export default DashboardPlaceDetail
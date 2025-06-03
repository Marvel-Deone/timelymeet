"use client";

import React, { useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import { deleteEvent } from '@/actions/event';

type Event = {
    id: string;
    title: string;
    duration: number;
    is_private: boolean;
    description: string;
    _count: {
        bookings: number;
    };
};

type EventCardProps = {
    event: Event;
    username: string;
    is_public: boolean;
};

const EventCard = ({ event, username, is_public }: EventCardProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    const { loading, error, fn: fnDeleteEvent } = useFetch(deleteEvent)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.log('Failed to copy');
        }
    }

    const handleDeleteEvent = async () => {
        const confirm_delete = window.confirm("Are you sure you want to delete this event?");
        if (confirm_delete) {
            await fnDeleteEvent(event.id);
            router.refresh();
        }
    }
    return (
        <Card className='flex flex-col justify-between cursor-pointer'>
            <CardHeader>
                <CardTitle className='text-2xl'>{event.title}</CardTitle>
                <CardDescription className='flex justify-between'>
                    <span>
                        {event.duration} | mins {event.is_private ? "Private" : "Public"}
                    </span>
                    <span>{event._count.bookings} Bookings</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{event.description}</p>
                {/* .substring(0, event.description.indexOf(".")) */}
            </CardContent>
            {!is_public && <CardFooter className='flex gap-2'>
                <Button className='cursor-pointer flex items-center' variant="outline" onClick={handleCopy}>
                    <Link className='mr-1 h-4 w-4' />
                    {isCopied ? "Copied!" : "Copy Link"}
                </Button>
                <Button className='cursor-pointer' disabled={loading} variant="destructive" onClick={handleDeleteEvent}>
                    <Trash2 className='mr-1 h-4 w-4' /> {loading ? "Deleting..." : "Delete"}
                </Button>
            </CardFooter>}
        </Card>
    )
}

export default EventCard;

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useRouter, useSearchParams } from "next/navigation"
import EventForm from "../event-form"

const CreateEventDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const create = searchParams.get("create");
        if (create === "true") {
            setIsOpen(true);
        }
    }, [searchParams]);

    const handleClose = () => {
        setIsOpen(false);
        if (searchParams.get("create") === "true") {
            router.replace(window?.location?.pathname)
        }
    }
    return (
        <Drawer open={isOpen} onClose={handleClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Event</DrawerTitle>
                </DrawerHeader>
                {/* 1:58 duration */}
              <EventForm onSumbitForm={() => {
                handleClose();
              }} />
                <DrawerFooter>
                    {/* <Button className="cursor-pointer">Submit</Button> */}
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={handleClose} className="cursor-pointer">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateEventDrawer;
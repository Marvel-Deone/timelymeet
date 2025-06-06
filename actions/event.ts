"use server"

import { eventSchema } from "@/app/lib/validators";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server"

export const createEvent = async (data: typeof eventSchema._input) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Umauthorized")
    }

    const validatedData = eventSchema.parse(data);
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    const event = await db.event.create({
        data: {
            ...validatedData,
            userId: user.id
        }
    });

    return event;
}

export const getUserEvents = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Umauthorized")
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
        throw new Error("User not found");
    }

      const events = await db.event.findMany({
        where: { userId: user.id },
        orderBy: { created_at: "desc" },
        include: {
            _count: {
                select: { bookings: true }
            }
        }
      });
      return { events, username: user.username }
}

export const deleteEvent = async (eventId: string) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Umauthorized")
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
        throw new Error("User not found");
    }

      const event = await db.event.findUnique({
        where: { id: eventId },
      });

      if (!event || event.userId !== user.id) {
        throw new Error("Event not found or unathorized");
      }

      await db.event.delete({
        where: { id: eventId }
      })

      return { success: true }
}
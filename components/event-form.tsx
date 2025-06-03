import { eventSchema } from '@/app/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { createEvent } from '@/actions/event'
import { useRouter, useSearchParams } from "next/navigation"

type EventFormProps = {
  onSumbitForm?: any;
};

const EventForm: React.FC<EventFormProps> = ({ onSumbitForm }) => {
  const router = useRouter()
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      is_private: true
    }
  });

  const { loading, error, fn: fnCreateEvent } = useFetch(createEvent)

  const onSubmit = async (data: typeof eventSchema._type) => {
    await fnCreateEvent(data);
    if (!loading && !error && onSumbitForm) onSumbitForm();
    router.refresh();
  }
  return (
    <form className='px-5 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Event Title</label>
        <Input id='title' {...register("title")} className='mt-1' />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Event description</label>
        <Input id='description' {...register("description")} className='mt-1' />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Duration (minutes)</label>
        <Input id='duration' {...register("duration", {
          valueAsNumber: true
        })} type='number' className='mt-1' />
        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
      </div>
      <div>
        <label htmlFor="is_private" className='block text-sm font-medium text-gray-700'>Event Privacy</label>
        <Controller
          name='is_private'
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={val => field.onChange(val === "true")}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.is_private && <p className="text-red-500 text-sm mt-1">{errors.is_private.message}</p>}
      </div>
      {error && <p className="text-red-500 text-sm mt-1"> {typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : String(error)}</p>}
      <Button type='submit' disabled={loading} className='cursor-pointer'>
        {loading ? "Submitting..." : "Create Event"}
      </Button>
    </form>
  )
}

export default EventForm;

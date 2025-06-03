import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free TimelyMeet account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-6xl md:text-7xl font-extrabold pb-6 bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text tracking-tighter text-transparent pr-2">Fast, easy scheduling</h1>
          <p className="text-xl text-gray-600 mb-10">TimelyMeet is a modern scheduling tool that makes it effortless to book meetings, manage availability, and stay organized — all in one place.</p>
          <Link href='/dashboard'>
            <Button size="lg" className="text-lg cursor-pointer">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        {/* Poster */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image src="/poster.png" alt="Scheduling illustration" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Key Features</h2>
        <div className="w-full flex  gap-4">{features.map((feature, i: number) => {
          const Icon = feature.icon;
          return (
            <Card key={i} className="md:basis-1/2 lg:basis-1/3 text-center">
              <CardHeader>
                <Icon className="w-12 h-12 text-blue mb-4 mx-auto text-blue-600" />
                <CardTitle className="text-blue-600">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
        </div>
      </div>
      {/* Testimonial */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          What Our Users Say
        </h2>
        <Testimonials />
      </div>
      {/* How it works */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, i) => (
            <div key={i} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* CTA */}
      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Want an easier way to schedule meetings?</h2>
        <p className="text-xl mb-6">Join thousands of professionals who trust TimelyMeet to manage their time efficiently.</p>
        <Link href='/dashboard'>
          <Button size='lg' variant='secondary' className="text-blue-600 cursor-pointer">
            Start For free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </Link>
      </div>
    </main>
  );
}

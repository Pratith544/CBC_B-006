import { Star } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content:
        "KrushiSahayak helped me switch to crops better suited for my soil type. My yield increased by 25% in just one season!",
      author: "Rajesh Patel",
      role: "Farmer, Gujarat",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      content:
        "The water optimization techniques suggested by the platform saved me thousands of liters of water while improving my crop health.",
      author: "Anita Sharma",
      role: "Organic Farmer, Maharashtra",
      rating: 5,
      image:
        "https://images.pexels.com/photos/3214768/pexels-photo-3214768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      content:
        "As someone new to farming, the educational resources and personalized recommendations made it easier for me to get started successfully.",
      author: "Vijay Kumar",
      role: "New Farmer, Karnataka",
      rating: 4,
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Success Stories"
          subtitle="See how farmers across the country are transforming their practices with our platform"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  rating: number;
  image: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow hover:shadow-md transition-shadow">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        "{testimonial.content}"
      </p>

      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
        />
        <div className="ml-3">
          <h4 className="text-base font-medium text-gray-900 dark:text-white">
            {testimonial.author}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

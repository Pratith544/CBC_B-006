import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Wheat Farmer, Punjab",
    content: "KrishiMarket has transformed how I sell my produce. The price trends help me decide when to sell for the best returns. My income has increased by 15% since I started using this platform.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    rating: 5
  },
  {
    name: "Lakshmi Devi",
    location: "Rice Grower, Tamil Nadu",
    content: "I love how easy it is to check prices on my mobile phone. The market insights are very valuable, especially during harvest season when I need to make quick decisions.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    rating: 4
  },
  {
    name: "Sunil Patel",
    location: "Cotton Farmer, Gujarat",
    content: "The AI assistant helped me understand why cotton prices were fluctuating and suggested the best time to sell. The educational resources are also helping me improve my farming techniques.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight">What Farmers Say</h2>
        <p className="text-muted-foreground mt-4">
          Hear from farmers who are using KrishiMarket to transform their agricultural businesses
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <StarIcon key={i + testimonial.rating} className="h-5 w-5 text-muted" />
                ))}
              </div>
              <p className="italic mb-6">${testimonial.content}</p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
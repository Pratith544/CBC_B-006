import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1479804/pexels-photo-1479804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming Experience?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers who are using data-driven insights to improve their yields, optimize resources, and adopt sustainable practices.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/questionnaire"
              className="px-8 py-4 bg-white text-green-800 hover:bg-gray-100 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center"
            >
              Get Started Now
              <ArrowRight size={18} className="ml-2" />
            </Link>
            
            <Link 
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
          
          <p className="text-white/80 mt-6">
            No registration required. Start your personalized recommendations today.
          </p>
        </div>
      </div>
    </section>
  );
}
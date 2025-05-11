import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Building,
  Tractor,
  FileCheck,
  Heart,
  BookOpen,
  Store,
} from "lucide-react";

export default function Assistant() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Digital Empowerment for{" "}
            <span className="text-primary">Rural Communities</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Access financial knowledge, business guidance, and automated
            assistance for rural entrepreneurs, farmers, and communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How We Can Help
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Tractor className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Modern Farming</CardTitle>
              <CardDescription>
                Learn sustainable farming practices, crop management, and
                technology integration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get practical advice on improving yields, reducing costs, and
                adopting innovative techniques for your farm.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Store className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Rural Business</CardTitle>
              <CardDescription>
                Start and grow successful enterprises with low-investment
                business ideas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover opportunities tailored to rural markets, from
                handicrafts to service businesses and digital enterprises.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Startup Recognition</CardTitle>
              <CardDescription>
                Navigate the process of official startup recognition and access
                benefits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get step-by-step guidance on applying for startup recognition,
                preparing documents, and meeting requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Financial Applications</CardTitle>
              <CardDescription>
                Guidance through loan applications, subsidies, and financial
                documentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn about eligibility criteria, required documents, and
                application processes for various financial services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Government Schemes</CardTitle>
              <CardDescription>
                Discover and utilize relevant government programs and benefits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay informed about schemes for rural development, agriculture,
                entrepreneurship, and social welfare.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Rural Finance</CardTitle>
              <CardDescription>
                Understand microfinance, banking, and financial literacy
                fundamentals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build knowledge about savings, credit, insurance, and investment
                options suitable for rural contexts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our digital assistant is available 24/7 to help you with any
            questions about rural development, finance, or business.
          </p>
          <Button size="lg">Ask a Question</Button>
        </div>
      </section>
    </main>
  );
}

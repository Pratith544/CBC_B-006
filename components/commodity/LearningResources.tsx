import Link from 'next/link';
import { ExternalLink, BookOpen, Video, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LearningResourcesProps {
  data: {
    articles: {
      title: string;
      description: string;
      url: string;
      type: 'article' | 'video' | 'guide';
      duration?: string;
    }[];
    bestPractices: string[];
    relatedCommodities: {
      name: string;
      id: string;
    }[];
  };
}

export default function LearningResources({ data }: LearningResourcesProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.articles.map((resource, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="outline" className="capitalize">
                        {resource.type}
                      </Badge>
                      {resource.duration && (
                        <span className="text-xs text-muted-foreground">
                          {resource.duration}
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    <Link 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-2"
                    >
                      Learn more <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
        <ul className="space-y-3">
          {data.bestPractices.map((practice, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <p className="text-sm">{practice}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Related Commodities</h3>
        <div className="flex flex-wrap gap-2">
          {data.relatedCommodities.map((commodity, index) => (
            <Link key={index} href={`/commodity/${commodity.id}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                {commodity.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
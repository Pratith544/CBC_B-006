import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CommodityDetailsProps {
  data: {
    description: string;
    varieties: { name: string; characteristics: string }[];
    seasonality: string;
    majorProducers: string[];
    storage: string;
    uses: string[];
    nutritionalInfo?: {
      calories?: string;
      protein?: string;
      carbohydrates?: string;
      fats?: string;
      otherNutrients?: string[];
    };
  };
}

export default function CommodityDetails({ data }: CommodityDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <p className="text-muted-foreground">{data.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Varieties</h3>
          <Accordion type="single" collapsible className="w-full">
            {data.varieties.map((variety, index) => (
              <AccordionItem key={index} value={`variety-${index}`}>
                <AccordionTrigger className="text-base font-medium">{variety.name}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{variety.characteristics}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Seasonality</h3>
            <p className="text-muted-foreground">{data.seasonality}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Major Producers</h3>
            <div className="flex flex-wrap gap-2">
              {data.majorProducers.map((producer, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 border border-primary/20"
                >
                  {producer}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Storage</h3>
            <p className="text-muted-foreground">{data.storage}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Uses</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
              {data.uses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {data.nutritionalInfo && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.nutritionalInfo.calories && (
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="text-lg font-medium">{data.nutritionalInfo.calories}</p>
              </div>
            )}
            {data.nutritionalInfo.protein && (
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-lg font-medium">{data.nutritionalInfo.protein}</p>
              </div>
            )}
            {data.nutritionalInfo.carbohydrates && (
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-lg font-medium">{data.nutritionalInfo.carbohydrates}</p>
              </div>
            )}
            {data.nutritionalInfo.fats && (
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm text-muted-foreground">Fats</p>
                <p className="text-lg font-medium">{data.nutritionalInfo.fats}</p>
              </div>
            )}
          </div>
          
          {data.nutritionalInfo.otherNutrients && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Other Nutrients:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                {data.nutritionalInfo.otherNutrients.map((nutrient, index) => (
                  <li key={index}>{nutrient}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
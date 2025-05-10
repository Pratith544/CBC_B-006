import Questionnaire from "@/components/questionnaire/Questionnaire";

export default function QuestionnairePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Agricultural Learning Assessment
        </h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Complete this comprehensive questionnaire to help us understand your agricultural 
          needs and create a personalized learning program just for you.
        </p>
        
        <Questionnaire />
      </div>
    </div>
  );
}
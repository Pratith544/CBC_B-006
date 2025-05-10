import PageContainer from '@/components/layout/PageContainer';
import FormWrapper from '@/components/questionnaire/FormWrapper';
import { SectionHeading } from '@/components/ui/section-heading';
import { ClipboardList } from 'lucide-react';

export default function QuestionnairePage() {
  return (
    <PageContainer>
      <div className="py-10 md:py-16">
        <SectionHeading
          title="Farming Questionnaire"
          subtitle="Complete this questionnaire to receive personalized crop recommendations tailored to your specific farming conditions"
          icon={<ClipboardList size={28} className="text-green-600" />}
          align="center"
          className="mb-12"
        />
        
        <FormWrapper />
        
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <p>
            Your information is used only to generate personalized recommendations and is not shared with third parties.
            The more details you provide, the more accurate your recommendations will be.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
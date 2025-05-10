import Link from 'next/link';
import { AudioButton } from '@/components/ui/audio-button';
import { cn } from '@/lib/utils';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <FooterLogo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Voice Bridge</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Making information accessible to everyone through the power of voice technology.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" label="Facebook" />
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" label="Twitter" />
              <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" label="Instagram" />
              <SocialLink icon={<Youtube className="h-5 w-5" />} href="#" label="YouTube" />
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
              <FooterLink href="#languages">Languages</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="#help">Help Center</FooterLink>
              <FooterLink href="#tutorial">Tutorial Videos</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
              <FooterLink href="#faq">FAQs</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <ContactItem 
                icon={<Phone className="h-5 w-5" />} 
                content="1800-123-4567 (Toll Free)"
                audioText="Call our toll free number, 1-800-123-4567"
              />
              <ContactItem 
                icon={<Mail className="h-5 w-5" />} 
                content="help@voicebridge.org"
                audioText="Email us at help@voicebridge.org"
              />
              <ContactItem 
                icon={<MapPin className="h-5 w-5" />} 
                content="123 Tech Park, Bengaluru, India 560001"
                audioText="Visit us at 123 Tech Park, Bengaluru, India 560001"
              />
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              &copy; 2025 Voice Bridge. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link href="#privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#terms" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#accessibility" className="hover:text-foreground">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <Link 
      href={href}
      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-background transition-colors"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}

function ContactItem({ 
  icon, 
  content,
  audioText
}: { 
  icon: React.ReactNode; 
  content: string;
  audioText: string;
}) {
  return (
    <li className="flex items-center gap-3 group">
      <div className="text-primary">{icon}</div>
      <span>{content}</span>
      <AudioButton 
        text={audioText} 
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </li>
  );
}

function FooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d="M5 20C5 12.268 11.268 6 19 6C26.732 6 33 12.268 33 20C33 27.732 26.732 34 19 34" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        <path 
          d="M19 34C15.134 34 12 30.866 12 27C12 23.134 15.134 20 19 20" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        <path 
          d="M26 27H35" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
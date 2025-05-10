export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4">
              KrushiSahayak
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Empowering rural communities through digital transformation and
              agricultural innovation. Get personalized recommendations for
              better crop yield and sustainable farming.
            </p>
            <div className="flex space-x-4">
              <SocialIcon name="facebook" />
              <SocialIcon name="twitter" />
              <SocialIcon name="instagram" />
              <SocialIcon name="youtube" />
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/questionnaire" label="Get Recommendations" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/resources" label="Resources" />
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/farming-guides" label="Farming Guides" />
              <FooterLink href="/crop-calendar" label="Crop Calendar" />
              <FooterLink href="/soil-analysis" label="Soil Analysis" />
              <FooterLink href="/weather-info" label="Weather Information" />
              <FooterLink href="/market-prices" label="Market Prices" />
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} KrushiSahayak. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterSmallLink href="/privacy" label="Privacy Policy" />
            <FooterSmallLink href="/terms" label="Terms of Service" />
            <FooterSmallLink href="/faq" label="FAQ" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
      >
        {label}
      </a>
    </li>
  );
}

function FooterSmallLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm transition-colors"
    >
      {label}
    </a>
  );
}

function SocialIcon({ name }: { name: string }) {
  return (
    <a
      href={`https://${name}.com`}
      aria-label={`${name} profile`}
      className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
    >
      {/* Icon placeholder */}
      <div className="w-5 h-5"></div>
    </a>
  );
}

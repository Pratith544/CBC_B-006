"use client";

import Script from "next/script";

export default function TranslateWidget() {
  return (
    <>
      {/* 1. Container for the widget */}
      <div id="google_translate_element" />

      {/* 2. Inline initializer (must come before the external script) */}
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'hi,bn,ta,te,mr,ur,gu,kn,ml,or,pa,as',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
          }
        `}
      </Script>

      {/* 3. External script that calls our callback */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}

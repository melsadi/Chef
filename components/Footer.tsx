import React from 'react';

interface FooterProps {
  t: (key: string) => string;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-white mt-12 py-6">
      <div className="container mx-auto text-center text-gray-500">
        <p>{t('footerCopyright')}</p>
        <p className="text-sm mt-1">{t('footerPoweredBy')}</p>
      </div>
    </footer>
  );
};
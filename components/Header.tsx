import React from 'react';
import type { Language } from '../App';

interface HeaderProps {
    t: (key: string) => string;
    language: Language;
    setLanguage: (lang: Language) => void;
}

const ChefHatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.69 2 6 4.69 6 8H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4H8c0-2.21 1.79-4 4-4zm-2 9v8h4v-8h-4z"/>
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ t, language, setLanguage }) => {
    const buttonBaseClasses = "px-3 py-1 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50";
    const activeButtonClasses = "bg-green-600 text-white shadow-sm";
    const inactiveButtonClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";
    
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 relative">
                <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                    <ChefHatIcon />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                        {t('headerTitle')}
                    </h1>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 flex space-x-2 rtl:space-x-reverse">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`${buttonBaseClasses} ${language === 'en' ? activeButtonClasses : inactiveButtonClasses}`}
                        aria-pressed={language === 'en'}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLanguage('ar')}
                        className={`${buttonBaseClasses} ${language === 'ar' ? activeButtonClasses : inactiveButtonClasses}`}
                        aria-pressed={language === 'ar'}
                    >
                        العربية
                    </button>
                </div>
            </div>
        </header>
    );
};
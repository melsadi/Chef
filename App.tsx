import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { RecipeDisplay } from './components/RecipeDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { generateRecipes } from './services/geminiService';
import type { Recipe } from './types';

export type Language = 'en' | 'ar';

const translations = {
  en: {
    headerTitle: "Elsadi Chef",
    kitchenInventory: "Your Kitchen Inventory",
    inventoryDescription: "Add the ingredients you have on hand, and let our AI chef work its magic!",
    addIngredientPlaceholder: "e.g., Chicken breast, Bell peppers",
    addButton: "Add",
    ingredientsAppearHere: "Your ingredients will appear here...",
    generateButton: "Generate Recipes",
    generatingButton: "Crafting Deliciousness...",
    loadingMessage: "Consulting with the AI Chef...",
    errorTitle: "Oops!",
    errorEmptyIngredients: "Please add at least one ingredient.",
    errorApiFailure: "Failed to generate recipes. The culinary cosmos is not responding. Please try again later.",
    ingredientsHeader: "Ingredients",
    instructionsHeader: "Instructions",
    footerCopyright: `© ${new Date().getFullYear()} Elsadi Chef. All rights reserved.`,
    footerPoweredBy: "Powered by Google Gemini",
  },
  ar: {
    headerTitle: "الشيف الصادي",
    kitchenInventory: "محتويات مطبخك",
    inventoryDescription: "أضف المكونات المتوفرة لديك، ودع طاهينا الذكي يبدع!",
    addIngredientPlaceholder: "مثال: صدر دجاج، فلفل حلو",
    addButton: "إضافة",
    ingredientsAppearHere: "ستظهر مكوناتك هنا...",
    generateButton: "إنشاء وصفات",
    generatingButton: "جاري تحضير الأطباق...",
    loadingMessage: "جاري استشارة الشيف الذكي...",
    errorTitle: "عفوًا!",
    errorEmptyIngredients: "يرجى إضافة مكون واحد على الأقل.",
    errorApiFailure: "فشل في إنشاء الوصفات. يبدو أن هناك مشكلة في الاتصال. يرجى المحاولة مرة أخرى لاحقًا.",
    ingredientsHeader: "المكونات",
    instructionsHeader: "التعليمات",
    footerCopyright: `© ${new Date().getFullYear()} الشيف الصادي. جميع الحقوق محفوظة.`,
    footerPoweredBy: "مدعوم بواسطة Google Gemini",
  }
};


const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Onion', 'Garlic']);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  const handleAddIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      setError(t('errorEmptyIngredients'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipes(ingredients, language);
      setRecipes(generatedRecipes);
    } catch (err) {
      console.error(err);
      setError(t('errorApiFailure'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header t={t} language={language} setLanguage={setLanguage} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300 text-left rtl:text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">{t('kitchenInventory')}</h2>
            <p className="text-gray-500 mb-6">{t('inventoryDescription')}</p>
            
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              t={t}
            />

            <div className="mt-8 text-center">
              <button
                onClick={handleGenerateRecipes}
                disabled={isLoading || ingredients.length === 0}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? t('generatingButton') : t('generateButton')}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-8 bg-red-100 border-l-4 rtl:border-l-0 rtl:border-r-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md text-left rtl:text-right" role="alert">
              <p className="font-bold">{t('errorTitle')}</p>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-12">
            {isLoading && <LoadingSpinner t={t} />}
            {recipes.length > 0 && <RecipeDisplay recipes={recipes} t={t}/>}
          </div>
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
};

export default App;
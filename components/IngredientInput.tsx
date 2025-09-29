import React, { useState } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  t: (key: string) => string;
}

const IngredientTag: React.FC<{ ingredient: string; onRemove: (ingredient: string) => void }> = ({ ingredient, onRemove }) => (
  <div className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full animate-fade-in">
    <span>{ingredient}</span>
    <button onClick={() => onRemove(ingredient)} className="ml-2 rtl:mr-2 rtl:ml-0 text-green-600 hover:text-green-800 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAddIngredient, onRemoveIngredient, t }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAdd = () => {
    if (currentIngredient.trim()) {
      onAddIngredient(currentIngredient.trim());
      setCurrentIngredient('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:rtl:flex-row-reverse gap-2">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('addIngredientPlaceholder')}
          className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          {t('addButton')}
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 min-h-[40px]">
        {ingredients.map(ingredient => (
          <IngredientTag key={ingredient} ingredient={ingredient} onRemove={onRemoveIngredient} />
        ))}
         {ingredients.length === 0 && (
          <p className="text-gray-400 p-2">{t('ingredientsAppearHere')}</p>
        )}
      </div>
    </div>
  );
};
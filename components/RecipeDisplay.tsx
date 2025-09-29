import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  t: (key: string) => string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, t }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300 text-left rtl:text-right">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 mb-6 italic">"{recipe.description}"</p>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-1 mb-3">{t('ingredientsHeader')}</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-200 pb-1 mb-3">{t('instructionsHeader')}</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RecipeDisplayProps {
  recipes: Recipe[];
  t: (key: string) => string;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipes, t }) => {
  return (
    <div className="space-y-8">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} t={t} />
      ))}
    </div>
  );
};
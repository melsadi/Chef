import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The creative and appealing name of the recipe."
    },
    description: {
      type: Type.STRING,
      description: "A short, one-sentence enticing description of the dish."
    },
    ingredients: {
      type: Type.ARRAY,
      items: { 
        type: Type.STRING,
        description: "An ingredient with its quantity, e.g., '1 cup of flour'."
      },
      description: "A list of all ingredients required for the recipe, including those provided by the user and any additional staples."
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single step in the cooking process."
      },
      description: "The step-by-step instructions to prepare the dish."
    },
  },
  required: ["recipeName", "description", "ingredients", "instructions"],
};

export const generateRecipes = async (ingredients: string[], language: 'en' | 'ar'): Promise<Recipe[]> => {
  const ingredientList = ingredients.join(', ');
  
  const prompt = `You are a world-class, creative chef who specializes in making delicious meals from a limited set of ingredients.
  
  Based on the following ingredients: ${ingredientList}.
  
  Please generate 4 unique and delicious recipes in ${language === 'ar' ? 'Arabic' : 'English'}. For each recipe, provide a catchy name, a short description, a complete list of required ingredients (including amounts), and step-by-step instructions. Assume common pantry staples like salt, pepper, oil, and water are available.
  
  Structure your response according to the provided JSON schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: recipeSchema
        },
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const recipes: Recipe[] = JSON.parse(jsonText);

    if (!Array.isArray(recipes)) {
        throw new Error("API did not return an array of recipes.");
    }

    return recipes;

  } catch (error) {
    console.error("Error generating recipes with Gemini:", error);
    throw new Error("Failed to parse recipes from Gemini response.");
  }
};
import axios from 'axios';
import { RecipeDto, RecipesDto } from 'types/recipe';

const baseUrl = '/api';

export const getRecipes = async (pageNumber: number, pageSize: number, userId: string = '') => {
    return await axios.get<RecipesDto>(`${baseUrl}/recipes`, {
        params: {
            pageNumber,
            pageSize,
            userId: userId || undefined
        }
    });
};

export const getRecipe = async (recipeId: string) => {
    return await axios.get<RecipeDto>(`${baseUrl}/recipe/${recipeId}`);
};

export type CreateRecipeDto = Omit<RecipeDto, 'id'>;

export const createRecipe = async (recipe: CreateRecipeDto): Promise<void> => {
    await axios.post(`${baseUrl}/recipes`, recipe);
};

export type UpdateRecipeDto = Partial<Omit<RecipeDto, 'id' | 'user'>> & { id: string };

export const updateRecipe = async (recipe: UpdateRecipeDto): Promise<void> => {
    await axios.put(`${baseUrl}/recipe/${recipe.id}`, recipe);
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    await axios.delete(`${baseUrl}/recipe/${recipeId}`);
};

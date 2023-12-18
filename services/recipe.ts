import axios, { AxiosResponse } from "axios";
import { RecipesDto } from "types/recipe";

const baseUrl = 'http://localhost:3000/api';

export const getRecipes = async (pageNumber: number, pageSize: number, userId: string = ''): Promise<AxiosResponse<any, RecipesDto>> => {
    return await axios.get(`${baseUrl}/recipes`, {
        pageNumber,
        pageSize,
        userId
    });
}

export const getRecipe = async (recipeId: string): Promise<AxiosResponse<any, RecipesDto>> => {
    return await axios.get(`${baseUrl}/recipe/${recipeId}`);
}

interface UpdateRecipeDto {
    id: string;
    name: string | undefined;
    description: string | undefined;
    image: string | undefined;
    ingredients: string[] | undefined;
    steps: string[] | undefined;
    approved: boolean | undefined;
}

export const updateRecipe = async (recipe: UpdateRecipeDto): Promise<void> => {
    return await axios.put(`${baseUrl}/recipe/${recipe.id}`, recipe);
}

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    return await axios.delete(`${baseUrl}/recipe/${recipeId}`);
}
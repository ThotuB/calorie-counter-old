import CreateForm from 'components/recipes/create/CreateForm';
import Router from 'next/router';
import { createRecipe, CreateRecipeDto } from 'services/recipe';

export default function RecipeCreatePage() {
    const handleCreate = async (recipe: CreateRecipeDto) => {
        await createRecipe(recipe);

        Router.push('/recipes');
    };

    return <CreateForm onCreate={handleCreate} />;
}

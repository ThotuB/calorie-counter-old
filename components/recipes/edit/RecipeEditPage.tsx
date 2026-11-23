import Router from 'next/router';
import { updateRecipe, UpdateRecipeDto } from 'services/recipe';
import { RecipeDto } from 'types/recipe';
import EditForm from './EditForm';

interface RecipeEditPageProps {
    recipe: RecipeDto;
}

export default function RecipeEditPage({ recipe }: RecipeEditPageProps) {
    const handleEdit = async (recipe: UpdateRecipeDto) => {
        await updateRecipe(recipe);

        Router.push('/recipes');
    };

    return <EditForm recipe={recipe} onEdit={handleEdit} />;
}

import Loading from 'components/common/Loading';
import Layout from 'components/layouts/navigation/Layout';
import RecipeEditPage from 'components/recipes/edit/RecipeEditPage';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getRecipe } from 'services/recipe';
import { RecipeDto } from 'types/recipe';

interface Props {
    id: string;
}

export default function RecipeEdit({ id }: Props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipe, setRecipe] = useState<RecipeDto>({} as RecipeDto);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getRecipe(id)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <Layout>
            {loading ? <Loading /> : error ? <div>Could not load recipe</div> : <RecipeEditPage recipe={recipe} />}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { recipeId } = context.query;

    return {
        props: {
            id: recipeId as string
        }
    };
};

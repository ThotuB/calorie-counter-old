import axios from "axios"

export const searchFoods = async (ingredient: string, count: number) => {
    return await axios.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}&from=0&to=${count}`)
}
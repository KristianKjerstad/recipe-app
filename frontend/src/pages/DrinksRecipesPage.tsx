import { SearchOutlined } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { FcInfo } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { Ingredient, Recipe } from '../api/generated'
import { IngredientsFilter } from '../components/IngredientsFIlter'
import { RecipeCard } from '../components/RecipeCard'
import { useIngredientAPI } from '../hooks/useIngredientAPI'
import { useRecipeAPI } from '../hooks/useRecipeAPI'
import { filterRecipes } from '../utils/filtering'

export type Options = {
    label: string
    value: string
}

// const formatIngredients = (rawIngredients: Ingredient[]) => {
//     const newIngredients: MultiValue<Options> = rawIngredients.map(
//         (ingredient) => {
//             return {
//                 label: ingredient.name,
//                 value: ingredient.id,
//             }
//         }
//     )
//     return newIngredients
// }

export const DrinksRecipesPage = () => {
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<
        string[]
    >([])
    const [showIngredientSelection, _] = useState<boolean>(true)
    // const [selectedIngredients, setSelectedIngredients] = useState<
    //     MultiValue<Options>
    // >(JSON.parse(localStorage.getItem('selectedIngredients') ?? '[]'))

    // const handleSelectedIngredientChange = (value: MultiValue<Options>) => {
    //     setSelectedIngredients(value)
    // }

    const [includeCloseMatches, setIncludeCloseMatches] =
        useState<boolean>(false)

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([])
    const [isNoRecipeResults, setIsNoRecipeResults] = useState<boolean>(false)
    const { getAllRecipes } = useRecipeAPI()
    const { getAllIngredients } = useIngredientAPI()

    useEffect(() => {
        getAllRecipes().then((recipesResponse) => {
            setAllRecipes(recipesResponse.data)
        })
    }, [getAllRecipes])

    useEffect(() => {
        getAllIngredients().then((ingredientsResponse) => {
            setAllIngredients(ingredientsResponse.data)
        })
    }, [getAllIngredients])

    const handleSearch = () => {
        const newFilteredRecipes = filterRecipes({
            allRecipes: allRecipes,
            selectedIngredientIds: selectedIngredientIds,
            includeCloseMatches: includeCloseMatches,
        })
        setFilteredRecipes(newFilteredRecipes)
        if (newFilteredRecipes.length === 0) {
            setIsNoRecipeResults(true)
        } else {
            setIsNoRecipeResults(false)
        }
    }

    if (allRecipes.length === 0) {
        return (
            <div className="pt-40">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium pt-12 pb-2">
                Cocktail Recipes
            </h2>
            <Link
                to="/all-cocktails"
                className="text-blue-600 underline pt-6 pb-8"
            >
                View all recipes
            </Link>
            {/* <div className="text-left pt-6 max-w-full  w-3/4">
                <p className="pb-2">Select your ingredients</p>
                <Select
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    value={selectedIngredients}
                    options={formatIngredients(allIngredients)}
                    onChange={(value) => {
                        handleSelectedIngredientChange(value)
                    }}
                    isMulti
                    // isDisabled
                    closeMenuOnSelect={false}
                    hideSelectedOptions={true}
                />
                <div className='flex flex-row justify-between items-center pt-4'>
                    <div className='flex flex-row'>
                        <FormControlLabel
                            className="text-left"
                            control={
                                <Checkbox
                                    checked={includeCloseMatches}
                                    onChange={(event) =>
                                        setIncludeCloseMatches(event.target.checked)
                                    }
                                />
                            }
                            label="Include close matches"
                        />
                        <Tooltip title={<p className='text-[16px]'>Include recipes where up to two ingredients are missing.</p>}>
                            <div className='cursor-pointer'>
                                <FcInfo />
                            </div>
                        </Tooltip>
                    </div>
                    <div>
                        <Button
                            // size="large"
                            variant="contained"
                            color="lightGreen"
                            // startIcon={<SearchOutlined />}
                            // onClick={() => {
                            //     handleSearch()
                            // }}
                            onClick={() => setShowIngredientSelection(!showIngredientSelection)}
                        >
                            Open Ingredient Selection
                        </Button>
                    </div>
                </div>
            </div> */}
            {showIngredientSelection && (
                <IngredientsFilter
                    ingredients={allIngredients}
                    selectedIngredientIds={selectedIngredientIds}
                    setSelectedIngredientIds={setSelectedIngredientIds}
                />
            )}

            <div className="flex flex-row justify-center space-x-16 pt-8 ">
                <Button
                    size="large"
                    variant="contained"
                    color="lightGreen"
                    startIcon={<SearchOutlined />}
                    onClick={() => {
                        handleSearch()
                    }}
                >
                    Search
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="lightGreen"
                    startIcon={<ClearIcon />}
                    disabled={selectedIngredientIds.length === 0}
                    onClick={() => {
                        setSelectedIngredientIds([])
                    }}
                >
                    Clear Selection
                </Button>
            </div>
            <div className="flex flex-row pt-8 mr-36">
                <FormControlLabel
                    // className="text-left"
                    control={
                        <Checkbox
                            checked={includeCloseMatches}
                            onChange={(event) =>
                                setIncludeCloseMatches(event.target.checked)
                            }
                        />
                    }
                    label="Include close matches"
                />
                <Tooltip
                    title={
                        <p className="text-[16px]">
                            Include recipes where up to two ingredients are
                            missing.
                        </p>
                    }
                >
                    <div className="cursor-pointer">
                        <FcInfo />
                    </div>
                </Tooltip>
            </div>
            <div></div>
            {filteredRecipes.length === 1 && (
                <h2 className="pt-12">
                    Found {filteredRecipes.length} recipe that match your choice
                    of ingredients
                </h2>
            )}
            {filteredRecipes.length > 1 && (
                <h2 className="pt-12">
                    Found {filteredRecipes.length} recipes that match your
                    choice of ingredients
                </h2>
            )}
            {isNoRecipeResults && <p className="pt-12">No results...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 pt-24 pb-48">
                {filteredRecipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} />
                })}
            </div>
        </div>
    )
}

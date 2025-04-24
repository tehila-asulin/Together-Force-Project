import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const FORM_MODES_OPTIONS = {
    None: "None",
    Create: "Create",
    Edit: "Edit",
};
const initialState = {
    recipeList: [],
    selectedRecipe: null,
    formMode: "None",
    error: null,
    isLoading: false
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipeList: (state, action) => {
            state.recipeList = action.payload;
        },
        insertRecipe: (state, action) => {
            state.recipeList.push(action.payload);
            
        },
        editRecipe: (state, action) => {
            const index = state.recipeList.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.recipeList[index] = action.payload;
            }  
             
        },
        removeRecipe: (state, action) => {
            state.recipeList = state.recipeList.filter(recipe => recipe.id !== action.payload);
        },
        setSelectedRecipe: (state, action) => {
            state.selectedRecipe = action.payload;
        },
        setFormMode: (state, action) => {
            state.formMode = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export default recipesSlice.reducer

export const selectRecipesList = (state) => state.recipes.recipeList;
export const selectSelectedRecipe = (state) => state.recipes.selectedRecipe;
export const selectFormMode = (state) => state.recipes.formMode;
export const selectError = (state) => state.recipes.error;
export const selectIsLoading = (state) => state.recipes.isLoading;


export const selectRecipeById = createSelector(
    [selectRecipesList, (_, recipeId) => recipeId],
    (recipeList, recipeId) => recipeList.find(recipe => recipe.id === recipeId)
);
export const { 
    setRecipeList, 
    insertRecipe, 
    editRecipe, 
    removeRecipe, 
    setSelectedRecipe, 
    setFormMode, 
    setError, 
    setIsLoading 
} = recipesSlice.actions;

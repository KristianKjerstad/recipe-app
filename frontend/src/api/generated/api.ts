/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from './configuration'
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios'
import globalAxios from 'axios'
// Some imports not used depending on template conditions
// @ts-ignore
import {
    DUMMY_BASE_URL,
    assertParamExists,
    setApiKeyToObject,
    setBasicAuthToObject,
    setBearerAuthToObject,
    setOAuthToObject,
    setSearchParams,
    serializeDataIfNeeded,
    toPathString,
    createRequestFunction,
} from './common'
import type { RequestArgs } from './base'
// @ts-ignore
import {
    BASE_PATH,
    COLLECTION_FORMATS,
    BaseAPI,
    RequiredError,
    operationServerMap,
} from './base'

/**
 *
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     *
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    detail?: Array<ValidationError>
}
/**
 *
 * @export
 * @interface Ingredient
 */
export interface Ingredient {
    /**
     *
     * @type {string}
     * @memberof Ingredient
     */
    id: string
    /**
     *
     * @type {string}
     * @memberof Ingredient
     */
    name: string
    /**
     *
     * @type {IngredientCategories}
     * @memberof Ingredient
     */
    category: IngredientCategories
}

/**
 *
 * @export
 * @enum {string}
 */

export const IngredientCategories = {
    Mixers: 'Mixers',
    Spirits: 'Spirits',
    Liqueurs: 'Liqueurs',
    Wine: 'Wine',
    Other: 'Other',
} as const

export type IngredientCategories =
    (typeof IngredientCategories)[keyof typeof IngredientCategories]

/**
 *
 * @export
 * @interface Recipe
 */
export interface Recipe {
    /**
     *
     * @type {string}
     * @memberof Recipe
     */
    id: string
    /**
     *
     * @type {RecipeTypes}
     * @memberof Recipe
     */
    type: RecipeTypes
    /**
     *
     * @type {string}
     * @memberof Recipe
     */
    name: string
    /**
     *
     * @type {RecipeCategories}
     * @memberof Recipe
     */
    category: RecipeCategories
    /**
     *
     * @type {Array<RecipeIngredient>}
     * @memberof Recipe
     */
    ingredients?: Array<RecipeIngredient>
    /**
     *
     * @type {Array<string>}
     * @memberof Recipe
     */
    recipe_steps: Array<string>
    /**
     *
     * @type {string}
     * @memberof Recipe
     */
    image_link: string
}

/**
 *
 * @export
 * @enum {string}
 */

export const RecipeCategories = {
    Appetizer: 'appetizer',
    Cocktail: 'cocktail',
} as const

export type RecipeCategories =
    (typeof RecipeCategories)[keyof typeof RecipeCategories]

/**
 *
 * @export
 * @interface RecipeIngredient
 */
export interface RecipeIngredient {
    /**
     *
     * @type {string}
     * @memberof RecipeIngredient
     */
    ingredient_uuid: string
}
/**
 *
 * @export
 * @enum {string}
 */

export const RecipeTypes = {
    Cocktail: 'cocktail',
    Appteizer: 'appteizer',
    MainCourse: 'main_course',
    Dessert: 'dessert',
} as const

export type RecipeTypes = (typeof RecipeTypes)[keyof typeof RecipeTypes]

/**
 *
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     *
     * @type {Array<ValidationErrorLocInner>}
     * @memberof ValidationError
     */
    loc: Array<ValidationErrorLocInner>
    /**
     *
     * @type {string}
     * @memberof ValidationError
     */
    msg: string
    /**
     *
     * @type {string}
     * @memberof ValidationError
     */
    type: string
}
/**
 *
 * @export
 * @interface ValidationErrorLocInner
 */
export interface ValidationErrorLocInner {}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (
    configuration?: Configuration
) {
    return {
        /**
         *
         * @summary Read Root
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        readRootGet: async (
            options: RawAxiosRequestConfig = {}
        ): Promise<RequestArgs> => {
            const localVarPath = `/`
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
            let baseOptions
            if (configuration) {
                baseOptions = configuration.baseOptions
            }

            const localVarRequestOptions = {
                method: 'GET',
                ...baseOptions,
                ...options,
            }
            const localVarHeaderParameter = {} as any
            const localVarQueryParameter = {} as any

            setSearchParams(localVarUrlObj, localVarQueryParameter)
            let headersFromBaseOptions =
                baseOptions && baseOptions.headers ? baseOptions.headers : {}
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            }

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            }
        },
    }
}

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Read Root
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async readRootGet(
            options?: RawAxiosRequestConfig
        ): Promise<
            (axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>
        > {
            const localVarAxiosArgs =
                await localVarAxiosParamCreator.readRootGet(options)
            const index = configuration?.serverIndex ?? 0
            const operationBasePath =
                operationServerMap['DefaultApi.readRootGet']?.[index]?.url
            return (axios, basePath) =>
                createRequestFunction(
                    localVarAxiosArgs,
                    globalAxios,
                    BASE_PATH,
                    configuration
                )(axios, operationBasePath || basePath)
        },
    }
}

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         *
         * @summary Read Root
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        readRootGet(options?: any): AxiosPromise<any> {
            return localVarFp
                .readRootGet(options)
                .then((request) => request(axios, basePath))
        },
    }
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     *
     * @summary Read Root
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public readRootGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration)
            .readRootGet(options)
            .then((request) => request(this.axios, this.basePath))
    }
}

/**
 * IngredientApi - axios parameter creator
 * @export
 */
export const IngredientApiAxiosParamCreator = function (
    configuration?: Configuration
) {
    return {
        /**
         *
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllIngredientsGet: async (
            options: RawAxiosRequestConfig = {}
        ): Promise<RequestArgs> => {
            const localVarPath = `/ingredients`
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
            let baseOptions
            if (configuration) {
                baseOptions = configuration.baseOptions
            }

            const localVarRequestOptions = {
                method: 'GET',
                ...baseOptions,
                ...options,
            }
            const localVarHeaderParameter = {} as any
            const localVarQueryParameter = {} as any

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(
                localVarHeaderParameter,
                'OAuth2AuthorizationCodeBearer',
                [],
                configuration
            )

            setSearchParams(localVarUrlObj, localVarQueryParameter)
            let headersFromBaseOptions =
                baseOptions && baseOptions.headers ? baseOptions.headers : {}
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            }

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            }
        },
        /**
         *
         * @summary Get One
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOneIngredientsIdGet: async (
            id: string,
            options: RawAxiosRequestConfig = {}
        ): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneIngredientsIdGet', 'id', id)
            const localVarPath = `/ingredients/{id}`.replace(
                `{${'id'}}`,
                encodeURIComponent(String(id))
            )
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
            let baseOptions
            if (configuration) {
                baseOptions = configuration.baseOptions
            }

            const localVarRequestOptions = {
                method: 'GET',
                ...baseOptions,
                ...options,
            }
            const localVarHeaderParameter = {} as any
            const localVarQueryParameter = {} as any

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(
                localVarHeaderParameter,
                'OAuth2AuthorizationCodeBearer',
                [],
                configuration
            )

            setSearchParams(localVarUrlObj, localVarQueryParameter)
            let headersFromBaseOptions =
                baseOptions && baseOptions.headers ? baseOptions.headers : {}
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            }

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            }
        },
    }
}

/**
 * IngredientApi - functional programming interface
 * @export
 */
export const IngredientApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator =
        IngredientApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllIngredientsGet(
            options?: RawAxiosRequestConfig
        ): Promise<
            (
                axios?: AxiosInstance,
                basePath?: string
            ) => AxiosPromise<Array<Ingredient>>
        > {
            const localVarAxiosArgs =
                await localVarAxiosParamCreator.getAllIngredientsGet(options)
            const index = configuration?.serverIndex ?? 0
            const operationBasePath =
                operationServerMap['IngredientApi.getAllIngredientsGet']?.[
                    index
                ]?.url
            return (axios, basePath) =>
                createRequestFunction(
                    localVarAxiosArgs,
                    globalAxios,
                    BASE_PATH,
                    configuration
                )(axios, operationBasePath || basePath)
        },
        /**
         *
         * @summary Get One
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getOneIngredientsIdGet(
            id: string,
            options?: RawAxiosRequestConfig
        ): Promise<
            (
                axios?: AxiosInstance,
                basePath?: string
            ) => AxiosPromise<Ingredient>
        > {
            const localVarAxiosArgs =
                await localVarAxiosParamCreator.getOneIngredientsIdGet(
                    id,
                    options
                )
            const index = configuration?.serverIndex ?? 0
            const operationBasePath =
                operationServerMap['IngredientApi.getOneIngredientsIdGet']?.[
                    index
                ]?.url
            return (axios, basePath) =>
                createRequestFunction(
                    localVarAxiosArgs,
                    globalAxios,
                    BASE_PATH,
                    configuration
                )(axios, operationBasePath || basePath)
        },
    }
}

/**
 * IngredientApi - factory interface
 * @export
 */
export const IngredientApiFactory = function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
) {
    const localVarFp = IngredientApiFp(configuration)
    return {
        /**
         *
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllIngredientsGet(options?: any): AxiosPromise<Array<Ingredient>> {
            return localVarFp
                .getAllIngredientsGet(options)
                .then((request) => request(axios, basePath))
        },
        /**
         *
         * @summary Get One
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOneIngredientsIdGet(
            id: string,
            options?: any
        ): AxiosPromise<Ingredient> {
            return localVarFp
                .getOneIngredientsIdGet(id, options)
                .then((request) => request(axios, basePath))
        },
    }
}

/**
 * IngredientApi - object-oriented interface
 * @export
 * @class IngredientApi
 * @extends {BaseAPI}
 */
export class IngredientApi extends BaseAPI {
    /**
     *
     * @summary Get All
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IngredientApi
     */
    public getAllIngredientsGet(options?: RawAxiosRequestConfig) {
        return IngredientApiFp(this.configuration)
            .getAllIngredientsGet(options)
            .then((request) => request(this.axios, this.basePath))
    }

    /**
     *
     * @summary Get One
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IngredientApi
     */
    public getOneIngredientsIdGet(id: string, options?: RawAxiosRequestConfig) {
        return IngredientApiFp(this.configuration)
            .getOneIngredientsIdGet(id, options)
            .then((request) => request(this.axios, this.basePath))
    }
}

/**
 * RecipeApi - axios parameter creator
 * @export
 */
export const RecipeApiAxiosParamCreator = function (
    configuration?: Configuration
) {
    return {
        /**
         *
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRecipesGet: async (
            options: RawAxiosRequestConfig = {}
        ): Promise<RequestArgs> => {
            const localVarPath = `/recipes`
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
            let baseOptions
            if (configuration) {
                baseOptions = configuration.baseOptions
            }

            const localVarRequestOptions = {
                method: 'GET',
                ...baseOptions,
                ...options,
            }
            const localVarHeaderParameter = {} as any
            const localVarQueryParameter = {} as any

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(
                localVarHeaderParameter,
                'OAuth2AuthorizationCodeBearer',
                [],
                configuration
            )

            setSearchParams(localVarUrlObj, localVarQueryParameter)
            let headersFromBaseOptions =
                baseOptions && baseOptions.headers ? baseOptions.headers : {}
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            }

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            }
        },
        /**
         *
         * @summary Get One
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOneRecipesIdGet: async (
            id: string,
            options: RawAxiosRequestConfig = {}
        ): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneRecipesIdGet', 'id', id)
            const localVarPath = `/recipes/{id}`.replace(
                `{${'id'}}`,
                encodeURIComponent(String(id))
            )
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
            let baseOptions
            if (configuration) {
                baseOptions = configuration.baseOptions
            }

            const localVarRequestOptions = {
                method: 'GET',
                ...baseOptions,
                ...options,
            }
            const localVarHeaderParameter = {} as any
            const localVarQueryParameter = {} as any

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(
                localVarHeaderParameter,
                'OAuth2AuthorizationCodeBearer',
                [],
                configuration
            )

            setSearchParams(localVarUrlObj, localVarQueryParameter)
            let headersFromBaseOptions =
                baseOptions && baseOptions.headers ? baseOptions.headers : {}
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            }

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            }
        },
    }
}

/**
 * RecipeApi - functional programming interface
 * @export
 */
export const RecipeApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = RecipeApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllRecipesGet(
            options?: RawAxiosRequestConfig
        ): Promise<
            (
                axios?: AxiosInstance,
                basePath?: string
            ) => AxiosPromise<Array<Recipe>>
        > {
            const localVarAxiosArgs =
                await localVarAxiosParamCreator.getAllRecipesGet(options)
            const index = configuration?.serverIndex ?? 0
            const operationBasePath =
                operationServerMap['RecipeApi.getAllRecipesGet']?.[index]?.url
            return (axios, basePath) =>
                createRequestFunction(
                    localVarAxiosArgs,
                    globalAxios,
                    BASE_PATH,
                    configuration
                )(axios, operationBasePath || basePath)
        },
        /**
         *
         * @summary Get One
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getOneRecipesIdGet(
            id: string,
            options?: RawAxiosRequestConfig
        ): Promise<
            (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Recipe>
        > {
            const localVarAxiosArgs =
                await localVarAxiosParamCreator.getOneRecipesIdGet(id, options)
            const index = configuration?.serverIndex ?? 0
            const operationBasePath =
                operationServerMap['RecipeApi.getOneRecipesIdGet']?.[index]?.url
            return (axios, basePath) =>
                createRequestFunction(
                    localVarAxiosArgs,
                    globalAxios,
                    BASE_PATH,
                    configuration
                )(axios, operationBasePath || basePath)
        },
    }
}

/**
 * RecipeApi - factory interface
 * @export
 */
export const RecipeApiFactory = function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
) {
    const localVarFp = RecipeApiFp(configuration)
    return {
        /**
         *
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRecipesGet(options?: any): AxiosPromise<Array<Recipe>> {
            return localVarFp
                .getAllRecipesGet(options)
                .then((request) => request(axios, basePath))
        },
        /**
         *
         * @summary Get One
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOneRecipesIdGet(id: string, options?: any): AxiosPromise<Recipe> {
            return localVarFp
                .getOneRecipesIdGet(id, options)
                .then((request) => request(axios, basePath))
        },
    }
}

/**
 * RecipeApi - object-oriented interface
 * @export
 * @class RecipeApi
 * @extends {BaseAPI}
 */
export class RecipeApi extends BaseAPI {
    /**
     *
     * @summary Get All
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecipeApi
     */
    public getAllRecipesGet(options?: RawAxiosRequestConfig) {
        return RecipeApiFp(this.configuration)
            .getAllRecipesGet(options)
            .then((request) => request(this.axios, this.basePath))
    }

    /**
     *
     * @summary Get One
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecipeApi
     */
    public getOneRecipesIdGet(id: string, options?: RawAxiosRequestConfig) {
        return RecipeApiFp(this.configuration)
            .getOneRecipesIdGet(id, options)
            .then((request) => request(this.axios, this.basePath))
    }
}

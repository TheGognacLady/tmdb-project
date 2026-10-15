import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const SCHEMA_VALIDATION_ERROR_CODE = 'TMDB_SCHEMA_VALIDATION_ERROR'

type ApiErrorContext = {
  endpoint: string
}

type ApiErrorDetails = {
  message: string
  toastId: string
  shouldToast: boolean
}

export const handleApiError = (
  error: FetchBaseQueryError,
  { endpoint }: ApiErrorContext,
): ApiErrorDetails => {
  switch (error.status) {
    case 400:
      return {
        message: 'Unable to complete the movie request. Please check the request parameters.',
        toastId: 'tmdb:bad-request',
        shouldToast: true,
      }
    case 401:
      return {
        message: 'Unable to access the movie service. Please try again later.',
        toastId: 'tmdb:unauthorized',
        shouldToast: true,
      }
    case 403:
      return {
        message: 'Access to the movie service is denied.',
        toastId: 'tmdb:forbidden',
        shouldToast: true,
      }
    case 404:
      if (endpoint === 'getMovieDetails') {
        return {
          message: 'Movie not found or details unavailable.',
          toastId: 'tmdb:movie-not-found',
          shouldToast: false,
        }
      }

      if (endpoint === 'getMovieCredits' || endpoint === 'getSimilarMovies') {
        return {
          message: 'Movie details are unavailable.',
          toastId: 'tmdb:movie-section-not-found',
          shouldToast: false,
        }
      }

      return {
        message: 'The requested movie data could not be found.',
        toastId: 'tmdb:not-found',
        shouldToast: true,
      }
    case 409:
      return {
        message: 'The movie request could not be completed due to a conflict.',
        toastId: 'tmdb:conflict',
        shouldToast: true,
      }
    case 422:
      return {
        message: 'Invalid movie request parameters.',
        toastId: 'tmdb:invalid-parameters',
        shouldToast: true,
      }
    case 429:
      return {
        message: 'Too many requests. Please wait and try again.',
        toastId: 'tmdb:rate-limit',
        shouldToast: true,
      }
    case 'FETCH_ERROR':
      return {
        message: 'Unable to connect to the movie service. Check your connection.',
        toastId: 'tmdb:network',
        shouldToast: true,
      }
    case 'TIMEOUT_ERROR':
      return {
        message: 'The movie service took too long to respond. Please try again.',
        toastId: 'tmdb:timeout',
        shouldToast: true,
      }
    case 'PARSING_ERROR':
      return {
        message: 'Unable to read the movie service response.',
        toastId: 'tmdb:parsing',
        shouldToast: true,
      }
    case 'CUSTOM_ERROR':
      if (
        typeof error.data === 'object' &&
        error.data !== null &&
        'code' in error.data &&
        error.data.code === SCHEMA_VALIDATION_ERROR_CODE
      ) {
        return {
          message: 'Unable to process the movie service response.',
          toastId: 'tmdb:schema',
          shouldToast: true,
        }
      }

      return {
        message: 'Unable to process the movie request.',
        toastId: 'tmdb:custom',
        shouldToast: true,
      }
    default:
      if (error.status >= 500 && error.status < 600) {
        return {
          message: 'The movie service is temporarily unavailable. Please try again later.',
          toastId: 'tmdb:server',
          shouldToast: true,
        }
      }

      return {
        message: 'Unable to complete the movie request.',
        toastId: 'tmdb:request',
        shouldToast: true,
      }
  }
}

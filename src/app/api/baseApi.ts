import { createApi } from '@reduxjs/toolkit/query/react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { baseQueryWithErrorHandling } from './baseQueryWithErrorHandling'
import { SCHEMA_VALIDATION_ERROR_CODE } from './handleApiError'
import { notifyApiError } from './notifyApiError'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithErrorHandling,
  catchSchemaFailure: (_schemaError, { endpoint }): FetchBaseQueryError => {
    const error: FetchBaseQueryError = {
      status: 'CUSTOM_ERROR',
      error: 'Movie data validation failed',
      data: { code: SCHEMA_VALIDATION_ERROR_CODE },
    }
    notifyApiError(error, endpoint)

    return error
  },
  endpoints: () => ({}),
})

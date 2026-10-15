import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { baseQuery } from './baseQuery'
import { notifyApiError } from './notifyApiError'

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && !api.signal.aborted) {
    notifyApiError(result.error, api.endpoint)
  }

  return result
}

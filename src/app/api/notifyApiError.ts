import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { errorToast } from './errorToast'
import { handleApiError } from './handleApiError'

export const notifyApiError = (error: FetchBaseQueryError, endpoint: string): void => {
  const { message, toastId, shouldToast } = handleApiError(error, { endpoint })

  if (shouldToast) {
    errorToast(message, { toastId })
  }
}

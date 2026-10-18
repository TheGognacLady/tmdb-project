import { QueryStatus } from '@reduxjs/toolkit/query'
import { baseApi } from '@/app/api/baseApi'
import { useAppSelector } from '@/app/model/hooks'
import type { RootState } from '@/app/model/store'

export const selectIsGlobalLoading = (state: RootState): boolean =>
  Object.values(state[baseApi.reducerPath].queries).some(
    (query) => query?.status === QueryStatus.pending,
  )

export const useGlobalLoading = () => useAppSelector(selectIsGlobalLoading)

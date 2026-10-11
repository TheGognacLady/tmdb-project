import { useSearchParams } from 'react-router-dom'
import { TMDB_MAX_PAGE } from '@/common/api/tmdb/tmdb.constants'
import { SearchForm } from '@/common/components'
import { SearchResults } from './SearchResults/SearchResults'
import styles from './SearchPage.module.css'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const confirmedQuery = searchParams.get('query')?.trim() ?? ''
  const pageParam = searchParams.get('page')
  const parsedPage = Number(pageParam)
  const currentPage = confirmedQuery && pageParam !== null && /^\d+$/.test(pageParam)
    && Number.isInteger(parsedPage) && parsedPage >= 1 && parsedPage <= TMDB_MAX_PAGE
    ? parsedPage
    : 1

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      const params = new URLSearchParams({ query: trimmedQuery })

      if (searchParams.toString() !== params.toString()) {
        setSearchParams(params)
      }
    }
  }

  const handleClear = () => {
    if (searchParams.toString()) {
      setSearchParams(new URLSearchParams())
    }
  }

  const handlePageChange = (page: number, replace = false) => {
    if (!confirmedQuery || !Number.isInteger(page) || page < 1 || page > TMDB_MAX_PAGE) {
      return
    }

    const params = new URLSearchParams({ query: confirmedQuery })

    if (page > 1) {
      params.set('page', String(page))
    }

    setSearchParams(params, { replace })
  }

  return (
    <section className={styles.page} aria-labelledby="search-title">
      <h1 className={styles.title} id="search-title">Search Movies</h1>
      <div className={styles.formWrapper}>
        <SearchForm
          key={confirmedQuery}
          initialValue={confirmedQuery}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>

      {confirmedQuery ? (
        <SearchResults
          query={confirmedQuery}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <p className={styles.message}>Enter a movie title to start searching</p>
      )}
    </section>
  )
}

import {type ChangeEvent, type SubmitEventHandler, useEffect, useState} from 'react'
import styles from './SearchForm.module.css'

type SearchFormProps = {
  onSearch: (query: string) => void
  initialValue?: string
}

export const SearchForm = ({ onSearch, initialValue = '' }: SearchFormProps) => {
  const [value, setValue] = useState(initialValue)
  const trimmedQuery = value.trim()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (trimmedQuery) {
      onSearch(trimmedQuery)
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>)=> {
    setValue(event.target.value)
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <input
        className={styles.input}
        type="search"
        name="query"
        value={value}
        onChange={onChangeHandler}
        placeholder="Search for a movie"
        aria-label="Search for a movie"
      />
      <button className={styles.button} type="submit" disabled={!trimmedQuery}>
        Search
      </button>
    </form>
  )
}

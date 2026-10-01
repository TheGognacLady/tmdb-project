export const getPaginationPages = (currentPage: number, totalPages: number): (number | '...')[] => {
  if (totalPages <= 1) {
    return []
  }

  const pages: (number | '...')[] = [1]
  const leftSibling = Math.max(2, currentPage - 1)
  const rightSibling = Math.min(totalPages - 1, currentPage + 1)

  if (leftSibling > 2) {
    pages.push('...')
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    pages.push(page)
  }

  if (rightSibling < totalPages - 1) {
    pages.push('...')
  }

  pages.push(totalPages)
  return pages
}

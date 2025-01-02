import { useRouter } from 'next/router'

export const handleFilterChange = (
  category: string,
  option: string,
  isChecked: boolean,
) => {
  const router = useRouter()
  const currentFilters = router.query
  const categoryFilters = (currentFilters[category] as string)?.split(',') || []

  // Update the filters based on the checkbox action
  const updatedFilters = isChecked
    ? [...categoryFilters, option]
    : categoryFilters.filter((item) => item !== option)

  const newQuery = { ...currentFilters }

  if (updatedFilters.length > 0) {
    // Add the updated filters to the query
    newQuery[category] = updatedFilters.join(',')
  } else {
    // Remove the category if no options are selected
    delete newQuery[category]
  }

  router.push({
    pathname: router.pathname,
    query: newQuery,
  })
}

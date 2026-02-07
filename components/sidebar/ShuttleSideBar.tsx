import { useRouter } from 'next/router'
import FilterSection from '../filter/FilterSection'

const ShuttleSidebar = () => {
  const router = useRouter()

  const handleFilterChange = (
    category: string,
    option: string,
    isChecked: boolean,
  ) => {
    const currentFilters = router.query
    const categoryFilters =
      (currentFilters[category] as string)?.split(',') || []

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

    // Reset the page to 1 whenever a filter is changed
    newQuery.page = '1'

    // Use router.replace instead of router.push to ensure the URL updates without adding to history
    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }, // Avoid full page reload
    )
  }

  return (
    <div className="flex-col space-y-4">
      <FilterSection
        title="Brand"
        options={[
          'Lining',
          'Yonex',
          'Victor',
          'VNB',
          'Taro',
          'Kamito'
        ]}
        selectedOptions={(router.query.brand as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('brand', option, isChecked)
        }
      />
      <FilterSection
        title="Shuttle Type"
        options={['Feather', 'Nylon', 'Plastic']}
        selectedOptions={(router.query.shuttle_type as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('shuttle_type', option, isChecked)
        }
      />
      <FilterSection
        title="Speed"
        options={['77', '76']}
        selectedOptions={(router.query.speed as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('speed', option, isChecked)
        }
      />
      {/* <FilterSection
        title="Weight"
        options={['3U', '4U', '5U']}
        selectedOptions={(router.query.weight as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('weight', option, isChecked)
        }
      />
      <FilterSection
        title="Stiffness"
        options={['Flexible', 'Medium', 'Stiff']}
        selectedOptions={(router.query.stiffness as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('stiffness', option, isChecked)
        }
      /> */}
    </div>
  )
}

export default ShuttleSidebar

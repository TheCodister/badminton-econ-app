import { Divider } from '@nextui-org/divider'
import { useRouter } from 'next/router'
import FilterSection from '../filter/FilterSection'

const Sidebar = () => {
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

    router.push({
      pathname: router.pathname,
      query: newQuery,
    })
  }

  return (
    <div className="w-[15%] xl:flex lg:flex md:hidden sm:hidden min-[20px]:hidden border-r-2 flex-col items-center px-4">
      <FilterSection
        title="Brand"
        options={['Lining', 'Yonex', 'Victor', 'Mizuno', 'Apacs']}
        selectedOptions={(router.query.brand as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('brand', option, isChecked)
        }
      />
      <Divider />
      <FilterSection
        title="Balance"
        options={['Head Heavy', 'Balance', 'Head Light']}
        selectedOptions={(router.query.balance as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('balance', option, isChecked)
        }
      />
      <Divider />
      <FilterSection
        title="Weight"
        options={['3U', '4U', '5U']}
        selectedOptions={(router.query.weight as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('weight', option, isChecked)
        }
      />
      <Divider />
      <FilterSection
        title="Stiffness"
        options={['Flexible', 'Medium', 'Stiff']}
        selectedOptions={(router.query.stiffness as string)?.split(',') || []}
        onChange={(option, isChecked) =>
          handleFilterChange('stiffness', option, isChecked)
        }
      />
    </div>
  )
}

export default Sidebar

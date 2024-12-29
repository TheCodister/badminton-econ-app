import { Checkbox } from '@nextui-org/checkbox'
import { Divider } from '@nextui-org/divider'
import { useState } from 'react'

// Reusable component for each filter section
const FilterSection = ({
  title,
  options,
  selectedOptions,
  onChange,
}: {
  title: string
  options: string[]
  selectedOptions: string[]
  onChange: (option: string, isChecked: boolean) => void
}) => {
  return (
    <section className="w-[80%] flex flex-col items-start pb-3">
      <h3>{title}</h3>
      {options.map((option) => (
        <Checkbox
          key={option}
          isSelected={selectedOptions.includes(option)}
          onChange={(e) => onChange(option, e.target.checked)}
        >
          {option}
        </Checkbox>
      ))}
    </section>
  )
}

const Sidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void
}) => {
  const [filters, setFilters] = useState({
    brand: [],
    balance: [],
    weight: [],
    stiffness: [],
  })

  const handleFilterChange = (
    category: keyof typeof filters,
    option: string,
    isChecked: boolean,
  ) => {
    const updatedCategory = isChecked
      ? [...filters[category], option]
      : filters[category].filter((item) => item !== option)

    const updatedFilters = { ...filters, [category]: updatedCategory }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="w-[15%] xl:flex lg:flex md:hidden sm:hidden min-[20px]:hidden border-r-2 flex-col items-center px-4">
      <FilterSection
        title="Brand"
        options={['Lining', 'Yonex', 'Victor', 'Mizuno', 'Apacs']}
        selectedOptions={filters.brand}
        onChange={(option, isChecked) =>
          handleFilterChange('brand', option, isChecked)
        }
      />
      <Divider />
      <FilterSection
        title="Balance"
        options={['Head Heavy', 'Balance', 'Head Light']}
        selectedOptions={filters.balance}
        onChange={(option, isChecked) =>
          handleFilterChange('balance', option, isChecked)
        }
      />
      <Divider />
      <FilterSection
        title="Weight"
        options={['3U: 85 - 89g', '4U: 80 - 84g', '5U: 75 - 79g']}
        selectedOptions={filters.weight}
        onChange={(option, isChecked) =>
          handleFilterChange('weight', option, isChecked)
        }
      />
      <Divider />
      <FilterSection
        title="Stiffness"
        options={['Hard', 'Medium', 'Flexible']}
        selectedOptions={filters.stiffness}
        onChange={(option, isChecked) =>
          handleFilterChange('stiffness', option, isChecked)
        }
      />
    </div>
  )
}

export default Sidebar

import { Checkbox, Divider } from '@nextui-org/react'

// Reusable component for each filter section
const FilterSection = ({
  title,
  options,
}: {
  title: string
  options: string[]
}) => {
  return (
    <section className="w-[80%] flex flex-col items-start pb-3">
      <h3>{title}</h3>
      {options.map((option, index) => (
        <Checkbox key={index}>{option}</Checkbox>
      ))}
    </section>
  )
}

const Sidebar = () => {
  return (
    <div className="w-[15%] xl:flex lg:flex md:hidden sm:hidden min-[20px]:hidden border-r-2 flex-col items-center px-4">
      <FilterSection
        title="Brand"
        options={['Lining', 'Yonex', 'Victor', 'Mizuno', 'Apacs']}
      />
      <Divider />
      <FilterSection
        title="Balance"
        options={['Head Heavy', 'Balance', 'Head Light']}
      />
      <Divider />
      <FilterSection
        title="Weight"
        options={['3U: 85 - 89g', '4U: 80 - 84g', '5U: 75 - 79g']}
      />
      <Divider />
      <FilterSection
        title="Stiffness"
        options={['Hard', 'Medium', 'Flexible']}
      />
    </div>
  )
}

export default Sidebar

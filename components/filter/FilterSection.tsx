import { Checkbox } from '@heroui/checkbox'

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
    <section className="w-75 gap-4 flex flex-col items-start bg-white p-6 rounded-xl shadow-md">
      <h4 className="font-bold">{title}</h4>
      <section className="flex flex-col gap-2 w-full">
        {options.map((option) => (
          <Checkbox
            key={option}
            isSelected={selectedOptions.includes(option)}
            onValueChange={(isSelected) => onChange(option, isSelected)}
          >
            {option}
          </Checkbox>
        ))}
      </section>
    </section>
  )
}

export default FilterSection

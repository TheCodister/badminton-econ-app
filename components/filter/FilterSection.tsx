import { Checkbox } from '@nextui-org/checkbox'

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
      <h3 className="font-bold mb-2">{title}</h3>
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
  )
}

export default FilterSection

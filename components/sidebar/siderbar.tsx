import { Checkbox, Divider } from '@nextui-org/react'
const Sidebar = () => {
  return (
    <div className="w-[15%] xl:block md:hidden sm:hidden border-r-2 flex flex-col items-center px-4">
      <section className="w-[80%] flex flex-col items-start pb-3">
        <h3>Brand</h3>
        <Checkbox>Lining</Checkbox>
        <Checkbox>Yonex</Checkbox>
        <Checkbox>Victor</Checkbox>
        <Checkbox>Mizuno</Checkbox>
        <Checkbox>Apacs</Checkbox>
      </section>
      <Divider />
      <section className="w-[80%] flex flex-col items-start pb-3">
        <h3>Balance</h3>
        <Checkbox>Head Heavy</Checkbox>
        <Checkbox>Balance</Checkbox>
        <Checkbox>Head Light</Checkbox>
      </section>
      <Divider />
      <section className="w-[80%] flex flex-col items-start pb-3">
        <h3>Weight</h3>
        <Checkbox>3U: 85 - 89g</Checkbox>
        <Checkbox>4U: 80 - 84g</Checkbox>
        <Checkbox>5U: 75 - 79g</Checkbox>
      </section>
      <Divider />
      <section className="w-[80%] flex flex-col items-start pb-3">
        <h3>Stiffness</h3>
        <Checkbox>Hard</Checkbox>
        <Checkbox>Medium</Checkbox>
        <Checkbox>Flexible</Checkbox>
      </section>
    </div>
  )
}
export default Sidebar

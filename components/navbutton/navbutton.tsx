import TriangleIcon from '@/icons/TriangleIcon'

interface NavButtonProps {
  onClick?: () => void
  disabled?: boolean
  reverse?: boolean // New prop to reverse the button or icon
}

const NavButton = ({
  onClick,
  disabled = false,
  reverse = false,
}: NavButtonProps) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined} // Prevent click if disabled
      className={`rounded-full bg-white aspect-square h-fit flex items-center justify-center cursor-pointer transition-transform ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${reverse ? 'rotate-180' : ''}`} // Rotate the whole button if `reverse` is true
    >
      <TriangleIcon width={40} />
    </div>
  )
}

export default NavButton

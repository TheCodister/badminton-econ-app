export const StiffnessConverter = (stiffness: string) => {
  if (stiffness.includes('Medium')) {
    return 50
  } else if (stiffness.includes('Extra Stiff')) {
    return 100
  } else if (stiffness.includes('Stiff')) {
    return 70
  } else if (stiffness.includes('Extra Flexible')) {
    return 10
  } else if (stiffness.includes('Flexible')) {
    return 30
  } else return 50
}

export const WeightConverter = (weight: string) => {
  if (weight.includes('4U')) {
    return 50
  } else if (weight.includes('3U')) {
    return 80
  } else if (weight.includes('2U')) {
    return 90
  } else if (weight.includes('5U')) {
    return 30
  }
}

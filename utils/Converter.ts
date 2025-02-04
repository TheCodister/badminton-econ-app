export const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[^a-z ]/g, '') // Convert to lowercase and remove non-alphabet characters

export const BalanceConverter = (balance: string) => {
  const normalized = normalizeString(balance)

  if (normalized.includes('head light')) return 30
  if (normalized.includes('even balance')) return 50
  if (normalized.includes('head heavy')) return 70
  if (normalized.includes('extra head heavy')) return 90

  return 50 // Default value
}

export const StiffnessConverter = (stiffness: string) => {
  const normalized = normalizeString(stiffness)

  if (normalized.includes('medium')) return 50
  if (normalized.includes('extra stiff')) return 100
  if (normalized.includes('stiff')) return 70
  if (normalized.includes('extra flexible')) return 10
  if (normalized.includes('flexible')) return 30

  return 50 // Default value
}

export const WeightConverter = (weight: string) => {
  const normalized = normalizeString(weight)

  if (normalized.includes('4u')) return 50
  if (normalized.includes('3u')) return 80
  if (normalized.includes('2u')) return 90
  if (normalized.includes('5u')) return 30

  return 50 // Default value
}

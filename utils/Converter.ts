export const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[^a-z ]/g, '') // Convert to lowercase and remove non-alphabet characters

export const BalanceConverter = (balance: string) => {
  const normalized = normalizeString(balance)

  if (normalized.includes('headlight')) return 30
  if (normalized.includes('evenbalance')) return 50
  if (normalized.includes('headheavy')) return 70
  if (normalized.includes('extraheadheavy')) return 90

  return 50 // Default value
}

export const StiffnessConverter = (stiffness: string) => {
  const normalized = normalizeString(stiffness)

  if (normalized.includes('medium')) return 50
  if (normalized.includes('extrastiff')) return 100
  if (normalized.includes('stiff')) return 70
  if (normalized.includes('extraflexible')) return 10
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

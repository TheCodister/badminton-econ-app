export const BalanceConverter = (balance: string) => {
  if (balance.includes('Head Light')) {
    return 30
  } else if (balance.includes('Even Balance')) {
    return 50
  } else if (balance.includes('Head Heavy')) {
    return 70
  } else if (balance.includes('Extra Head Heavy')) {
    return 90
  }
}

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

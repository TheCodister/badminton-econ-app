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

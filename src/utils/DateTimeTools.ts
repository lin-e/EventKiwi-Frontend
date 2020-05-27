const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const abrevMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

export const getLongDate = (date: Date) => {
  return (
    `${date.getDate()} ${months[date.getMonth()]}`
  )
}

export const getTime = (date: Date) => {
  return (
    `${date.toLocaleTimeString().substring(0, 5)}`
  )
}

export const getShortDate = (date: Date) => {
  return (
    `${date.getDate()} ${abrevMonths[date.getMonth()]}`
  )
}

export const sameDay = (date1: Date, date2: Date) => {
  return (
    date1.getUTCDate() === date2.getUTCDate()) &&
      (date1.getUTCMonth() === date2.getUTCMonth()) &&
      (date1.getUTCFullYear() === date2.getUTCFullYear()
  )
}
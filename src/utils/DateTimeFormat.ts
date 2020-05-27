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
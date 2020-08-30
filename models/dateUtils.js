function generateToday() {
  const y = String(new Date().getFullYear())
  const m = String(new Date().getMonth() + 1)
  const d = String(new Date().getDate())
  let limitDate = `${y}-${m}-${d}`
  if (m.length === 1 && d.length === 1) {
    limitDate = `${y}-0${m}-0${d}`
  } else if (m.length === 1) {
    limitDate = `${y}-0${m}-${d}`
  } else if (d.length === 1) {
    limitDate = `${y}-${m}-0${d}`
  }
  return limitDate
}

module.exports = generateToday()
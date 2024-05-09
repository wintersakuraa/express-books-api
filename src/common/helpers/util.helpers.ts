const getPageOffset = (page = 1, limit = 10): number => {
  return (page - 1) * limit
}

const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0

export { getPageOffset, isObjectEmpty }

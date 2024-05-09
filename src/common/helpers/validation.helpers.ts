import { UUID_REGEX } from '../constants/regex.constants'

const isValidUUID = (uuid: string) => UUID_REGEX.test(uuid)

export { isValidUUID }

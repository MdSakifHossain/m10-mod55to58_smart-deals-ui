const isDev = import.meta.env.DEV

const logger = (...args) => isDev && console.log(...args)

export default logger

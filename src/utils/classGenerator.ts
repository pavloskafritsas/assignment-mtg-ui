const separator = '--'

export const generateClass = (component: string, value: string) =>
  [component, value].join(separator)

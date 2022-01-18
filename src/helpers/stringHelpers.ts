export const formatString = (text: string, values: Record<string, string>): string =>
  text.replace(/{([a-zA-Z_]+)}/g, (match: string, word: string): string => match && values[word]);

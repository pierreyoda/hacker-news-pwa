export { registerFilters } from "./filters";

export const pluralize = (list: any[], singular: string, plural: string): string =>
    list.length > 1 ? plural : singular;
;

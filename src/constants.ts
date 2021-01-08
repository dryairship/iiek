// Defaults
export const MAX_FUN_LEVEL = 15;
export const MAX_FOOD_LEVEL = 20;
export const INITIAL_MONEY = 1000;
export const NOTEBOOK_COST = 100;

// Regular Expressions
export const gotoRegex = new RegExp('^Go to (?:the|a)?\\s?([a-zA-Z0-9, ]+)\\.$');
export const scheduleRegex = new RegExp('^Follow Maggu Schedule ([0-9]+)\\.$');
export const introduceRegex = new RegExp('^Introduce\\.$');
export const buyNotebooksRegex = new RegExp('^Buy ([0-9]+) notebooks\\.$');

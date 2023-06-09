// Defaults
export const MAX_FUN_LEVEL = 15;
export const MAX_FOOD_LEVEL = 20;
export const INITIAL_MONEY = 1000;

export const NOTEBOOK_COST = 100;
export const COPYING_COST = 20;

// Regular Expressions
export const gotoRegex = new RegExp('^Go to (?:the|a)?\\s?([a-zA-Z0-9, ]+)\\.$');
export const defineScheduleRegex = new RegExp('^Define Maggu Schedule ([0-9]+)\\.$');
export const endDefinitionRegex = new RegExp('^End definition\\.$');
export const followScheduleRegex = new RegExp('^Follow Maggu Schedule ([0-9]+)\\.$');
export const ifRegex = new RegExp('^If notebook ([0-9]+) notes are complete then follow Maggu Schedule ([0-9]+)(?: else follow Maggu Schedule ([0-9]+))?\\.$');
export const introduceRegex = new RegExp('^Introduce\\.$');
export const buyNotebooksRegex = new RegExp('^Buy ([0-9]+) notebooks?\\.$');
export const takeNotesRegex = new RegExp('^Take notes in notebook ([0-9]+)\\.$');
export const copyNotesRegex = new RegExp('^Copy notes from notebook ([0-9]+) to notebook ([0-9]+)\\.$');

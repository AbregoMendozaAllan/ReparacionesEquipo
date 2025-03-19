export const dateParser = (obj, key) => {
    if (obj[key]) {
        obj[key] = new Date(obj[key]).toISOString().split('T')[0];
    }
    return obj;
};

export const parseDatesInQueryResult = (queryResult, key) => {
    return queryResult.map(obj => dateParser(obj, key));
};

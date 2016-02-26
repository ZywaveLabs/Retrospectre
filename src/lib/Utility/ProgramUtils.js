/* eslint-disable */
ProgramUtils = {};


/**
 * ValueOrDefault - Returns the value if not undefined, default otherwise.
 * @param  {var} value        Value to check
 * @param  {var} defaultValue Value that is returned if value is undefined
 * @return {var}              Value
 */
ProgramUtils.ValueOrDefault = function(value, defaultValue) {
     return typeof value !== "undefined" ? value : defaultValue;
};


/**
 * DefaultObjectValues - Takes an entire object and compares values on it
 * to check if they are assigned, if not, will use default values.
 * @param  {Object} object        Object to check
 * @param  {Object} defaultObject description
 * @return {type}               description
 */
ProgramUtils.DefaultObjectValues = function(object, defaultObject) {
    var newObject = {};
    for(var key in defaultObject){
        if(typeof defaultObject[key] === "object"){
            if(typeof object[key] === "undefined"){
                newObject[key] = defaultObject[key];
            } else {
                newObject[key] = ProgramUtils.DefaultObjectValues(object[key]);
            }
        } else {
            newObject[key] = ProgramUtils.ValueOrDefault(object[key], defaultObject[key]);
        }
    }
    return newObject;
};

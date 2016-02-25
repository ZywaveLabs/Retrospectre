/* eslint-disable */
MathUtils = {};

/**
 * GetRandomInt - Returns a random integer between min (included) and max (excluded)
 *  Using Math.round() will give you a non-uniform distribution!
 *
 * @param  {integer} min Minimum integer (Included)
 * @param  {integer} max Maximum integer (Excluded)
 * @return {integer}     description
 */
MathUtils.GetRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

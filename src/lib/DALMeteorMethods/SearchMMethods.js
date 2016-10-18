
/* eslint-disable */
/* global Cards:true CardMethods: true*/

/**
* @param searchFieldMap
*/
getMongoQueryObjectFromSearch = function (searchFieldMap) {
    var filterQuery = Session.get("searchQuery");
    if(filterQuery === undefined) {
        return [{}];
    }

    var mongoQueryObject = [{}];
    for(var key in filterQuery) {
        var valuesToFilter = filterQuery[key];

        for(var value in valuesToFilter) {
            var mongoSearchCriteria;
            key = getMappedField(key, searchFieldMap);

            if(key === "") {
                mongoSearchCriteria = {$where: function() {
                    for(var objKey in this) {
                        if(searchFieldMap[objKey] === undefined) {
                            continue;
                        }
                        if(this[objKey].toString().match(new RegExp(valuesToFilter[value], "i"))) {
                            return true;
                        }
                    }
                    return false;
                }};
            } else {
                mongoSearchCriteria = createRegexObject(key, valuesToFilter[value]);
            }

            mongoQueryObject.push(mongoSearchCriteria);
        }
    }
    return mongoQueryObject;
};

function createRegexObject(key, value) {
    var obj = {};
    obj[key] = {$regex: new RegExp(value, "i")};
    return obj;
}


function getMappedField(key, fieldMap) {
    var mappedKey = "";
    for(var k in fieldMap) {
        if(fieldMap[k] === undefined) {
            continue;
        }
        if(key === k || fieldMap[k].includes(key)) {
            return k;
        }
    }
    return mappedKey;
}
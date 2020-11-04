"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ratio = exports.Coffee = exports.Water = exports.isRight = exports.isLeft = void 0;
var Units = {
    Millilitre: 'millilitre',
    Gram: 'gram'
};
var makeLeft = function (val) { return ({
    tag: 'left',
    result: val
}); };
var makeRight = function (error) { return ({
    tag: 'right',
    error: error
}); };
exports.isLeft = function (x) {
    var xs = x;
    if (xs.tag === 'left' && xs.result !== undefined) {
        return true;
    }
    return false;
};
exports.isRight = function (x) {
    var xs = x;
    if (xs.tag === 'right') {
        return true;
    }
    return false;
};
exports.Water = {
    /**
     * Converts litres to millilitres. 1 litre = 1000 ml
     */
    fromLitres: function (volume) {
        return makeLeft({
            value: volume * 1000,
            type: Units.Millilitre
        });
    },
    /**
     * Converts gallons to millilitres. 1 gallon = 3785.41178 ml
     */
    fromGallons: function (volume) {
        return makeLeft({
            value: volume * 3785.41178,
            type: Units.Millilitre
        });
    },
    /**
     * Converts millilitres to millilitres. 1 millilitre = 1 millilitre
     */
    fromMillilitres: function (volume) {
        return makeLeft({
            value: volume,
            type: Units.Millilitre
        });
    },
    /**
     * Converts fluid ounces (Fl.oz) to millilitres. 1 fl.oz = 28.4130625 millilitre
     *
     * If US is set to true, will convert to US Fl.Oz (1 US fl.oz = 29.5735295625 millilitre)
     */
    fromFluidOunces: function (volume, US) {
        if (US === void 0) { US = false; }
        return makeLeft({
            value: US === true ? volume * 29.5735295625 : volume * 28.4130625,
            type: Units.Millilitre
        });
    },
    /**
     * Converts grams to millilitres. 1 gram of water = 1 millilitre
     *
     */
    fromGrams: function (weight) {
        return makeLeft({
            value: weight,
            type: Units.Millilitre
        });
    },
    /**
     * Calculates required water amount (in millilitres) for given ratio and coffee amount.
     */
    fromRatioAndCoffeeAmount: function (ratio, coffeeAmount) {
        if (ratio === 0) {
            return makeRight(new Error('Cannot divide by zero'));
        }
        if (exports.isRight(coffeeAmount)) {
            return makeRight(new Error('Coffee amount is invalid'));
        }
        return makeLeft({
            value: coffeeAmount.result.value / ratio,
            type: Units.Millilitre
        });
    }
};
exports.Coffee = {
    /**
     * Converts kilograms to grams. 1 kilogram = 1000 grams
     */
    fromKilograms: function (weight) {
        return makeLeft({
            value: weight * 1000,
            type: Units.Gram
        });
    },
    /**
     * Converts grams to grams. 1 gram = 1 gram
     */
    fromGrams: function (weight) {
        return makeLeft({
            value: weight,
            type: Units.Gram
        });
    },
    /**
     * Converts ounces to grams. 1 ounce = 28.34952 grams
     */
    fromOunces: function (weight) {
        return makeLeft({
            value: weight * 28.34952,
            type: Units.Gram
        });
    },
    /**
     * Calculates required coffee amount (in millilitres) for given ratio and water amount.
     */
    fromRatioAndWaterAmount: function (ratio, waterAmount) {
        return makeLeft({
            value: ratio * waterAmount.value,
            type: Units.Gram
        });
    }
};
exports.Ratio = {
    /**
     * Returns the coffee ratio in the format of 1 gram : ml.
     *
     * Example:
     *
     * For 10 grams of coffee and 180 millilitres of water, this function will return 0,055555555555556 or 1:18.
     */
    calculate: function (coffeeAmount, waterAmount) {
        if (exports.isRight(coffeeAmount)) {
            return makeRight(new Error('Coffee value is invalid'));
        }
        if (exports.isRight(waterAmount)) {
            return makeRight(new Error('Water amount is invalid'));
        }
        if (coffeeAmount.result.value === 0) {
            return makeRight(new Error('Coffee value is 0, cannot divide by zero'));
        }
        return makeLeft({
            ratio: 1 / (waterAmount.result.value / coffeeAmount.result.value),
            formattedRatio: "1:" + waterAmount.result.value / coffeeAmount.result.value,
            ratioParts: {
                firstPart: 1,
                secondPart: waterAmount.result.value / coffeeAmount.result.value
            },
            total: function (cups) {
                if (cups === void 0) { cups = 1; }
                if (cups < 0) {
                    return makeRight(new Error('Cups must be equal or greater than 1'));
                }
                return makeLeft({
                    water: {
                        value: cups * waterAmount.result.value,
                        type: Units.Millilitre
                    },
                    coffee: {
                        value: cups * coffeeAmount.result.value,
                        type: Units.Gram
                    }
                });
            }
        });
    }
};
//# sourceMappingURL=index.js.map
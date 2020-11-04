declare const Units: {
    readonly Millilitre: "millilitre";
    readonly Gram: "gram";
};
declare type Left<T> = {
    tag: 'left';
    result: T;
};
declare type Right = {
    tag: 'right';
    error: Error;
};
export declare const isLeft: <T>(x: unknown) => x is Left<T>;
export declare const isRight: (x: unknown) => x is Right;
declare type Result<T> = Left<T> | Right;
declare type WaterAmount = {
    value: number;
    type: typeof Units.Millilitre;
};
declare type CoffeeAmount = {
    value: number;
    type: typeof Units.Gram;
};
export declare const Water: {
    /**
     * Converts litres to millilitres. 1 litre = 1000 ml
     */
    fromLitres: (volume: number) => Result<WaterAmount>;
    /**
     * Converts gallons to millilitres. 1 gallon = 3785.41178 ml
     */
    fromGallons: (volume: number) => Result<WaterAmount>;
    /**
     * Converts millilitres to millilitres. 1 millilitre = 1 millilitre
     */
    fromMillilitres: (volume: number) => Result<WaterAmount>;
    /**
     * Converts fluid ounces (Fl.oz) to millilitres. 1 fl.oz = 28.4130625 millilitre
     *
     * If US is set to true, will convert to US Fl.Oz (1 US fl.oz = 29.5735295625 millilitre)
     */
    fromFluidOunces: (volume: number, US?: boolean) => Result<WaterAmount>;
    /**
     * Converts grams to millilitres. 1 gram of water = 1 millilitre
     *
     */
    fromGrams: (weight: number) => Result<WaterAmount>;
    /**
     * Calculates required water amount (in millilitres) for given ratio and coffee amount.
     */
    fromRatioAndCoffeeAmount: (ratio: number, coffeeAmount: Result<CoffeeAmount>) => Result<WaterAmount>;
};
export declare const Coffee: {
    /**
     * Converts kilograms to grams. 1 kilogram = 1000 grams
     */
    fromKilograms: (weight: number) => Result<CoffeeAmount>;
    /**
     * Converts grams to grams. 1 gram = 1 gram
     */
    fromGrams: (weight: number) => Result<CoffeeAmount>;
    /**
     * Converts ounces to grams. 1 ounce = 28.34952 grams
     */
    fromOunces: (weight: number) => Result<CoffeeAmount>;
    /**
     * Calculates required coffee amount (in millilitres) for given ratio and water amount.
     */
    fromRatioAndWaterAmount: (ratio: number, waterAmount: {
        value: number;
        type: 'gram';
    }) => Result<CoffeeAmount>;
};
declare type TotalResult = {
    water: {
        value: number;
        type: typeof Units.Millilitre;
    };
    coffee: {
        value: number;
        type: typeof Units.Gram;
    };
};
declare type Calculation = {
    ratio: number;
    formattedRatio: string;
    ratioParts: {
        firstPart: number;
        secondPart: number;
    };
    total: (cups?: number) => Result<TotalResult>;
};
export declare const Ratio: {
    /**
     * Returns the coffee ratio in the format of 1 gram : ml.
     *
     * Example:
     *
     * For 10 grams of coffee and 180 millilitres of water, this function will return 0,055555555555556 or 1:18.
     */
    calculate: (coffeeAmount: Result<CoffeeAmount>, waterAmount: Result<WaterAmount>) => Result<Calculation>;
};
export {};

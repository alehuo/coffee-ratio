const Units = {
  Millilitre: 'millilitre',
  Gram: 'gram'
} as const

type Left<T> = {
  tag: 'left';
  result: T;
};

type Right = {
  tag: 'right';
  error: Error;
};

const makeLeft = <T>(val: T): Left<T> => ({
  tag: 'left',
  result: val
})

const makeRight = (error: Error): Right => ({
  tag: 'right',
  error
})

export const isLeft = <T>(x: unknown): x is Left<T> => {
  const xs = x as any
  if (xs.tag === 'left' && xs.result !== undefined) {
    return true
  }
  return false
}

export const isRight = (x: unknown): x is Right => {
  const xs = x as any
  if (xs.tag === 'right') {
    return true
  }
  return false
}

type Result<T> = Left<T> | Right;

/*
const gcd = (a: number, b: number) => {
  a = Math.abs(a)
  b = Math.abs(b)
  if (b > a) {
    const temp = a
    a = b
    b = temp
  }
  while (true) {
    if (b === 0) {
      return a
    }
    a %= b
    if (a === 0) {
      return b
    }
    b %= a
  }
}
*/

type WaterAmount = {
  value: number;
  type: typeof Units.Millilitre;
};

type CoffeeAmount = {
  value: number;
  type: typeof Units.Gram;
};

export const Water = {
  /**
   * Converts litres to millilitres. 1 litre = 1000 ml
   */
  fromLitres: (volume: number): Result<WaterAmount> =>
    makeLeft({
      value: volume * 1000,
      type: Units.Millilitre
    }),
  /**
   * Converts gallons to millilitres. 1 gallon = 3785.41178 ml
   */
  fromGallons: (volume: number): Result<WaterAmount> =>
    makeLeft({
      value: volume * 3785.41178,
      type: Units.Millilitre
    }),
  /**
   * Converts millilitres to millilitres. 1 millilitre = 1 millilitre
   */
  fromMillilitres: (volume: number): Result<WaterAmount> =>
    makeLeft({
      value: volume,
      type: Units.Millilitre
    }),
  /**
   * Converts fluid ounces (Fl.oz) to millilitres. 1 fl.oz = 28.4130625 millilitre
   *
   * If US is set to true, will convert to US Fl.Oz (1 US fl.oz = 29.5735295625 millilitre)
   */
  fromFluidOunces: (volume: number, US = false): Result<WaterAmount> =>
    makeLeft({
      value: US === true ? volume * 29.5735295625 : volume * 28.4130625,
      type: Units.Millilitre
    }),

  /**
   * Converts grams to millilitres. 1 gram of water = 1 millilitre
   *
   */
  fromGrams: (weight: number): Result<WaterAmount> =>
    makeLeft({
      value: weight,
      type: Units.Millilitre
    }),

  /**
   * Calculates required water amount (in millilitres) for given ratio and coffee amount.
   */
  fromRatioAndCoffeeAmount: (
    ratio: number,
    coffeeAmount: Result<CoffeeAmount>
  ): Result<WaterAmount> => {
    if (ratio === 0) {
      return makeRight(new Error('Cannot divide by zero'))
    }
    if (isRight(coffeeAmount)) {
      return makeRight(new Error('Coffee amount is invalid'))
    }
    return makeLeft({
      value: coffeeAmount.result.value / ratio,
      type: Units.Millilitre
    })
  }
}

export const Coffee = {
  /**
   * Converts kilograms to grams. 1 kilogram = 1000 grams
   */
  fromKilograms: (weight: number): Result<CoffeeAmount> =>
    makeLeft({
      value: weight * 1000,
      type: Units.Gram
    }),
  /**
   * Converts grams to grams. 1 gram = 1 gram
   */
  fromGrams: (weight: number): Result<CoffeeAmount> =>
    makeLeft({
      value: weight,
      type: Units.Gram
    }),
  /**
   * Converts ounces to grams. 1 ounce = 28.34952 grams
   */
  fromOunces: (weight: number): Result<CoffeeAmount> =>
    makeLeft({
      value: weight * 28.34952,
      type: Units.Gram
    }),

  /**
   * Calculates required coffee amount (in millilitres) for given ratio and water amount.
   */
  fromRatioAndWaterAmount: (
    ratio: number,
    waterAmount: {
      value: number;
      type: 'gram';
    }
  ): Result<CoffeeAmount> => {
    return makeLeft({
      value: ratio * waterAmount.value,
      type: Units.Gram
    })
  }
}

type TotalResult = {
  water: {
    value: number;
    type: typeof Units.Millilitre;
  };
  coffee: {
    value: number;
    type: typeof Units.Gram;
  };
}

type Calculation = {
  ratio: number;
  formattedRatio: string;
  ratioParts: {
    firstPart: number;
    secondPart: number;
  };
  total: (
    cups?: number
  ) => Result<TotalResult>
};

export const Ratio = {
  /**
   * Returns the coffee ratio in the format of 1 gram : ml.
   *
   * Example:
   *
   * For 10 grams of coffee and 180 millilitres of water, this function will return 0,055555555555556 or 1:18.
   */
  calculate: (
    coffeeAmount: Result<CoffeeAmount>,
    waterAmount: Result<WaterAmount>
  ): Result<Calculation> => {
    if (isRight(coffeeAmount)) {
      return makeRight(new Error('Coffee value is invalid'))
    }
    if (isRight(waterAmount)) {
      return makeRight(new Error('Water amount is invalid'))
    }
    if (coffeeAmount.result.value === 0) {
      return makeRight(new Error('Coffee value is 0, cannot divide by zero'))
    }
    return makeLeft({
      ratio: 1 / (waterAmount.result.value / coffeeAmount.result.value),
      formattedRatio: `1:${
        waterAmount.result.value / coffeeAmount.result.value
      }`,
      ratioParts: {
        firstPart: 1,
        secondPart: waterAmount.result.value / coffeeAmount.result.value
      },
      total: function (cups = 1) {
        if (cups < 0) {
          return makeRight(new Error('Cups must be equal or greater than 1'))
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
        })
      }
    })
  }
}

# coffee-ratio

[![npm version](https://badge.fury.io/js/%40alehuo%2Fcoffee-ratio.svg)](https://badge.fury.io/js/%40alehuo%2Fcoffee-ratio)

## Introduction

`coffee-ratio` is a zero-dependency, must-have tool for all coffee artisans. With `coffee-ratio`, you can calculate coffee ratios for the perfect brew. Measuring how much water & coffee beans you need is also made possible with this library.

## Installation

`npm install --save @alehuo/coffee-ratio`

TypeScript typings are included out of the box.

## Usage

**Case 1:** What is the coffee ratio with 40 grams of coffee beans and 200 grams of water?

```typescript
import { Water, Coffee, Ratio, isLeft } from "@alehuo/coffee-ratio";
const ratioResult = Ratio.calculate(Coffee.fromGrams(40), Water.fromGrams(200));
if (isLeft(ratioResult)) {
  console.log(ratioResult.result);
  /*
    {
        "ratio": 0.2,
        "ratioParts": {
            "firstPart": 1,
            "secondPart": 5
        },
        "total": [Function: total]
    }
    */
}
```

You can use the `total` function to calculate required ingredients for any amount of cups you want to brew:

```typescript
// Using ratioResult from the earlier piece of code
const totalResult = ratioResult.result.total(10);
if (isLeft(ratioResult)) {
  console.log(ratioResult.result);
  /*
    {
        water: {
            value: 2000,
            type: "millilitre"
        },
        coffee: {
            value: 4000;
            type: "gram";
        }
    }
    */
}
```

**Case 2:** I want to brew coffee with 1:9 ratio. How much water do I need when I have 45 grams of coffee beans?

```typescript
import { Water, Coffee, isLeft } from "@alehuo/coffee-ratio";
const waterAmount = Water.fromRatioAndCoffeeAmount(1 / 9, Coffee.fromGrams(45));
if (isLeft(waterAmount)) {
  console.log(waterAmount.result);
  /*
    {
        "value": 414,
        "type": "millilitre"
    }
    */
}
```

## License

MIT license.
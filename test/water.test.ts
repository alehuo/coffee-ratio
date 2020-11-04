import { Coffee, isLeft, isRight, Water } from '../src'

describe('Volume', () => {
  it('Should convert 10 litres to millilitres', (done) => {
    const res = Water.fromLitres(10)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(10000)
    expect(r.type).toStrictEqual('millilitre')
    done()
  })
  it('Should convert 5.5 litres to millilitres', (done) => {
    const res = Water.fromLitres(5.5)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(5500)
    expect(r.type).toStrictEqual('millilitre')
    done()
  })
  it('Should convert 1 gallon to millilitres', (done) => {
    const res = Water.fromGallons(1)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(3785.41178)
    expect(r.type).toStrictEqual('millilitre')
    done()
  })
  it('Should convert millilitres to millilitres', (done) => {
    const res = Water.fromMillilitres(100)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(100)
    expect(r.type).toStrictEqual('millilitre')
    done()
  })
  it('Should convert fl.oz to millilitres', (done) => {
    const res = Water.fromFluidOunces(100)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(2841.30625)
    expect(r.type).toStrictEqual('millilitre')
    done()
  })
  it('Should convert US fl.oz to millilitres', (done) => {
    const res = Water.fromFluidOunces(100, true)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(2957.35295625)
    expect(r.type).toStrictEqual('millilitre')
    done()
  })
  it('Should show correct water amount for the README.md example', (done) => {
    const waterAmount = Water.fromRatioAndCoffeeAmount(1 / 9, Coffee.fromGrams(46))
    if (isLeft(waterAmount)) {
      expect(waterAmount.result.value).toStrictEqual(414)
      expect(waterAmount.result.type).toEqual('millilitre')
      done()
    }
  })
})

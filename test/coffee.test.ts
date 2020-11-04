import { Coffee, isRight } from '../src'

describe('Weight', () => {
  it('Should convert 1 kilogram to grams', (done) => {
    const res = Coffee.fromKilograms(1)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(1000)
    expect(r.type).toStrictEqual('gram')
    done()
  })
  it('Should convert 5.5 kilograms to grams', (done) => {
    const res = Coffee.fromKilograms(5.5)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(5500)
    expect(r.type).toStrictEqual('gram')
    done()
  })
  it('Should convert 2 ounces to grams', (done) => {
    const res = Coffee.fromOunces(2)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(56.69904)
    expect(r.type).toStrictEqual('gram')
    done()
  })
  it('Should convert 1 ounce to grams', (done) => {
    const res = Coffee.fromOunces(1)
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.value).toStrictEqual(28.34952)
    expect(r.type).toStrictEqual('gram')
    done()
  })
})

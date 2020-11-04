import { Ratio, Water, Coffee, isRight } from '../src/index'

describe('Ratio', () => {
  it('Should show correct ratio for 20 grams of coffee per 180 ml water', (done) => {
    const res = Ratio.calculate(
      Coffee.fromGrams(20),
      Water.fromMillilitres(180)
    )
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.ratio).toStrictEqual(0.1111111111111111)
    expect(r.formattedRatio).toStrictEqual('1:9')
    expect(r.ratioParts.firstPart).toStrictEqual(1)
    expect(r.ratioParts.secondPart).toStrictEqual(9)
    done()
  })

  it('Should show correct ratio for 450 grams of coffee per 2000 ml water', (done) => {
    const res = Ratio.calculate(
      Coffee.fromGrams(450),
      Water.fromMillilitres(2000)
    )
    if (isRight(res)) {
      throw new Error('Ratio is invalid')
    }
    expect(res.tag).toEqual('left')
    const r = res.result
    expect(r.ratio).toStrictEqual(0.22499999999999998)
    expect(r.formattedRatio).toStrictEqual('1:4.444444444444445')
    expect(r.ratioParts.firstPart).toStrictEqual(1)
    expect(r.ratioParts.secondPart).toStrictEqual(4.444444444444445)
    done()
  })
})

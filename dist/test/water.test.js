"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('Volume', function () {
    it('Should convert 10 litres to millilitres', function (done) {
        var res = src_1.Water.fromLitres(10);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(10000);
        expect(r.type).toStrictEqual('millilitre');
        done();
    });
    it('Should convert 5.5 litres to millilitres', function (done) {
        var res = src_1.Water.fromLitres(5.5);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(5500);
        expect(r.type).toStrictEqual('millilitre');
        done();
    });
    it('Should convert 1 gallon to millilitres', function (done) {
        var res = src_1.Water.fromGallons(1);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(3785.41178);
        expect(r.type).toStrictEqual('millilitre');
        done();
    });
    it('Should convert millilitres to millilitres', function (done) {
        var res = src_1.Water.fromMillilitres(100);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(100);
        expect(r.type).toStrictEqual('millilitre');
        done();
    });
    it('Should convert fl.oz to millilitres', function (done) {
        var res = src_1.Water.fromFluidOunces(100);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(2841.30625);
        expect(r.type).toStrictEqual('millilitre');
        done();
    });
    it('Should convert US fl.oz to millilitres', function (done) {
        var res = src_1.Water.fromFluidOunces(100, true);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(2957.35295625);
        expect(r.type).toStrictEqual('millilitre');
        done();
    });
    it('Should show correct water amount for the README.md example', function (done) {
        var waterAmount = src_1.Water.fromRatioAndCoffeeAmount(1 / 9, src_1.Coffee.fromGrams(46));
        if (src_1.isLeft(waterAmount)) {
            expect(waterAmount.result.value).toStrictEqual(414);
            expect(waterAmount.result.type).toEqual('millilitre');
            done();
        }
    });
});
//# sourceMappingURL=water.test.js.map
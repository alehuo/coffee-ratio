"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
describe('Ratio', function () {
    it('Should show correct ratio for 20 grams of coffee per 180 ml water', function (done) {
        var res = index_1.Ratio.calculate(index_1.Coffee.fromGrams(20), index_1.Water.fromMillilitres(180));
        if (index_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.ratio).toStrictEqual(0.1111111111111111);
        expect(r.formattedRatio).toStrictEqual('1:9');
        expect(r.ratioParts.firstPart).toStrictEqual(1);
        expect(r.ratioParts.secondPart).toStrictEqual(9);
        done();
    });
    it('Should show correct ratio for 450 grams of coffee per 2000 ml water', function (done) {
        var res = index_1.Ratio.calculate(index_1.Coffee.fromGrams(450), index_1.Water.fromMillilitres(2000));
        if (index_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.ratio).toStrictEqual(0.22499999999999998);
        expect(r.formattedRatio).toStrictEqual('1:4.444444444444445');
        expect(r.ratioParts.firstPart).toStrictEqual(1);
        expect(r.ratioParts.secondPart).toStrictEqual(4.444444444444445);
        done();
    });
});
//# sourceMappingURL=ratio.test.js.map
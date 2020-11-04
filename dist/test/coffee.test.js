"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('Weight', function () {
    it('Should convert 1 kilogram to grams', function (done) {
        var res = src_1.Coffee.fromKilograms(1);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(1000);
        expect(r.type).toStrictEqual('gram');
        done();
    });
    it('Should convert 5.5 kilograms to grams', function (done) {
        var res = src_1.Coffee.fromKilograms(5.5);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(5500);
        expect(r.type).toStrictEqual('gram');
        done();
    });
    it('Should convert 2 ounces to grams', function (done) {
        var res = src_1.Coffee.fromOunces(2);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(56.69904);
        expect(r.type).toStrictEqual('gram');
        done();
    });
    it('Should convert 1 ounce to grams', function (done) {
        var res = src_1.Coffee.fromOunces(1);
        if (src_1.isRight(res)) {
            throw new Error('Ratio is invalid');
        }
        expect(res.tag).toEqual('left');
        var r = res.result;
        expect(r.value).toStrictEqual(28.34952);
        expect(r.type).toStrictEqual('gram');
        done();
    });
});
//# sourceMappingURL=coffee.test.js.map
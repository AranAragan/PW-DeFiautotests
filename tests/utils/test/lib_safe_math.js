"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const utils_1 = require("@0x/utils");
const ReferenceFunctions = __importStar(require("../src/reference_functions"));
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
function toBigNumber(a) {
    return new utils_1.BigNumber(a);
}
(0, contracts_test_utils_1.blockchainTests)('SafeMath', env => {
    const { ONE_ETHER } = contracts_test_utils_1.constants;
    let safeMath;
    before(async () => {
        // Deploy SafeMath
        safeMath = await wrappers_1.TestLibSafeMathContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLibSafeMath, env.provider, env.txDefaults, {});
    });
    (0, contracts_test_utils_1.describe)('safeMul', () => {
        it('should match the output of the reference function', async () => {
            const a = ONE_ETHER;
            const b = ONE_ETHER.times(2);
            const expected = ReferenceFunctions.safeMul(a, b);
            const actual = await safeMath.externalSafeMul(a, b).callAsync();
            (0, contracts_test_utils_1.expect)(actual).bignumber.to.be.eq(expected);
        });
        it('should return zero if first argument is zero', async () => {
            const result = await safeMath.externalSafeMul(contracts_test_utils_1.constants.ZERO_AMOUNT, toBigNumber(1)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should return zero if second argument is zero', async () => {
            const result = await safeMath.externalSafeMul(toBigNumber(1), contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should revert if the multiplication overflows', async () => {
            const a = toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'); // The largest uint256 number
            const b = toBigNumber(2);
            const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, a, b);
            return (0, contracts_test_utils_1.expect)(safeMath.externalSafeMul(a, b).callAsync()).to.revertWith(expectedError);
        });
        it("should calculate correct value for values that don't overflow", async () => {
            const result = await safeMath.externalSafeMul(toBigNumber(15), toBigNumber(13)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(195));
        });
    });
    (0, contracts_test_utils_1.describe)('safeDiv', () => {
        it('should match the output of the reference function', async () => {
            const a = ONE_ETHER;
            const b = ONE_ETHER.times(2);
            const expected = ReferenceFunctions.safeDiv(a, b);
            const actual = await safeMath.externalSafeDiv(a, b).callAsync();
            (0, contracts_test_utils_1.expect)(actual).bignumber.to.be.eq(expected);
        });
        it('should return the correct value if both values are the same', async () => {
            const result = await safeMath.externalSafeDiv(toBigNumber(1), toBigNumber(1)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(1));
        });
        it('should return the correct value if the values are different', async () => {
            const result = await safeMath.externalSafeDiv(toBigNumber(3), toBigNumber(2)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(1));
        });
        it('should return zero if the numerator is smaller than the denominator', async () => {
            const result = await safeMath.externalSafeDiv(toBigNumber(2), toBigNumber(3)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should return zero if first argument is zero', async () => {
            const result = await safeMath.externalSafeDiv(contracts_test_utils_1.constants.ZERO_AMOUNT, toBigNumber(1)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should revert if second argument is zero', async () => {
            const a = toBigNumber(1);
            const b = toBigNumber(0);
            const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.DivisionByZero, a, b);
            return (0, contracts_test_utils_1.expect)(safeMath.externalSafeDiv(a, b).callAsync()).to.revertWith(expectedError);
        });
    });
    (0, contracts_test_utils_1.describe)('safeSub', () => {
        it('should match the output of the reference function', async () => {
            const a = ONE_ETHER;
            const b = ONE_ETHER.dividedToIntegerBy(2);
            const expected = ReferenceFunctions.safeSub(a, b);
            const actual = await safeMath.externalSafeSub(a, b).callAsync();
            (0, contracts_test_utils_1.expect)(actual).bignumber.to.be.eq(expected);
        });
        it('should revert if the subtraction underflows', async () => {
            const a = toBigNumber(0);
            const b = toBigNumber(1);
            const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.SubtractionUnderflow, a, b);
            return (0, contracts_test_utils_1.expect)(safeMath.externalSafeSub(a, b).callAsync()).to.revertWith(expectedError);
        });
        it('should calculate correct value for values that are equal', async () => {
            const result = await safeMath.externalSafeMul(contracts_test_utils_1.constants.ZERO_AMOUNT, contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should calculate correct value for values that are not equal', async () => {
            const result = await safeMath.externalSafeSub(toBigNumber(15), toBigNumber(13)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(2));
        });
    });
    (0, contracts_test_utils_1.describe)('safeAdd', () => {
        it('should match the output of the reference function', async () => {
            const a = ONE_ETHER;
            const b = ONE_ETHER.dividedToIntegerBy(2);
            const expected = ReferenceFunctions.safeAdd(a, b);
            const actual = await safeMath.externalSafeAdd(a, b).callAsync();
            (0, contracts_test_utils_1.expect)(actual).bignumber.to.be.eq(expected);
        });
        it('should revert if the addition overflows', async () => {
            const a = toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'); // The largest uint256 number
            const b = toBigNumber(1);
            const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.AdditionOverflow, a, b);
            return (0, contracts_test_utils_1.expect)(safeMath.externalSafeAdd(a, b).callAsync()).to.revertWith(expectedError);
        });
        it('should calculate correct value if addition does not overflow', async () => {
            const result = await safeMath.externalSafeAdd(toBigNumber(15), toBigNumber(13)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(28));
        });
        it('should calculate correct value if first argument is zero', async () => {
            const result = await safeMath.externalSafeAdd(contracts_test_utils_1.constants.ZERO_AMOUNT, toBigNumber(13)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(13));
        });
        it('should calculate correct value if second argument is zero', async () => {
            const result = await safeMath.externalSafeAdd(toBigNumber(13), contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(13));
        });
    });
    (0, contracts_test_utils_1.describe)('maxUint256', () => {
        it('should return first argument if it is greater than the second', async () => {
            const result = await safeMath.externalMaxUint256(toBigNumber(13), contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(13));
        });
        it('should return first argument if it is equal the second', async () => {
            const result = await safeMath.externalMaxUint256(contracts_test_utils_1.constants.ZERO_AMOUNT, contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should return second argument if it is greater than the first', async () => {
            const result = await safeMath.externalMaxUint256(contracts_test_utils_1.constants.ZERO_AMOUNT, toBigNumber(13)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(13));
        });
    });
    (0, contracts_test_utils_1.describe)('minUint256', () => {
        it('should return first argument if it is less than the second', async () => {
            const result = await safeMath.externalMaxUint256(contracts_test_utils_1.constants.ZERO_AMOUNT, toBigNumber(13)).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(13));
        });
        it('should return first argument if it is equal the second', async () => {
            const result = await safeMath.externalMaxUint256(contracts_test_utils_1.constants.ZERO_AMOUNT, contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(contracts_test_utils_1.constants.ZERO_AMOUNT);
        });
        it('should return second argument if it is less than the first', async () => {
            const result = await safeMath.externalMaxUint256(toBigNumber(13), contracts_test_utils_1.constants.ZERO_AMOUNT).callAsync();
            (0, contracts_test_utils_1.expect)(result).bignumber.to.be.eq(toBigNumber(13));
        });
    });
});

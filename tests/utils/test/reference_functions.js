"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const utils_1 = require("@0x/utils");
const reference_functions_1 = require("../src/reference_functions");
(0, contracts_test_utils_1.describe)('Reference Functions', () => {
    const { ONE_ETHER, MAX_UINT256, ZERO_AMOUNT } = contracts_test_utils_1.constants;
    const DEFAULT_VALUES = {
        a: ONE_ETHER.times(2),
        b: ONE_ETHER,
    };
    (0, contracts_test_utils_1.describe)('SafeMath', () => {
        (0, contracts_test_utils_1.describe)('safeAdd', () => {
            it('adds two numbers', () => {
                const { a, b } = DEFAULT_VALUES;
                const expected = a.plus(b);
                const actual = (0, reference_functions_1.safeAdd)(a, b);
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts on overflow', () => {
                const a = MAX_UINT256.dividedToIntegerBy(2);
                const b = MAX_UINT256.dividedToIntegerBy(2).plus(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.AdditionOverflow, a, b);
                (0, contracts_test_utils_1.expect)(() => (0, reference_functions_1.safeAdd)(a, b)).to.throw(expectedError.message);
            });
        });
        (0, contracts_test_utils_1.describe)('safeSub', () => {
            it('subracts two numbers', () => {
                const { a, b } = DEFAULT_VALUES;
                const expected = a.minus(b);
                const actual = (0, reference_functions_1.safeSub)(a, b);
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts on underflow', () => {
                const a = MAX_UINT256.dividedToIntegerBy(2);
                const b = MAX_UINT256.dividedToIntegerBy(2).plus(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.SubtractionUnderflow, a, b);
                (0, contracts_test_utils_1.expect)(() => (0, reference_functions_1.safeSub)(a, b)).to.throw(expectedError.message);
            });
        });
        (0, contracts_test_utils_1.describe)('safeMul', () => {
            it('multiplies two numbers', () => {
                const { a, b } = DEFAULT_VALUES;
                const expected = a.times(b);
                const actual = (0, reference_functions_1.safeMul)(a, b);
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts on overflow', () => {
                const a = MAX_UINT256.dividedToIntegerBy(2);
                const b = MAX_UINT256.dividedToIntegerBy(2).plus(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, a, b);
                (0, contracts_test_utils_1.expect)(() => (0, reference_functions_1.safeMul)(a, b)).to.throw(expectedError.message);
            });
        });
        (0, contracts_test_utils_1.describe)('safeDiv', () => {
            it('multiplies two numbers', () => {
                const { a, b } = DEFAULT_VALUES;
                const expected = a.times(b);
                const actual = (0, reference_functions_1.safeMul)(a, b);
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts if denominator is zero', () => {
                const a = MAX_UINT256.dividedToIntegerBy(2);
                const b = ZERO_AMOUNT;
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.DivisionByZero, a, b);
                (0, contracts_test_utils_1.expect)(() => (0, reference_functions_1.safeDiv)(a, b)).to.throw(expectedError.message);
            });
        });
    });
});

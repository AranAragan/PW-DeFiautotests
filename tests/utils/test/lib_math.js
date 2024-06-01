"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const utils_1 = require("@0x/utils");
const reference_functions_1 = require("../src/reference_functions");
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
(0, contracts_test_utils_1.blockchainTests)('LibMath', env => {
    const { ONE_ETHER, MAX_UINT256, MAX_UINT256_ROOT, ZERO_AMOUNT } = contracts_test_utils_1.constants;
    let libsContract;
    before(async () => {
        libsContract = await wrappers_1.TestLibMathContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLibMath, env.provider, env.txDefaults, {});
    });
    // Wrap a reference function with identical arguments in a promise.
    function createAsyncReferenceFunction(ref) {
        return async (...args) => {
            return ref(...args);
        };
    }
    function createContractTestFunction(name) {
        return async (...args) => {
            return libsContract[name](...args).callAsync;
        };
    }
    (0, contracts_test_utils_1.describe)('getPartialAmountFloor', () => {
        contracts_test_utils_1.describe.optional('combinatorial tests', () => {
            (0, contracts_test_utils_1.testCombinatoriallyWithReferenceFunc)('getPartialAmountFloor', createAsyncReferenceFunction(reference_functions_1.getPartialAmountFloor), createContractTestFunction('getPartialAmountFloor'), [contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values]);
        });
        (0, contracts_test_utils_1.describe)('explicit tests', () => {
            it('matches the reference function output', async () => {
                const numerator = ONE_ETHER;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = ONE_ETHER.times(0.01);
                const expected = (0, reference_functions_1.getPartialAmountFloor)(numerator, denominator, target);
                const actual = await libsContract.getPartialAmountFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('rounds down when computing the partial amount', async () => {
                const numerator = ONE_ETHER.times(0.6);
                const denominator = ONE_ETHER.times(1.8);
                const target = ONE_ETHER;
                const expected = ONE_ETHER.dividedToIntegerBy(3);
                const actual = await libsContract.getPartialAmountFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts if `denominator` is zero', async () => {
                const numerator = ONE_ETHER;
                const denominator = ZERO_AMOUNT;
                const target = ONE_ETHER.times(0.01);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.DivisionByZero, numerator.times(target), denominator);
                return (0, contracts_test_utils_1.expect)(libsContract.getPartialAmountFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `numerator * target` overflows', async () => {
                const numerator = MAX_UINT256;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = MAX_UINT256_ROOT.times(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, numerator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.getPartialAmountFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
        });
    });
    (0, contracts_test_utils_1.describe)('getPartialAmountCeil', () => {
        contracts_test_utils_1.describe.optional('combinatorial tests', () => {
            (0, contracts_test_utils_1.testCombinatoriallyWithReferenceFunc)('getPartialAmountCeil', createAsyncReferenceFunction(reference_functions_1.getPartialAmountCeil), createContractTestFunction('getPartialAmountCeil'), [contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values]);
        });
        (0, contracts_test_utils_1.describe)('explicit tests', () => {
            it('matches the reference function output', async () => {
                const numerator = ONE_ETHER;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = ONE_ETHER.times(0.01);
                const expected = (0, reference_functions_1.getPartialAmountCeil)(numerator, denominator, target);
                const actual = await libsContract.getPartialAmountCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('rounds up when computing the partial amount', async () => {
                const numerator = ONE_ETHER.times(0.6);
                const denominator = ONE_ETHER.times(1.8);
                const target = ONE_ETHER;
                const expected = ONE_ETHER.dividedToIntegerBy(3).plus(1);
                const actual = await libsContract.getPartialAmountCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts if `denominator` is zero', async () => {
                const numerator = ONE_ETHER;
                const denominator = ZERO_AMOUNT;
                const target = ONE_ETHER.times(0.01);
                // This will actually manifest as a subtraction underflow.
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.SubtractionUnderflow, denominator, new utils_1.BigNumber(1));
                return (0, contracts_test_utils_1.expect)(libsContract.getPartialAmountCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `numerator * target` overflows', async () => {
                const numerator = MAX_UINT256;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = MAX_UINT256_ROOT.times(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, numerator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.getPartialAmountCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
        });
    });
    (0, contracts_test_utils_1.describe)('safeGetPartialAmountFloor', () => {
        contracts_test_utils_1.describe.optional('combinatorial tests', () => {
            (0, contracts_test_utils_1.testCombinatoriallyWithReferenceFunc)('safeGetPartialAmountFloor', createAsyncReferenceFunction(reference_functions_1.safeGetPartialAmountFloor), createContractTestFunction('safeGetPartialAmountFloor'), [contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values]);
        });
        (0, contracts_test_utils_1.describe)('explicit tests', () => {
            it('matches the reference function output', async () => {
                const numerator = ONE_ETHER;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = ONE_ETHER.times(0.01);
                const expected = (0, reference_functions_1.safeGetPartialAmountFloor)(numerator, denominator, target);
                const actual = await libsContract.safeGetPartialAmountFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('rounds down when computing the partial amount', async () => {
                const numerator = ONE_ETHER.times(0.6);
                const denominator = ONE_ETHER.times(1.8);
                const target = ONE_ETHER;
                const expected = ONE_ETHER.dividedToIntegerBy(3);
                const actual = await libsContract.safeGetPartialAmountFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts for a rounding error', async () => {
                const numerator = new utils_1.BigNumber(1e3);
                const denominator = new utils_1.BigNumber(1e4);
                const target = new utils_1.BigNumber(333);
                const expectedError = new utils_1.LibMathRevertErrors.RoundingError(numerator, denominator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.safeGetPartialAmountFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `denominator` is zero', async () => {
                const numerator = ONE_ETHER;
                const denominator = ZERO_AMOUNT;
                const target = ONE_ETHER.times(0.01);
                const expectedError = new utils_1.LibMathRevertErrors.DivisionByZeroError();
                return (0, contracts_test_utils_1.expect)(libsContract.safeGetPartialAmountFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `numerator * target` overflows', async () => {
                const numerator = MAX_UINT256;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = MAX_UINT256_ROOT.times(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, numerator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.safeGetPartialAmountFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
        });
    });
    (0, contracts_test_utils_1.describe)('safeGetPartialAmountCeil', () => {
        contracts_test_utils_1.describe.optional('combinatorial tests', () => {
            (0, contracts_test_utils_1.testCombinatoriallyWithReferenceFunc)('safeGetPartialAmountCeil', createAsyncReferenceFunction(reference_functions_1.safeGetPartialAmountCeil), createContractTestFunction('safeGetPartialAmountCeil'), [contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values]);
        });
        (0, contracts_test_utils_1.describe)('explicit tests', () => {
            it('matches the reference function output', async () => {
                const numerator = ONE_ETHER;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = ONE_ETHER.times(0.01);
                const expected = (0, reference_functions_1.safeGetPartialAmountCeil)(numerator, denominator, target);
                const actual = await libsContract.safeGetPartialAmountCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('rounds up when computing the partial amount', async () => {
                const numerator = ONE_ETHER.times(0.6);
                const denominator = ONE_ETHER.times(1.8);
                const target = ONE_ETHER;
                const expected = ONE_ETHER.dividedToIntegerBy(3).plus(1);
                const actual = await libsContract.safeGetPartialAmountCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.bignumber.eq(expected);
            });
            it('reverts for a rounding error', async () => {
                const numerator = new utils_1.BigNumber(1e3);
                const denominator = new utils_1.BigNumber(1e4);
                const target = new utils_1.BigNumber(333);
                const expectedError = new utils_1.LibMathRevertErrors.RoundingError(numerator, denominator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.safeGetPartialAmountCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `denominator` is zero', async () => {
                const numerator = ONE_ETHER;
                const denominator = ZERO_AMOUNT;
                const target = ONE_ETHER.times(0.01);
                const expectedError = new utils_1.LibMathRevertErrors.DivisionByZeroError();
                return (0, contracts_test_utils_1.expect)(libsContract.safeGetPartialAmountCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `numerator * target` overflows', async () => {
                const numerator = MAX_UINT256;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = MAX_UINT256_ROOT.times(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, numerator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.safeGetPartialAmountCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
        });
    });
    (0, contracts_test_utils_1.describe)('isRoundingErrorFloor', () => {
        contracts_test_utils_1.describe.optional('combinatorial tests', () => {
            (0, contracts_test_utils_1.testCombinatoriallyWithReferenceFunc)('isRoundingErrorFloor', createAsyncReferenceFunction(reference_functions_1.isRoundingErrorFloor), createContractTestFunction('isRoundingErrorFloor'), [contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values]);
        });
        (0, contracts_test_utils_1.describe)('explicit tests', () => {
            it('returns true when `numerator * target / denominator` produces an error >= 0.1%', async () => {
                const numerator = new utils_1.BigNumber(100);
                const denominator = new utils_1.BigNumber(102);
                const target = new utils_1.BigNumber(52);
                const actual = await libsContract.isRoundingErrorFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.eq(true);
            });
            it('returns false when `numerator * target / denominator` produces an error < 0.1%', async () => {
                const numerator = new utils_1.BigNumber(100);
                const denominator = new utils_1.BigNumber(101);
                const target = new utils_1.BigNumber(92);
                const actual = await libsContract.isRoundingErrorFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.eq(false);
            });
            it('matches the reference function output', async () => {
                const numerator = ONE_ETHER;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = ONE_ETHER.times(0.01);
                const expected = (0, reference_functions_1.isRoundingErrorFloor)(numerator, denominator, target);
                const actual = await libsContract.isRoundingErrorFloor(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.eq(expected);
            });
            it('reverts if `denominator` is zero', async () => {
                const numerator = ONE_ETHER;
                const denominator = ZERO_AMOUNT;
                const target = ONE_ETHER.times(0.01);
                const expectedError = new utils_1.LibMathRevertErrors.DivisionByZeroError();
                return (0, contracts_test_utils_1.expect)(libsContract.isRoundingErrorFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `numerator * target` overflows', async () => {
                const numerator = MAX_UINT256;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = MAX_UINT256_ROOT.times(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, numerator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.isRoundingErrorFloor(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
        });
    });
    (0, contracts_test_utils_1.describe)('isRoundingErrorCeil', () => {
        contracts_test_utils_1.describe.optional('combinatorial tests', () => {
            (0, contracts_test_utils_1.testCombinatoriallyWithReferenceFunc)('isRoundingErrorCeil', createAsyncReferenceFunction(reference_functions_1.isRoundingErrorCeil), createContractTestFunction('isRoundingErrorCeil'), [contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values, contracts_test_utils_1.uint256Values]);
        });
        (0, contracts_test_utils_1.describe)('explicit tests', () => {
            it('returns true when `numerator * target / (denominator - 1)` produces an error >= 0.1%', async () => {
                const numerator = new utils_1.BigNumber(100);
                const denominator = new utils_1.BigNumber(101);
                const target = new utils_1.BigNumber(92);
                const actual = await libsContract.isRoundingErrorCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.eq(true);
            });
            it('returns false when `numerator * target / (denominator - 1)` produces an error < 0.1%', async () => {
                const numerator = new utils_1.BigNumber(100);
                const denominator = new utils_1.BigNumber(102);
                const target = new utils_1.BigNumber(52);
                const actual = await libsContract.isRoundingErrorCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.eq(false);
            });
            it('matches the reference function output', async () => {
                const numerator = ONE_ETHER;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = ONE_ETHER.times(0.01);
                const expected = (0, reference_functions_1.isRoundingErrorCeil)(numerator, denominator, target);
                const actual = await libsContract.isRoundingErrorCeil(numerator, denominator, target).callAsync();
                (0, contracts_test_utils_1.expect)(actual).to.eq(expected);
            });
            it('reverts if `denominator` is zero', async () => {
                const numerator = ONE_ETHER;
                const denominator = ZERO_AMOUNT;
                const target = ONE_ETHER.times(0.01);
                const expectedError = new utils_1.LibMathRevertErrors.DivisionByZeroError();
                return (0, contracts_test_utils_1.expect)(libsContract.isRoundingErrorCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
            it('reverts if `numerator * target` overflows', async () => {
                const numerator = MAX_UINT256;
                const denominator = ONE_ETHER.dividedToIntegerBy(2);
                const target = MAX_UINT256_ROOT.times(2);
                const expectedError = new utils_1.SafeMathRevertErrors.Uint256BinOpError(utils_1.SafeMathRevertErrors.BinOpErrorCodes.MultiplicationOverflow, numerator, target);
                return (0, contracts_test_utils_1.expect)(libsContract.isRoundingErrorCeil(numerator, denominator, target).callAsync()).to.revertWith(expectedError);
            });
        });
    });
});

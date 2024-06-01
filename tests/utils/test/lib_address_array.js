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
const dev_utils_1 = require("@0x/dev-utils");
const utils_1 = require("@0x/utils");
const chai = __importStar(require("chai"));
const _ = __importStar(require("lodash"));
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
contracts_test_utils_1.chaiSetup.configure();
const expect = chai.expect;
const blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(contracts_test_utils_1.web3Wrapper);
describe('LibAddressArray', () => {
    let lib;
    before(async () => {
        await blockchainLifecycle.startAsync();
        // Deploy LibAddressArray
        lib = await wrappers_1.TestLibAddressArrayContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLibAddressArray, contracts_test_utils_1.provider, contracts_test_utils_1.txDefaults, artifacts_1.artifacts);
    });
    after(async () => {
        await blockchainLifecycle.revertAsync();
    });
    describe('append', () => {
        it('should append to empty array', async () => {
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const result = await lib.publicAppend([], addr).callAsync();
            const expected = [addr];
            expect(result).to.deep.equal(expected);
        });
        it('should append to non-empty array', async () => {
            const arr = _.times(3, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const expected = [...arr, addr];
            const result = await lib.publicAppend(arr, addr).callAsync();
            expect(result).to.deep.equal(expected);
        });
        it('should revert if the free memory pointer was moved to before the end of the array', async () => {
            const arr = _.times(3, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const freeMemOffset = new utils_1.BigNumber(-1);
            const addressArrayEndPtr = new utils_1.BigNumber(256);
            const expectedError = new utils_1.LibAddressArrayRevertErrors.MismanagedMemoryError(addressArrayEndPtr.plus(freeMemOffset), addressArrayEndPtr);
            return expect(lib.testAppendRealloc(arr, freeMemOffset, addr).callAsync()).to.revertWith(expectedError);
        });
        it('should keep the same memory address if free memory pointer does not move', async () => {
            const arr = _.times(3, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const freeMemOffset = new utils_1.BigNumber(0);
            const expected = [...arr, addr];
            const [result, oldArrayMemStart, newArrayMemStart] = await lib
                .testAppendRealloc(arr, freeMemOffset, addr)
                .callAsync();
            expect(result).to.deep.equal(expected);
            expect(newArrayMemStart).bignumber.to.be.equal(oldArrayMemStart);
        });
        it('should change memory address if free memory pointer advances', async () => {
            const arr = _.times(3, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const freeMemOffset = new utils_1.BigNumber(1);
            const expectedArray = [...arr, addr];
            const [result, oldArrayMemStart, newArrayMemStart] = await lib
                .testAppendRealloc(arr, freeMemOffset, addr)
                .callAsync();
            // The new location should be the end of the old array + freeMemOffset.
            const expectedNewArrayMemStart = oldArrayMemStart.plus((arr.length + 1) * 32).plus(freeMemOffset);
            expect(result).to.deep.equal(expectedArray);
            expect(newArrayMemStart).bignumber.to.be.equal(expectedNewArrayMemStart);
        });
    });
    describe('contains', () => {
        it('should return false on an empty array', async () => {
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const isFound = await lib.publicContains([], addr).callAsync();
            expect(isFound).to.equal(false);
        });
        it('should return false on a missing item', async () => {
            const arr = _.times(3, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const isFound = await lib.publicContains(arr, addr).callAsync();
            expect(isFound).to.equal(false);
        });
        it('should return true on an included item', async () => {
            const arr = _.times(4, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = _.sample(arr);
            const isFound = await lib.publicContains(arr, addr).callAsync();
            expect(isFound).to.equal(true);
        });
        it('should return true on the only item in the array', async () => {
            const arr = _.times(1, () => (0, contracts_test_utils_1.randomAddress)());
            const isFound = await lib.publicContains(arr, arr[0]).callAsync();
            expect(isFound).to.equal(true);
        });
    });
    describe('indexOf', () => {
        it('should fail on an empty array', async () => {
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const [isSuccess] = await lib.publicIndexOf([], addr).callAsync();
            expect(isSuccess).to.equal(false);
        });
        it('should fail on a missing item', async () => {
            const arr = _.times(3, () => (0, contracts_test_utils_1.randomAddress)());
            const addr = (0, contracts_test_utils_1.randomAddress)();
            const [isSuccess] = await lib.publicIndexOf(arr, addr).callAsync();
            expect(isSuccess).to.equal(false);
        });
        it('should succeed on an included item', async () => {
            const arr = _.times(4, () => (0, contracts_test_utils_1.randomAddress)());
            const expectedIndexOf = _.random(0, arr.length - 1);
            const addr = arr[expectedIndexOf];
            const [isSuccess, index] = await lib.publicIndexOf(arr, addr).callAsync();
            expect(isSuccess).to.equal(true);
            expect(index).bignumber.to.equal(expectedIndexOf);
        });
        it('should succeed on the only item in the array', async () => {
            const arr = _.times(1, () => (0, contracts_test_utils_1.randomAddress)());
            const [isSuccess, index] = await lib.publicIndexOf(arr, arr[0]).callAsync();
            expect(isSuccess).to.equal(true);
            expect(index).bignumber.to.equal(0);
        });
    });
});

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
const chai = __importStar(require("chai"));
const utils_1 = require("@0x/utils");
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
contracts_test_utils_1.chaiSetup.configure();
const expect = chai.expect;
const blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(contracts_test_utils_1.web3Wrapper);
describe('ReentrancyGuard', () => {
    let guard;
    before(async () => {
        await blockchainLifecycle.startAsync();
        // Deploy TestReentrancyGuard
        guard = await wrappers_1.TestReentrancyGuardContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestReentrancyGuard, contracts_test_utils_1.provider, contracts_test_utils_1.txDefaults, {});
    });
    after(async () => {
        await blockchainLifecycle.revertAsync();
    });
    describe('nonReentrant', () => {
        it('should revert if reentrancy occurs', async () => {
            const expectedError = new utils_1.ReentrancyGuardRevertErrors.IllegalReentrancyError();
            return expect(guard.guarded(true).sendTransactionAsync()).to.revertWith(expectedError);
        });
        it('should succeed if reentrancy does not occur', async () => {
            const isSuccessful = await guard.guarded(false).callAsync();
            expect(isSuccessful).to.be.true();
        });
    });
});

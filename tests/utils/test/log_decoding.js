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
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
contracts_test_utils_1.chaiSetup.configure();
const expect = chai.expect;
const blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(contracts_test_utils_1.web3Wrapper);
describe('TestLogDecoding', () => {
    let testLogDecodingWithDependencies;
    let testLogDecodingDeployedWithoutDependencies;
    const expectedEvent = {
        foo: new utils_1.BigNumber(256),
        bar: '0x1234',
        car: '4321',
    };
    const expectedDownstreamEvent = {
        lorem: new utils_1.BigNumber(256),
        ipsum: '4321',
    };
    const emptyDependencyList = {};
    before(async () => {
        testLogDecodingDeployedWithoutDependencies = await wrappers_1.TestLogDecodingContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLogDecoding, contracts_test_utils_1.provider, contracts_test_utils_1.txDefaults, emptyDependencyList);
        testLogDecodingWithDependencies = await wrappers_1.TestLogDecodingContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLogDecoding, contracts_test_utils_1.provider, contracts_test_utils_1.txDefaults, artifacts_1.artifacts);
    });
    beforeEach(async () => {
        await blockchainLifecycle.startAsync();
    });
    afterEach(async () => {
        await blockchainLifecycle.revertAsync();
    });
    describe('Decoding Log Arguments', () => {
        it('should decode locally emitted event args when no dependencies are passed into wrapper', async () => {
            const txReceipt = await testLogDecodingDeployedWithoutDependencies
                .emitEvent()
                .awaitTransactionSuccessAsync();
            expect(txReceipt.logs.length).to.be.equal(1);
            expect(txReceipt.logs[0].args).to.be.deep.equal(expectedEvent);
        });
        it('should not decode event args when no dependencies are passed into wrapper', async () => {
            const txReceipt = await testLogDecodingDeployedWithoutDependencies
                .emitEventDownstream()
                .awaitTransactionSuccessAsync();
            expect(txReceipt.logs.length).to.be.equal(1);
            expect(txReceipt.logs[0].args).to.be.undefined();
        });
        it('should decode args for local but not downstream event when no dependencies are passed into wrapper', async () => {
            const txReceipt = await testLogDecodingDeployedWithoutDependencies
                .emitEventsLocalAndDownstream()
                .awaitTransactionSuccessAsync();
            expect(txReceipt.logs.length).to.be.equal(2);
            expect(txReceipt.logs[0].args).to.be.deep.equal(expectedEvent);
            expect(txReceipt.logs[1].args).to.be.undefined();
        });
        it('should decode locally emitted event args when dependencies are passed into wrapper', async () => {
            const txReceipt = await testLogDecodingWithDependencies.emitEvent().awaitTransactionSuccessAsync();
            expect(txReceipt.logs.length).to.be.equal(1);
            expect(txReceipt.logs[0].args).to.be.deep.equal(expectedEvent);
        });
        it('should decode downstream event args when dependencies are passed into wrapper', async () => {
            const txReceipt = await testLogDecodingWithDependencies
                .emitEventDownstream()
                .awaitTransactionSuccessAsync();
            expect(txReceipt.logs.length).to.be.equal(1);
            expect(txReceipt.logs[0].args).to.be.deep.equal(expectedDownstreamEvent);
        });
        it('should decode args for both local and downstream events when dependencies are passed into wrapper', async () => {
            const txReceipt = await testLogDecodingWithDependencies
                .emitEventsLocalAndDownstream()
                .awaitTransactionSuccessAsync();
            expect(txReceipt.logs.length).to.be.equal(2);
            expect(txReceipt.logs[0].args).to.be.deep.equal(expectedEvent);
            expect(txReceipt.logs[1].args).to.be.deep.equal(expectedDownstreamEvent);
        });
    });
});

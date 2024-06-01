"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const utils_1 = require("@0x/utils");
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
(0, contracts_test_utils_1.blockchainTests)('Refundable', env => {
    let refundable;
    let receiver;
    const ONE_HUNDRED = new utils_1.BigNumber(100);
    const ONE_THOUSAND = new utils_1.BigNumber(1000);
    before(async () => {
        // Create the refundable contract.
        refundable = await wrappers_1.TestRefundableContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestRefundable, env.provider, env.txDefaults, {});
        // Create the receiver contract.
        receiver = await wrappers_1.TestRefundableReceiverContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestRefundableReceiver, env.provider, env.txDefaults, {});
    });
    // The contents of these typescript tests is not adequate to understand the assertions that are made during
    // these calls. For a more accurate picture, checkout out "./contracts/test/TestRefundableReceiver.sol". Specifically,
    // the function `testRefundNonzeroBalance()` is used in this test suite.
    contracts_test_utils_1.blockchainTests.resets('refundNonzeroBalance', () => {
        it('should not send a refund when no value is sent', async () => {
            // Send 100 wei to the refundable contract that should be refunded.
            await receiver.testRefundNonZeroBalance(refundable.address).awaitTransactionSuccessAsync({
                value: contracts_test_utils_1.constants.ZERO_AMOUNT,
            });
        });
        it('should send a full refund when nonzero value is sent', async () => {
            // Send 100 wei to the refundable contract that should be refunded.
            await receiver.testRefundNonZeroBalance(refundable.address).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
    });
    // The contents of these typescript tests is not adequate to understand the assertions that are made during
    // these calls. For a more accurate picture, checkout out "./contracts/test/TestRefundableReceiver.sol".
    contracts_test_utils_1.blockchainTests.resets('refundFinalBalance', () => {
        it('should fully refund the sender when `shouldNotRefund` is false', async () => {
            // Send 100 wei to the refundable contract that should be refunded to the receiver contract.
            await receiver.testRefundFinalBalance(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
        // This test may not be necessary, but it is included here as a sanity check.
        it('should fully refund the sender when `shouldNotRefund` is false for two calls in a row', async () => {
            // Send 100 wei to the refundable contract that should be refunded to the receiver contract.
            await receiver.testRefundFinalBalance(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
            // Send 1000 wei to the refundable contract that should be refunded to the receiver contract.
            await receiver.testRefundFinalBalance(refundable.address, false).awaitTransactionSuccessAsync({
                value: new utils_1.BigNumber(1000),
            });
        });
        it('should not refund the sender if `shouldNotRefund` is true', async () => {
            /// Send 100 wei to the refundable contract that should not be refunded.
            await receiver.testRefundFinalBalance(refundable.address, true).awaitTransactionSuccessAsync({
                value: new utils_1.BigNumber(1000),
            });
        });
    });
    // The contents of these typescript tests is not adequate to understand the assertions that are made during
    // these calls. For a more accurate picture, checkout out "./contracts/test/TestRefundableReceiver.sol".
    contracts_test_utils_1.blockchainTests.resets('disableRefundUntilEnd', () => {
        it('should fully refund the sender when `shouldNotRefund` is false', async () => {
            // Send 100 wei to the refundable contract that should be refunded to the receiver contract.
            await receiver.testDisableRefundUntilEnd(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
        // This test may not be necessary, but it is included here as a sanity check.
        it('should fully refund the sender when `shouldNotRefund` is false for two calls in a row', async () => {
            // Send 100 wei to the refundable contract that should be refunded to the receiver contract.
            await receiver.testDisableRefundUntilEnd(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
            // Send 1000 wei to the refundable contract that should be refunded to the receiver contract.
            await receiver.testDisableRefundUntilEnd(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_THOUSAND,
            });
        });
        it('should not refund the sender if `shouldNotRefund` is true', async () => {
            /// Send 100 wei to the refundable contract that should not be refunded.
            await receiver.testDisableRefundUntilEnd(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
        it('should disable the `disableRefundUntilEnd` modifier and refund when `shouldNotRefund` is false', async () => {
            /// Send 100 wei to the refundable contract that should be refunded.
            await receiver.testNestedDisableRefundUntilEnd(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
        it('should disable the `refundFinalBalance` modifier and send no refund when `shouldNotRefund` is true', async () => {
            /// Send 100 wei to the refundable contract that should not be refunded.
            await receiver.testNestedDisableRefundUntilEnd(refundable.address, true).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
        it('should disable the `refundFinalBalance` modifier and refund when `shouldNotRefund` is false', async () => {
            /// Send 100 wei to the refundable contract that should be refunded.
            await receiver.testMixedRefunds(refundable.address, false).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
        it('should disable the `refundFinalBalance` modifier and send no refund when `shouldNotRefund` is true', async () => {
            /// Send 100 wei to the refundable contract that should not be refunded.
            await receiver.testMixedRefunds(refundable.address, true).awaitTransactionSuccessAsync({
                value: ONE_HUNDRED,
            });
        });
    });
});

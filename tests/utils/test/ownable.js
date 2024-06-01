"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const utils_1 = require("@0x/utils");
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
contracts_test_utils_1.blockchainTests.resets('Ownable', env => {
    let ownable;
    let owner;
    let nonOwner;
    before(async () => {
        const accounts = await env.getAccountAddressesAsync();
        owner = await accounts[0];
        nonOwner = await accounts[1];
        ownable = await wrappers_1.TestOwnableContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestOwnable, env.provider, Object.assign(Object.assign({}, env.txDefaults), { from: owner }), artifacts_1.artifacts);
    });
    describe('onlyOwner', () => {
        it('should revert if sender is not the owner', async () => {
            const expectedError = new utils_1.OwnableRevertErrors.OnlyOwnerError(nonOwner, owner);
            return (0, contracts_test_utils_1.expect)(ownable.externalOnlyOwner().callAsync({ from: nonOwner })).to.revertWith(expectedError);
        });
        it('should succeed if sender is the owner', async () => {
            const isSuccessful = await ownable.externalOnlyOwner().callAsync({ from: owner });
            (0, contracts_test_utils_1.expect)(isSuccessful).to.be.true();
        });
    });
    describe('transferOwnership', () => {
        it('should revert if the specified new owner is the zero address', async () => {
            const expectedError = new utils_1.OwnableRevertErrors.TransferOwnerToZeroError();
            const tx = ownable.transferOwnership(contracts_test_utils_1.constants.NULL_ADDRESS).sendTransactionAsync({ from: owner });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should transfer ownership if the specified new owner is not the zero address', async () => {
            const receipt = await ownable.transferOwnership(nonOwner).awaitTransactionSuccessAsync({ from: owner });
            // Ensure that the correct logs were emitted.
            (0, contracts_test_utils_1.expect)(receipt.logs.length).to.be.eq(1);
            const [event] = (0, contracts_test_utils_1.filterLogsToArguments)(receipt.logs, wrappers_1.IOwnableEvents.OwnershipTransferred);
            (0, contracts_test_utils_1.expect)(event).to.be.deep.eq({ previousOwner: owner, newOwner: nonOwner });
            // Ensure that the owner was actually updated
            const updatedOwner = await ownable.owner().callAsync();
            (0, contracts_test_utils_1.expect)(updatedOwner).to.be.eq(nonOwner);
        });
    });
});

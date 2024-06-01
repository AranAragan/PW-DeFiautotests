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
const _ = __importStar(require("lodash"));
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
contracts_test_utils_1.blockchainTests.resets('Authorizable', env => {
    let owner;
    let notOwner;
    let address;
    let authorizable;
    before(async () => {
        const accounts = await env.getAccountAddressesAsync();
        [owner, address, notOwner] = _.slice(accounts, 0, 3);
        authorizable = await wrappers_1.TestAuthorizableContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestAuthorizable, env.provider, env.txDefaults, artifacts_1.artifacts);
    });
    describe('addAuthorizedAddress', () => {
        it('should revert if not called by owner', async () => {
            const expectedError = new utils_1.OwnableRevertErrors.OnlyOwnerError(notOwner, owner);
            const tx = authorizable.addAuthorizedAddress(notOwner).sendTransactionAsync({ from: notOwner });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should allow owner to add an authorized address', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const isAuthorized = await authorizable.authorized(address).callAsync();
            (0, contracts_test_utils_1.expect)(isAuthorized).to.be.true();
        });
        it('should revert if owner attempts to authorize the zero address', async () => {
            const expectedError = new utils_1.AuthorizableRevertErrors.ZeroCantBeAuthorizedError();
            const tx = authorizable.addAuthorizedAddress(contracts_test_utils_1.constants.NULL_ADDRESS).sendTransactionAsync({ from: owner });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should revert if owner attempts to authorize a duplicate address', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const expectedError = new utils_1.AuthorizableRevertErrors.TargetAlreadyAuthorizedError(address);
            const tx = authorizable.addAuthorizedAddress(address).sendTransactionAsync({ from: owner });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
    });
    describe('onlyAuthorized', () => {
        before(async () => {
            await authorizable.addAuthorizedAddress(owner).awaitTransactionSuccessAsync({ from: owner });
        });
        after(async () => {
            await authorizable.removeAuthorizedAddress(owner).awaitTransactionSuccessAsync({ from: owner });
        });
        it('should revert if sender is not authorized', async () => {
            const tx = authorizable.onlyAuthorizedFn().callAsync({ from: notOwner });
            const expectedError = new utils_1.AuthorizableRevertErrors.SenderNotAuthorizedError(notOwner);
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should succeed if sender is authorized', async () => {
            await authorizable.onlyAuthorizedFn().callAsync({ from: owner });
        });
    });
    describe('removeAuthorizedAddress', () => {
        it('should revert if not called by owner', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const expectedError = new utils_1.OwnableRevertErrors.OnlyOwnerError(notOwner, owner);
            const tx = authorizable.removeAuthorizedAddress(address).sendTransactionAsync({ from: notOwner });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should allow owner to remove an authorized address', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            await authorizable.removeAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const isAuthorized = await authorizable.authorized(address).callAsync();
            (0, contracts_test_utils_1.expect)(isAuthorized).to.be.false();
        });
        it('should revert if owner attempts to remove an address that is not authorized', async () => {
            const expectedError = new utils_1.AuthorizableRevertErrors.TargetNotAuthorizedError(address);
            const tx = authorizable.removeAuthorizedAddress(address).sendTransactionAsync({ from: owner });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
    });
    describe('removeAuthorizedAddressAtIndex', () => {
        it('should revert if not called by owner', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const index = new utils_1.BigNumber(0);
            const expectedError = new utils_1.OwnableRevertErrors.OnlyOwnerError(notOwner, owner);
            const tx = authorizable.removeAuthorizedAddressAtIndex(address, index).sendTransactionAsync({
                from: notOwner,
            });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should revert if index is >= authorities.length', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const index = new utils_1.BigNumber(1);
            const expectedError = new utils_1.AuthorizableRevertErrors.IndexOutOfBoundsError(index, index);
            const tx = authorizable.removeAuthorizedAddressAtIndex(address, index).sendTransactionAsync({
                from: owner,
            });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should revert if owner attempts to remove an address that is not authorized', async () => {
            const index = new utils_1.BigNumber(0);
            const expectedError = new utils_1.AuthorizableRevertErrors.TargetNotAuthorizedError(address);
            const tx = authorizable.removeAuthorizedAddressAtIndex(address, index).sendTransactionAsync({
                from: owner,
            });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should revert if address at index does not match target', async () => {
            const address1 = address;
            const address2 = notOwner;
            await authorizable.addAuthorizedAddress(address1).awaitTransactionSuccessAsync({ from: owner });
            await authorizable.addAuthorizedAddress(address2).awaitTransactionSuccessAsync({ from: owner });
            const address1Index = new utils_1.BigNumber(0);
            const expectedError = new utils_1.AuthorizableRevertErrors.AuthorizedAddressMismatchError(address1, address2);
            const tx = authorizable.removeAuthorizedAddressAtIndex(address2, address1Index).sendTransactionAsync({
                from: owner,
            });
            return (0, contracts_test_utils_1.expect)(tx).to.revertWith(expectedError);
        });
        it('should allow owner to remove an authorized address', async () => {
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            const index = new utils_1.BigNumber(0);
            await authorizable.removeAuthorizedAddressAtIndex(address, index).awaitTransactionSuccessAsync({
                from: owner,
            });
            const isAuthorized = await authorizable.authorized(address).callAsync();
            (0, contracts_test_utils_1.expect)(isAuthorized).to.be.false();
        });
    });
    describe('getAuthorizedAddresses', () => {
        it('should return correct authorized addresses', async () => {
            // Initial Authorities
            let authorities = await authorizable.getAuthorizedAddresses().callAsync();
            (0, contracts_test_utils_1.expect)(authorities).to.be.deep.eq([]);
            // Authorities after addition
            await authorizable.addAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            authorities = await authorizable.getAuthorizedAddresses().callAsync();
            (0, contracts_test_utils_1.expect)(authorities).to.be.deep.eq([address]);
            // Authorities after removal
            await authorizable.removeAuthorizedAddress(address).awaitTransactionSuccessAsync({ from: owner });
            authorities = await authorizable.getAuthorizedAddresses().callAsync();
            (0, contracts_test_utils_1.expect)(authorities).to.be.deep.eq([]);
        });
    });
});

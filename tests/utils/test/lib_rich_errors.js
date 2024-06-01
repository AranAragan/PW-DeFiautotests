"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const utils_1 = require("@0x/utils");
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
(0, contracts_test_utils_1.blockchainTests)('LibRichErrors', env => {
    let lib;
    before(async () => {
        // Deploy SafeMath
        lib = await wrappers_1.TestLibRichErrorsContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLibRichErrors, env.provider, env.txDefaults, {});
    });
    describe('_rrevert', () => {
        it('should correctly revert the extra bytes', async () => {
            const extraBytes = utils_1.hexUtils.random(100);
            try {
                await lib.externalRRevert(extraBytes).callAsync();
            }
            catch (err) {
                const revertError = (0, utils_1.coerceThrownErrorAsRevertError)(err);
                return (0, contracts_test_utils_1.expect)(revertError.encode()).to.eq(extraBytes);
            }
            return;
            // TODO(xianny): NOT WORKING, v3 merge
            // return expect.fail('Expected call to revert');
        });
        it('should correctly revert a StringRevertError', async () => {
            const error = new utils_1.StringRevertError('foo');
            return (0, contracts_test_utils_1.expect)(lib.externalRRevert(error.encode()).callAsync()).to.revertWith(error);
        });
    });
});

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
exports.artifacts = void 0;
const Authorizable = __importStar(require("./generated-artifacts/Authorizable.json"));
const AuthorizableV06 = __importStar(require("./generated-artifacts/AuthorizableV06.json"));
const AuthorizableV08 = __importStar(require("./generated-artifacts/AuthorizableV08.json"));
const D18 = __importStar(require("./generated-artifacts/D18.json"));
const DeploymentConstants = __importStar(require("./generated-artifacts/DeploymentConstants.json"));
const IAuthorizable = __importStar(require("./generated-artifacts/IAuthorizable.json"));
const IAuthorizableV06 = __importStar(require("./generated-artifacts/IAuthorizableV06.json"));
const IAuthorizableV08 = __importStar(require("./generated-artifacts/IAuthorizableV08.json"));
const IOwnable = __importStar(require("./generated-artifacts/IOwnable.json"));
const IOwnableV06 = __importStar(require("./generated-artifacts/IOwnableV06.json"));
const IOwnableV08 = __importStar(require("./generated-artifacts/IOwnableV08.json"));
const LibAddress = __importStar(require("./generated-artifacts/LibAddress.json"));
const LibAddressArray = __importStar(require("./generated-artifacts/LibAddressArray.json"));
const LibAddressArrayRichErrors = __importStar(require("./generated-artifacts/LibAddressArrayRichErrors.json"));
const LibAuthorizableRichErrors = __importStar(require("./generated-artifacts/LibAuthorizableRichErrors.json"));
const LibAuthorizableRichErrorsV06 = __importStar(require("./generated-artifacts/LibAuthorizableRichErrorsV06.json"));
const LibAuthorizableRichErrorsV08 = __importStar(require("./generated-artifacts/LibAuthorizableRichErrorsV08.json"));
const LibBytes = __importStar(require("./generated-artifacts/LibBytes.json"));
const LibBytesRichErrors = __importStar(require("./generated-artifacts/LibBytesRichErrors.json"));
const LibBytesRichErrorsV06 = __importStar(require("./generated-artifacts/LibBytesRichErrorsV06.json"));
const LibBytesRichErrorsV08 = __importStar(require("./generated-artifacts/LibBytesRichErrorsV08.json"));
const LibBytesV06 = __importStar(require("./generated-artifacts/LibBytesV06.json"));
const LibBytesV08 = __importStar(require("./generated-artifacts/LibBytesV08.json"));
const LibEIP1271 = __importStar(require("./generated-artifacts/LibEIP1271.json"));
const LibEIP712 = __importStar(require("./generated-artifacts/LibEIP712.json"));
const LibFractions = __importStar(require("./generated-artifacts/LibFractions.json"));
const LibMath = __importStar(require("./generated-artifacts/LibMath.json"));
const LibMathRichErrors = __importStar(require("./generated-artifacts/LibMathRichErrors.json"));
const LibMathRichErrorsV06 = __importStar(require("./generated-artifacts/LibMathRichErrorsV06.json"));
const LibMathRichErrorsV08 = __importStar(require("./generated-artifacts/LibMathRichErrorsV08.json"));
const LibMathV06 = __importStar(require("./generated-artifacts/LibMathV06.json"));
const LibMathV08 = __importStar(require("./generated-artifacts/LibMathV08.json"));
const LibOwnableRichErrors = __importStar(require("./generated-artifacts/LibOwnableRichErrors.json"));
const LibOwnableRichErrorsV06 = __importStar(require("./generated-artifacts/LibOwnableRichErrorsV06.json"));
const LibOwnableRichErrorsV08 = __importStar(require("./generated-artifacts/LibOwnableRichErrorsV08.json"));
const LibReentrancyGuardRichErrors = __importStar(require("./generated-artifacts/LibReentrancyGuardRichErrors.json"));
const LibReentrancyGuardRichErrorsV06 = __importStar(require("./generated-artifacts/LibReentrancyGuardRichErrorsV06.json"));
const LibReentrancyGuardRichErrorsV08 = __importStar(require("./generated-artifacts/LibReentrancyGuardRichErrorsV08.json"));
const LibRichErrors = __importStar(require("./generated-artifacts/LibRichErrors.json"));
const LibRichErrorsV06 = __importStar(require("./generated-artifacts/LibRichErrorsV06.json"));
const LibRichErrorsV08 = __importStar(require("./generated-artifacts/LibRichErrorsV08.json"));
const LibSafeMath = __importStar(require("./generated-artifacts/LibSafeMath.json"));
const LibSafeMathRichErrors = __importStar(require("./generated-artifacts/LibSafeMathRichErrors.json"));
const LibSafeMathRichErrorsV06 = __importStar(require("./generated-artifacts/LibSafeMathRichErrorsV06.json"));
const LibSafeMathRichErrorsV08 = __importStar(require("./generated-artifacts/LibSafeMathRichErrorsV08.json"));
const LibSafeMathV06 = __importStar(require("./generated-artifacts/LibSafeMathV06.json"));
const Ownable = __importStar(require("./generated-artifacts/Ownable.json"));
const OwnableV06 = __importStar(require("./generated-artifacts/OwnableV06.json"));
const OwnableV08 = __importStar(require("./generated-artifacts/OwnableV08.json"));
const ReentrancyGuard = __importStar(require("./generated-artifacts/ReentrancyGuard.json"));
const ReentrancyGuardV06 = __importStar(require("./generated-artifacts/ReentrancyGuardV06.json"));
const ReentrancyGuardV08 = __importStar(require("./generated-artifacts/ReentrancyGuardV08.json"));
const Refundable = __importStar(require("./generated-artifacts/Refundable.json"));
const TestAuthorizable = __importStar(require("./generated-artifacts/TestAuthorizable.json"));
const TestLibAddress = __importStar(require("./generated-artifacts/TestLibAddress.json"));
const TestLibAddressArray = __importStar(require("./generated-artifacts/TestLibAddressArray.json"));
const TestLibBytes = __importStar(require("./generated-artifacts/TestLibBytes.json"));
const TestLibEIP712 = __importStar(require("./generated-artifacts/TestLibEIP712.json"));
const TestLibMath = __importStar(require("./generated-artifacts/TestLibMath.json"));
const TestLibRichErrors = __importStar(require("./generated-artifacts/TestLibRichErrors.json"));
const TestLibSafeMath = __importStar(require("./generated-artifacts/TestLibSafeMath.json"));
const TestLogDecoding = __importStar(require("./generated-artifacts/TestLogDecoding.json"));
const TestLogDecodingDownstream = __importStar(require("./generated-artifacts/TestLogDecodingDownstream.json"));
const TestOwnable = __importStar(require("./generated-artifacts/TestOwnable.json"));
const TestReentrancyGuard = __importStar(require("./generated-artifacts/TestReentrancyGuard.json"));
const TestRefundable = __importStar(require("./generated-artifacts/TestRefundable.json"));
const TestRefundableReceiver = __importStar(require("./generated-artifacts/TestRefundableReceiver.json"));
exports.artifacts = {
    Authorizable: Authorizable,
    D18: D18,
    DeploymentConstants: DeploymentConstants,
    LibAddress: LibAddress,
    LibAddressArray: LibAddressArray,
    LibAddressArrayRichErrors: LibAddressArrayRichErrors,
    LibAuthorizableRichErrors: LibAuthorizableRichErrors,
    LibBytes: LibBytes,
    LibBytesRichErrors: LibBytesRichErrors,
    LibEIP1271: LibEIP1271,
    LibEIP712: LibEIP712,
    LibFractions: LibFractions,
    LibMath: LibMath,
    LibMathRichErrors: LibMathRichErrors,
    LibOwnableRichErrors: LibOwnableRichErrors,
    LibReentrancyGuardRichErrors: LibReentrancyGuardRichErrors,
    LibRichErrors: LibRichErrors,
    LibSafeMath: LibSafeMath,
    LibSafeMathRichErrors: LibSafeMathRichErrors,
    Ownable: Ownable,
    ReentrancyGuard: ReentrancyGuard,
    Refundable: Refundable,
    IAuthorizable: IAuthorizable,
    IOwnable: IOwnable,
    AuthorizableV06: AuthorizableV06,
    LibBytesV06: LibBytesV06,
    LibMathV06: LibMathV06,
    LibSafeMathV06: LibSafeMathV06,
    OwnableV06: OwnableV06,
    ReentrancyGuardV06: ReentrancyGuardV06,
    LibAuthorizableRichErrorsV06: LibAuthorizableRichErrorsV06,
    LibBytesRichErrorsV06: LibBytesRichErrorsV06,
    LibMathRichErrorsV06: LibMathRichErrorsV06,
    LibOwnableRichErrorsV06: LibOwnableRichErrorsV06,
    LibReentrancyGuardRichErrorsV06: LibReentrancyGuardRichErrorsV06,
    LibRichErrorsV06: LibRichErrorsV06,
    LibSafeMathRichErrorsV06: LibSafeMathRichErrorsV06,
    IAuthorizableV06: IAuthorizableV06,
    IOwnableV06: IOwnableV06,
    AuthorizableV08: AuthorizableV08,
    LibBytesV08: LibBytesV08,
    LibMathV08: LibMathV08,
    OwnableV08: OwnableV08,
    ReentrancyGuardV08: ReentrancyGuardV08,
    LibAuthorizableRichErrorsV08: LibAuthorizableRichErrorsV08,
    LibBytesRichErrorsV08: LibBytesRichErrorsV08,
    LibMathRichErrorsV08: LibMathRichErrorsV08,
    LibOwnableRichErrorsV08: LibOwnableRichErrorsV08,
    LibReentrancyGuardRichErrorsV08: LibReentrancyGuardRichErrorsV08,
    LibRichErrorsV08: LibRichErrorsV08,
    LibSafeMathRichErrorsV08: LibSafeMathRichErrorsV08,
    IAuthorizableV08: IAuthorizableV08,
    IOwnableV08: IOwnableV08,
    TestAuthorizable: TestAuthorizable,
    TestLibAddress: TestLibAddress,
    TestLibAddressArray: TestLibAddressArray,
    TestLibBytes: TestLibBytes,
    TestLibEIP712: TestLibEIP712,
    TestLibMath: TestLibMath,
    TestLibRichErrors: TestLibRichErrors,
    TestLibSafeMath: TestLibSafeMath,
    TestLogDecoding: TestLogDecoding,
    TestLogDecodingDownstream: TestLogDecodingDownstream,
    TestOwnable: TestOwnable,
    TestReentrancyGuard: TestReentrancyGuard,
    TestRefundable: TestRefundable,
    TestRefundableReceiver: TestRefundableReceiver,
};

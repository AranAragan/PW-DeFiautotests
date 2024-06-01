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
const Authorizable = __importStar(require("../generated-artifacts/Authorizable.json"));
const IAuthorizable = __importStar(require("../generated-artifacts/IAuthorizable.json"));
const IOwnable = __importStar(require("../generated-artifacts/IOwnable.json"));
const LibAddress = __importStar(require("../generated-artifacts/LibAddress.json"));
const LibAddressArray = __importStar(require("../generated-artifacts/LibAddressArray.json"));
const LibAddressArrayRichErrors = __importStar(require("../generated-artifacts/LibAddressArrayRichErrors.json"));
const LibAuthorizableRichErrors = __importStar(require("../generated-artifacts/LibAuthorizableRichErrors.json"));
const LibBytes = __importStar(require("../generated-artifacts/LibBytes.json"));
const LibBytesRichErrors = __importStar(require("../generated-artifacts/LibBytesRichErrors.json"));
const LibEIP1271 = __importStar(require("../generated-artifacts/LibEIP1271.json"));
const LibEIP712 = __importStar(require("../generated-artifacts/LibEIP712.json"));
const LibFractions = __importStar(require("../generated-artifacts/LibFractions.json"));
const LibMath = __importStar(require("../generated-artifacts/LibMath.json"));
const LibMathRichErrors = __importStar(require("../generated-artifacts/LibMathRichErrors.json"));
const LibOwnableRichErrors = __importStar(require("../generated-artifacts/LibOwnableRichErrors.json"));
const LibReentrancyGuardRichErrors = __importStar(require("../generated-artifacts/LibReentrancyGuardRichErrors.json"));
const LibRichErrors = __importStar(require("../generated-artifacts/LibRichErrors.json"));
const LibSafeMath = __importStar(require("../generated-artifacts/LibSafeMath.json"));
const LibSafeMathRichErrors = __importStar(require("../generated-artifacts/LibSafeMathRichErrors.json"));
const Ownable = __importStar(require("../generated-artifacts/Ownable.json"));
const ReentrancyGuard = __importStar(require("../generated-artifacts/ReentrancyGuard.json"));
const Refundable = __importStar(require("../generated-artifacts/Refundable.json"));
exports.artifacts = {
    Authorizable: Authorizable,
    IAuthorizable: IAuthorizable,
    IOwnable: IOwnable,
    LibAddress: LibAddress,
    LibAddressArray: LibAddressArray,
    LibAddressArrayRichErrors: LibAddressArrayRichErrors,
    LibAuthorizableRichErrors: LibAuthorizableRichErrors,
    LibBytes: LibBytes,
    LibBytesRichErrors: LibBytesRichErrors,
    LibEIP1271: LibEIP1271,
    LibEIP712: LibEIP712,
    LibFractions: LibFractions,
    LibOwnableRichErrors: LibOwnableRichErrors,
    LibReentrancyGuardRichErrors: LibReentrancyGuardRichErrors,
    LibRichErrors: LibRichErrors,
    LibMath: LibMath,
    LibMathRichErrors: LibMathRichErrors,
    LibSafeMath: LibSafeMath,
    LibSafeMathRichErrors: LibSafeMathRichErrors,
    Ownable: Ownable,
    ReentrancyGuard: ReentrancyGuard,
    Refundable: Refundable,
};

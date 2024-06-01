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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeMathRevertErrors = exports.ReentrancyGuardRevertErrors = exports.OwnableRevertErrors = exports.LibBytesRevertErrors = exports.LibAddressArrayRevertErrors = exports.AuthorizableRevertErrors = exports.ReferenceFunctions = exports.artifacts = void 0;
var artifacts_1 = require("./artifacts");
Object.defineProperty(exports, "artifacts", { enumerable: true, get: function () { return artifacts_1.artifacts; } });
__exportStar(require("./wrappers"), exports);
const ReferenceFunctionsToExport = __importStar(require("./reference_functions"));
exports.ReferenceFunctions = ReferenceFunctionsToExport;
var utils_1 = require("@0x/utils");
Object.defineProperty(exports, "AuthorizableRevertErrors", { enumerable: true, get: function () { return utils_1.AuthorizableRevertErrors; } });
Object.defineProperty(exports, "LibAddressArrayRevertErrors", { enumerable: true, get: function () { return utils_1.LibAddressArrayRevertErrors; } });
Object.defineProperty(exports, "LibBytesRevertErrors", { enumerable: true, get: function () { return utils_1.LibBytesRevertErrors; } });
Object.defineProperty(exports, "OwnableRevertErrors", { enumerable: true, get: function () { return utils_1.OwnableRevertErrors; } });
Object.defineProperty(exports, "ReentrancyGuardRevertErrors", { enumerable: true, get: function () { return utils_1.ReentrancyGuardRevertErrors; } });
Object.defineProperty(exports, "SafeMathRevertErrors", { enumerable: true, get: function () { return utils_1.SafeMathRevertErrors; } });

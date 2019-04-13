"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var request_promise_1 = __importDefault(require("request-promise"));
var username = process.env.BUGZILLA_USERNAME;
var password = process.env.BUGZILLA_PASSWORD;
var token = null;
function assertTokenNotNull(token, message) {
    if (token == null) {
        throw new Error(message);
    }
}
exports.assertTokenNotNull = assertTokenNotNull;
function shouldRefresh(error, refresh) {
    if (refresh) // If already refreshed, there is nothing we can do
        return false;
    if (error.statusCode === 400) {
        var errorJSON = error.response.body;
        var errorResponse = JSON.parse(errorJSON);
        return errorResponse.code === 32000; // Token has expired
    }
    return false;
}
exports.shouldRefresh = shouldRefresh;
function getToken(refresh) {
    if (refresh === void 0) { refresh = false; }
    return __awaiter(this, void 0, void 0, function () {
        var tokenResponse, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (token !== null && !refresh) {
                        return [2 /*return*/, token];
                    }
                    if (username === undefined || password == undefined) {
                        console.error('No username or password found');
                        return [2 /*return*/, null];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, request_promise_1.default("https://bugzilla.string.org.in/rest.cgi/login?login=" + username + "&password=" + password)];
                case 2:
                    tokenResponse = _a.sent();
                    token = JSON.parse(tokenResponse).token;
                    return [2 /*return*/, token];
                case 3:
                    e_1 = _a.sent();
                    console.error('Error while getting token', e_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getToken = getToken;
function safeRun(fun, errorMessage, refresh) {
    if (errorMessage === void 0) { errorMessage = undefined; }
    if (refresh === void 0) { refresh = false; }
    return __awaiter(this, void 0, void 0, function () {
        var token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken(refresh)];
                case 1:
                    token = _a.sent();
                    assertTokenNotNull(token, (errorMessage || 'Cannot run function') + ". Token is null");
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fun(token)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    if (shouldRefresh(error_1, refresh)) {
                        return [2 /*return*/, safeRun(fun, errorMessage, true)];
                    }
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.safeRun = safeRun;
exports.testController = {
    releaseToken: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                token = null;
                return [2 /*return*/];
            });
        });
    },
    setCredentials: function (login, pass) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                username = login;
                password = pass;
                return [2 /*return*/];
            });
        });
    }
};
//# sourceMappingURL=auth.js.map
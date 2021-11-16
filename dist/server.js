"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mailer_1 = __importDefault(require("./config/mailer"));
var projects_json_1 = __importDefault(require("./data/projects.json")); // import project data
var Server = /** @class */ (function () {
    function Server(apiVer) {
        this.localPath = __dirname + "/dist/";
        this.PORT = process.env.PORT || 4100;
        this.ISDEV = process.env.NODE_ENV === "production" ? false : true;
        this.corsOptions = {
            origin: this.ISDEV ? "*" : "https://www.isaacmartinez.dev",
        };
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.API_VERSION = apiVer;
        console.log(this.corsOptions.origin);
    }
    Server.prototype.sendMail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, body, subject, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, body = _a.body, subject = _a.subject;
                        return [4 /*yield*/, mailer_1.default.sendMail({
                                from: "Portfolio Contact <portfolio@example.net>",
                                to: "works@isaacmartinez.dev",
                                subject: subject,
                                text: body,
                            })];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: "Sent" });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        res.status(500).json({ message: err_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.getProjects = function (_, res) {
        res.status(200).json(projects_json_1.default);
    };
    Server.prototype.setProject = function (req, res) {
        var project = req.body;
        var newProjects = projects_json_1.default.push(project);
        res.status(200).json(newProjects);
    };
    Server.prototype.config = function () {
        this.app.use(express_1.default.static(this.localPath));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(this.corsOptions));
    };
    Server.prototype.routes = function () {
        var _this = this;
        this.app.post("/api/send-mail", this.sendMail);
        this.app.get("/api/projects", this.getProjects);
        this.app.post("/api/projects", this.setProject);
        this.app.get("/", function (req, res) {
            res.status(200).send("API Isaac Portfolio " + _this.API_VERSION);
        });
    };
    Object.defineProperty(Server.prototype, "isDev", {
        get: function () {
            return this.ISDEV;
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.PORT, function () {
            console.log("Server is on:", process.env.NODE_ENV);
            console.log("Server is running on port http://localhost:" + _this.PORT + ".");
        });
    };
    return Server;
}());
exports.default = Server;

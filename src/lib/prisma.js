"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
var adapter_pg_1 = require("@prisma/adapter-pg");
var pg_1 = require("pg");
var globalForPrisma = globalThis;
var pool = (_a = globalForPrisma.pool) !== null && _a !== void 0 ? _a : new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
var adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = (_b = globalForPrisma.prisma) !== null && _b !== void 0 ? _b : new client_1.PrismaClient({
    adapter: adapter,
});
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
    globalForPrisma.pool = pool;
}

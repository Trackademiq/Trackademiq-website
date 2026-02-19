import {
  type User,
  type InsertUser,
  type DemoRequest,
  type InsertDemoRequest,
  users as usersTable,
  demoRequests as demoRequestsTable,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";
import { getDb, type DrizzleDb } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private demoRequests: Map<string, DemoRequest>;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const id = randomUUID();
    const demoRequest: DemoRequest = {
      schoolName: insertRequest.schoolName,
      email: insertRequest.email,
      phone: insertRequest.phone,
      message: insertRequest.message ?? null,
      id,
      createdAt: new Date(),
    };
    this.demoRequests.set(id, demoRequest);
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }
}

export class DbStorage implements IStorage {
  constructor(private db: DrizzleDb) {}

  async getUser(id: string): Promise<User | undefined> {
    const [row] = await this.db.select().from(usersTable).where(eq(usersTable.id, id));
    return row;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [row] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
    return row;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(usersTable).values(insertUser).returning();
    if (!user) throw new Error("Failed to create user");
    return user;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const [demoRequest] = await this.db
      .insert(demoRequestsTable)
      .values(insertRequest)
      .returning();
    if (!demoRequest) throw new Error("Failed to create demo request");
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return this.db.select().from(demoRequestsTable).orderBy(desc(demoRequestsTable.createdAt));
  }
}

function createStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    try {
      return new DbStorage(getDb());
    } catch (e) {
      console.error("DATABASE_URL set but DB connection failed; using in-memory storage.", e);
      return new MemStorage();
    }
  }
  return new MemStorage();
}

export const storage = createStorage();

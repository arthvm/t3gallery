import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `t3gallery_${name}`);

export const images = createTable(
	"images",
	(d) => ({
		id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
		name: d.varchar({ length: 256 }).notNull(),
		url: d.varchar({ length: 1024 }).notNull(),
		userId: d.varchar("user_id", { length: 256 }).notNull(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d
			.timestamp("updated_at", { withTimezone: true })
			.$onUpdate(() => new Date()),
	}),
	(t) => [index("name_idx").on(t.name)],
);

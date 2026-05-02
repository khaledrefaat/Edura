ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT '123456789';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "active" boolean DEFAULT true NOT NULL;
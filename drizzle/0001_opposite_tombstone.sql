CREATE TYPE "public"."course_type" AS ENUM('group', 'private');--> statement-breakpoint
CREATE TYPE "public"."day_of_week" AS ENUM('saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday');--> statement-breakpoint
CREATE TABLE "course_students" (
	"course_id" varchar(5) NOT NULL,
	"student_id" varchar(5) NOT NULL,
	"joined_at" timestamp DEFAULT now(),
	CONSTRAINT "course_students_course_id_student_id_pk" PRIMARY KEY("course_id","student_id")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" varchar(5) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" "course_type" NOT NULL,
	"teacher_id" varchar(5) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"days" "day_of_week"[] NOT NULL,
	"duration_minutes" integer NOT NULL,
	"exception_dates" date[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_students" ADD CONSTRAINT "course_students_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_students" ADD CONSTRAINT "course_students_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
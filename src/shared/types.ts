import z from "zod";

export const InstructorSchema = z.object({
  id: z.number(),
  name: z.string(),
  bio: z.string().nullable(),
  avatar_url: z.string().nullable(),
  expertise: z.string().nullable(),
  social_links: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  short_description: z.string().nullable(),
  instructor_id: z.number().nullable(),
  thumbnail_url: z.string().nullable(),
  video_url: z.string().nullable(),
  duration_minutes: z.number().nullable(),
  skill_level: z.string().nullable(),
  tags: z.string().nullable(),
  price_cents: z.number().nullable(),
  is_free: z.boolean().nullable(),
  rating: z.number().nullable(),
  student_count: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const LessonSchema = z.object({
  id: z.number(),
  course_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  video_url: z.string().nullable(),
  duration_minutes: z.number().nullable(),
  order_index: z.number().nullable(),
  is_free: z.boolean().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Instructor = z.infer<typeof InstructorSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type Lesson = z.infer<typeof LessonSchema>;

export type CourseWithInstructor = Course & {
  instructor: Instructor | null;
};

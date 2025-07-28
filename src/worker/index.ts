import { Hono } from "hono";
import { cors } from "hono/cors";


const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

// Get all courses with instructors
app.get("/api/courses", async (c) => {
  try {
    const db = c.env.DB;
    const coursesQuery = `
      SELECT 
        c.*,
        i.name as instructor_name,
        i.bio as instructor_bio,
        i.avatar_url as instructor_avatar_url,
        i.expertise as instructor_expertise,
        i.social_links as instructor_social_links
      FROM courses c
      LEFT JOIN instructors i ON c.instructor_id = i.id
      ORDER BY c.created_at DESC
    `;
    
    const result = await db.prepare(coursesQuery).all();
    
    const courses = result.results.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      short_description: row.short_description,
      instructor_id: row.instructor_id,
      thumbnail_url: row.thumbnail_url,
      video_url: row.video_url,
      duration_minutes: row.duration_minutes,
      skill_level: row.skill_level,
      tags: row.tags,
      price_cents: row.price_cents,
      is_free: row.is_free,
      rating: row.rating,
      student_count: row.student_count,
      created_at: row.created_at,
      updated_at: row.updated_at,
      instructor: row.instructor_name ? {
        id: row.instructor_id,
        name: row.instructor_name,
        bio: row.instructor_bio,
        avatar_url: row.instructor_avatar_url,
        expertise: row.instructor_expertise,
        social_links: row.instructor_social_links,
        created_at: "",
        updated_at: ""
      } : null
    }));

    return c.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return c.json({ error: "Failed to fetch courses" }, 500);
  }
});

// Get single course with instructor
app.get("/api/courses/:id", async (c) => {
  try {
    const db = c.env.DB;
    const courseId = c.req.param("id");
    
    const courseQuery = `
      SELECT 
        c.*,
        i.name as instructor_name,
        i.bio as instructor_bio,
        i.avatar_url as instructor_avatar_url,
        i.expertise as instructor_expertise,
        i.social_links as instructor_social_links
      FROM courses c
      LEFT JOIN instructors i ON c.instructor_id = i.id
      WHERE c.id = ?
    `;
    
    const result = await db.prepare(courseQuery).bind(courseId).first();
    
    if (!result) {
      return c.json({ error: "Course not found" }, 404);
    }

    const course = {
      id: result.id,
      title: result.title,
      description: result.description,
      short_description: result.short_description,
      instructor_id: result.instructor_id,
      thumbnail_url: result.thumbnail_url,
      video_url: result.video_url,
      duration_minutes: result.duration_minutes,
      skill_level: result.skill_level,
      tags: result.tags,
      price_cents: result.price_cents,
      is_free: result.is_free,
      rating: result.rating,
      student_count: result.student_count,
      created_at: result.created_at,
      updated_at: result.updated_at,
      instructor: result.instructor_name ? {
        id: result.instructor_id,
        name: result.instructor_name,
        bio: result.instructor_bio,
        avatar_url: result.instructor_avatar_url,
        expertise: result.instructor_expertise,
        social_links: result.instructor_social_links,
        created_at: "",
        updated_at: ""
      } : null
    };

    return c.json({ course });
  } catch (error) {
    console.error("Error fetching course:", error);
    return c.json({ error: "Failed to fetch course" }, 500);
  }
});

// Get lessons for a course
app.get("/api/courses/:id/lessons", async (c) => {
  try {
    const db = c.env.DB;
    const courseId = c.req.param("id");
    
    const result = await db.prepare("SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index ASC").bind(courseId).all();
    return c.json({ lessons: result.results });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return c.json({ error: "Failed to fetch lessons" }, 500);
  }
});

// Get all instructors
app.get("/api/instructors", async (c) => {
  try {
    const db = c.env.DB;
    const result = await db.prepare("SELECT * FROM instructors ORDER BY name ASC").all();
    return c.json({ instructors: result.results });
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return c.json({ error: "Failed to fetch instructors" }, 500);
  }
});

export default app;

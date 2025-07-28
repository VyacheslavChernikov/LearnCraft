
CREATE TABLE instructors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  expertise TEXT,
  social_links TEXT, -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  instructor_id INTEGER,
  thumbnail_url TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  skill_level TEXT, -- beginner, intermediate, advanced
  tags TEXT, -- JSON array as string
  price_cents INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  rating REAL DEFAULT 0,
  student_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

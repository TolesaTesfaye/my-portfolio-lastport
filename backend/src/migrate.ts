import { config } from "dotenv";
config({ path: "../.env.local" });
config();
import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

const statements = [
  `CREATE TABLE IF NOT EXISTS admins (id text PRIMARY KEY NOT NULL, email text NOT NULL UNIQUE, password_hash text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS profiles (id text PRIMARY KEY NOT NULL, name text NOT NULL, title text NOT NULL, biography text NOT NULL, email text NOT NULL, phone text, location text, photo_key text, resume_key text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS skills (id text PRIMARY KEY NOT NULL, name text NOT NULL, category text NOT NULL, proficiency integer NOT NULL, icon text, display_order integer NOT NULL DEFAULT 0, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS experiences (id text PRIMARY KEY NOT NULL, position text NOT NULL, organization text NOT NULL, employment_type text, description text NOT NULL, start_date text NOT NULL, end_date text, currently_working boolean NOT NULL DEFAULT false, location text, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS projects (id text PRIMARY KEY NOT NULL, title text NOT NULL, description text NOT NULL, image_key text, github_url text, live_url text, featured boolean NOT NULL DEFAULT false, display_order integer NOT NULL DEFAULT 0, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS project_technologies (id text PRIMARY KEY NOT NULL, project_id text NOT NULL REFERENCES projects(id) ON DELETE CASCADE, technology text NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS education (id text PRIMARY KEY NOT NULL, institution text NOT NULL, degree text NOT NULL, field_of_study text, start_date text, end_date text, description text, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS certificates (id text PRIMARY KEY NOT NULL, title text NOT NULL, issuer text NOT NULL, issue_date text, credential_url text, file_key text, description text, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS social_links (id text PRIMARY KEY NOT NULL, platform text NOT NULL, url text NOT NULL, display_order integer NOT NULL DEFAULT 0, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS services (id text PRIMARY KEY NOT NULL, title text NOT NULL, description text NOT NULL, features text NOT NULL DEFAULT '', icon text, color text, image_key text, display_order integer NOT NULL DEFAULT 0, published boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS service_images (id text PRIMARY KEY NOT NULL, service_id text NOT NULL REFERENCES services(id) ON DELETE CASCADE, image_key text NOT NULL, display_order integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS contact_messages (id text PRIMARY KEY NOT NULL, name text NOT NULL, email text NOT NULL, subject text, message text NOT NULL, read boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE INDEX IF NOT EXISTS skills_order_idx ON skills (display_order)`,
  `CREATE INDEX IF NOT EXISTS projects_order_idx ON projects (display_order)`,
  `CREATE INDEX IF NOT EXISTS services_order_idx ON services (display_order)`,
  `CREATE INDEX IF NOT EXISTS service_images_service_idx ON service_images (service_id)`,
  `INSERT INTO service_images (id, service_id, image_key, display_order)
    SELECT 'service-image-' || s.id, s.id, s.image_key, 0
    FROM services s
    WHERE s.image_key IS NOT NULL AND s.image_key <> ''
    AND NOT EXISTS (SELECT 1 FROM service_images si WHERE si.service_id = s.id)`,
  `INSERT INTO services (id, title, description, features, icon, color, display_order, published) VALUES
    ('service-content', 'Content Creation', 'Educational videos, tutorials, and technology content that keeps audiences engaged.', 'Educational Videos,Tutorial Creation,Student Engagement,Tech Content', 'FaYoutube', 'from-red-500 to-pink-500', 0, true),
    ('service-teaching', 'Online Teaching', 'Practical mentoring and learning resources that help students build useful technical skills.', 'Student Mentoring,Tech Education,Learning Resources,Skill Development', 'FaChalkboardTeacher', 'from-green-500 to-emerald-500', 1, true),
    ('service-video', 'Video Editing', 'Professional video editing and content optimization for clear, engaging visual communication.', 'CapCut Editing,Video Production,Content Optimization,Visual Effects', 'FaVideo', 'from-orange-500 to-yellow-500', 2, true)
    ON CONFLICT (id) DO NOTHING`,
  `CREATE INDEX IF NOT EXISTS project_technologies_project_idx ON project_technologies (project_id)`,
  `CREATE INDEX IF NOT EXISTS messages_created_idx ON contact_messages (created_at)`,
];

await client.connect();
try {
  for (const statement of statements) await client.query(statement);
  console.log(`Applied ${statements.length} PostgreSQL schema statements.`);
} finally {
  await client.end();
}

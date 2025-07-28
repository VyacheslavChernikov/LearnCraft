import { Link } from "react-router";
import { Clock, Star, Users, Play } from "lucide-react";
import type { CourseWithInstructor } from "@/shared/types";

interface CourseCardProps {
  course: CourseWithInstructor;
}

function formatDuration(minutes: number | null) {
  if (!minutes) return "Duration TBA";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

function formatPrice(priceCents: number | null, isFree: boolean | null) {
  if (isFree) return "Free";
  if (!priceCents) return "Free";
  return `$${(priceCents / 100).toFixed(0)}`;
}

function getSkillLevelColor(level: string | null) {
  switch (level?.toLowerCase()) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function parseTags(tags: string | null): string[] {
  if (!tags) return [];
  try {
    return JSON.parse(tags);
  } catch {
    return [];
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  const tags = parseTags(course.tags);

  return (
    <Link to={`/courses/${course.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group-hover:border-blue-200">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Play className="w-12 h-12 text-blue-600" />
            </div>
          )}
          
          {/* Price badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              course.is_free ? "bg-green-500 text-white" : "bg-blue-600 text-white"
            }`}>
              {formatPrice(course.price_cents, course.is_free)}
            </span>
          </div>

          {/* Duration */}
          <div className="absolute top-3 right-3 bg-black/75 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDuration(course.duration_minutes)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.short_description || course.description}
          </p>

          {/* Instructor */}
          {course.instructor && (
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={course.instructor.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`}
                alt={course.instructor.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{course.instructor.name}</p>
                <p className="text-xs text-gray-500">{course.instructor.expertise}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.skill_level && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(course.skill_level)}`}>
                {course.skill_level}
              </span>
            )}
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {course.rating && course.rating > 0 && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              )}
              {course.student_count && course.student_count > 0 && (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.student_count.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

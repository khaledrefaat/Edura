'use client';

import { Search } from 'lucide-react';

interface CoursesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: 'All' | 'Group' | 'Private';
  onFilterChange: (value: 'All' | 'Group' | 'Private') => void;
}

export function CoursesFilters({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}: CoursesFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses by title or teacher..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange('All')}
            className={`px-4 py-2.5 rounded-xl transition-colors ${
              filterType === 'All'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            type="button"
          >
            All Courses
          </button>
          <button
            onClick={() => onFilterChange('Group')}
            className={`px-4 py-2.5 rounded-xl transition-colors ${
              filterType === 'Group'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
            type="button"
          >
            Group
          </button>
          <button
            onClick={() => onFilterChange('Private')}
            className={`px-4 py-2.5 rounded-xl transition-colors ${
              filterType === 'Private'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
            type="button"
          >
            Private
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

interface TeacherNotesProps {
  initialNotes: string;
}

export function TeacherNotes({ initialNotes }: TeacherNotesProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isEditing, setIsEditing] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleSave = () => {
    setNotes(tempNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempNotes(notes);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Notes</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors"
            type="button"
          >
            <Edit2 className="w-4 h-4" />
            Edit Notes
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors"
              type="button"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={tempNotes}
          onChange={(e) => setTempNotes(e.target.value)}
          className="w-full h-40 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
          placeholder="Add notes about this teacher..."
        />
      ) : (
        <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl min-h-[160px]">
          {notes || 'No notes added yet.'}
        </div>
      )}
    </div>
  );
}

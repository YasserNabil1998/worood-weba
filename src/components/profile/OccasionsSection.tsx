"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useProfileStore } from "@/stores";
import OccasionForm from "./OccasionForm";
import OccasionCard from "./OccasionCard";

interface Occasion {
  id: string;
  name: string;
  date: string;
  type: string;
  icon: string;
  reminder?: boolean;
}

interface OccasionsSectionProps {
  occasions: Occasion[];
  onAddOccasion?: () => void;
  onEditOccasion?: (id: string) => void;
}

// occasionTypes will be fetched from store

export default function OccasionsSection({
  occasions: initialOccasions,
  onAddOccasion,
  onEditOccasion,
}: OccasionsSectionProps) {
  const [occasions, setOccasions] = useState<Occasion[]>(initialOccasions);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOccasionId, setEditingOccasionId] = useState<string | null>(null);
  const [editingOccasion, setEditingOccasion] = useState<Occasion | null>(null);
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  // Get occasion types from store
  const fetchOccasionTypes = useProfileStore((state) => state.fetchOccasionTypes);

  // Fetch occasion types on mount
  useEffect(() => {
    fetchOccasionTypes();
  }, [fetchOccasionTypes]);

  // Update occasions when initialOccasions changes
  // Use useRef to track previous value and compare deeply to avoid infinite loops
  const prevInitialOccasionsRef = useRef<string>("");

  useEffect(() => {
    const currentStr = JSON.stringify(initialOccasions);

    // Only update if the data actually changed
    if (prevInitialOccasionsRef.current !== currentStr) {
      prevInitialOccasionsRef.current = currentStr;
      setOccasions(initialOccasions);
    }
  }, [initialOccasions]);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingOccasionId(null);
    setEditingOccasion(null);
    setShowAddForm(true);
  };

  const handleEditClick = (e: React.MouseEvent, occasionId: string) => {
    e.stopPropagation();
    const occasion = occasions.find((occ) => occ.id === occasionId);
    if (occasion) {
      setEditingOccasionId(occasionId);
      setEditingOccasion(occasion);
      setShowAddForm(true);
    }
    onEditOccasion?.(occasionId);
  };

  const handleFormSave = (occasion: Occasion) => {
    if (editingOccasionId) {
      // Update existing occasion
      setOccasions(occasions.map((occ) => (occ.id === editingOccasionId ? occasion : occ)));
    } else {
      // Add new occasion
      setOccasions([...occasions, occasion]);
    }

    // Reset form
    setShowAddForm(false);
    setEditingOccasionId(null);
    setEditingOccasion(null);

    // Call parent callback
    onAddOccasion?.();
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingOccasionId(null);
    setEditingOccasion(null);
  };

  return (
    <div
      className="bg-white rounded-[25px] p-4 sm:p-6 mb-4 cursor-pointer"
      style={fontStyle}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-1">
          <h2 className="text-[20px] font-bold text-black" style={fontStyle}>
            مناسباتي
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#383737]" style={fontStyle}>
            (سيتم إرسال تذكير لك على إيميلك لتذكيرك قبل بأسبوع)
          </p>
        </div>
        <div className="flex items-center justify-center flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
          ) : (
            <div className="rotate-180">
              <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
            </div>
          )}
        </div>
      </div>

      {/* Occasions List */}
      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {occasions.map((occasion) => (
              <OccasionCard key={occasion.id} occasion={occasion} onEdit={handleEditClick} />
            ))}
          </div>

          {/* Add Occasion Form */}
          {showAddForm ? (
            <OccasionForm
              editingOccasionId={editingOccasionId}
              initialValues={
                editingOccasion
                  ? {
                      type: editingOccasion.type,
                      name: editingOccasion.name,
                      date: editingOccasion.date,
                      reminder: editingOccasion.reminder,
                    }
                  : undefined
              }
              onSave={handleFormSave}
              onCancel={handleFormCancel}
            />
          ) : (
            /* Add New Occasion Button */
            <div className="flex items-center justify-start mt-4">
              <button
                onClick={handleAddClick}
                className="flex items-center gap-2 text-[16px] text-black hover:text-[#5f664f] transition-colors cursor-pointer"
                style={fontStyle}
              >
                <div className="relative w-[29px] h-[27px]">
                  <div className="w-[29px] h-[27px] bg-[#ededed] rounded-[2px]"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[19px] h-[3px] bg-[#5c5a57]"></div>
                    <div className="w-[3px] h-[20px] bg-[#5c5a57] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                <span>إضافة مناسبة جديدة</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

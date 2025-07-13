import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, CalendarPlus } from "lucide-react";

interface PostingCalendarProps {
  onAddPost: () => void;
  onBulkSchedule: () => void;
}

export default function PostingCalendar({ onAddPost, onBulkSchedule }: PostingCalendarProps) {
  const [currentMonth] = useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const hasEventOnDay = (day: number) => {
    // Sample logic - in real app, this would check against actual scheduled posts
    return day % 3 === 0 || day % 5 === 0;
  };

  const getEventColor = (day: number) => {
    if (day % 3 === 0) return "bg-primary/20";
    if (day % 5 === 0) return "bg-secondary/20";
    return "bg-accent/20";
  };

  return (
    <div className="form-section">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Posting Calendar</h3>
        <div className="flex items-center space-x-3">
          <Button onClick={onAddPost} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
          <Button 
            onClick={onBulkSchedule}
            variant="outline"
            className="flex items-center bg-secondary text-white hover:bg-secondary/90 border-secondary"
          >
            <CalendarPlus className="w-4 h-4 mr-2" />
            Bulk Schedule
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              day === null 
                ? "text-gray-400" 
                : day === new Date().getDate() 
                  ? "calendar-day-today" 
                  : hasEventOnDay(day) 
                    ? `${getEventColor(day)} calendar-day-event`
                    : "text-gray-900"
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary/20 rounded mr-2"></div>
          <span className="text-gray-600">TikTok</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-secondary/20 rounded mr-2"></div>
          <span className="text-gray-600">Instagram</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-accent/20 rounded mr-2"></div>
          <span className="text-gray-600">YouTube</span>
        </div>
      </div>
    </div>
  );
}

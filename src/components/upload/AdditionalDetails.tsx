import React from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalDetailsProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  disabled?: boolean;
}

export function AdditionalDetails({
  description,
  onDescriptionChange,
  disabled = false,
}: AdditionalDetailsProps) {
  return (
    <div className= "space-y-4" >
    <div>
    <Label htmlFor="description" className = "text-base font-medium" >
      Data Description
        </Label>
        < p className = "text-sm text-muted-foreground mb-3" >
          Provide context about your data to improve results(optional)
            </p>
            < Textarea
  id = "description"
  placeholder = "Describe what your data represents, what insights you're looking for, or any specific aspects you want to highlight..."
  rows = { 4}
  value = { description }
  onChange = {(e) => onDescriptionChange(e.target.value)
}
disabled = { disabled }
className = "resize-none"
  />
  </div>
  </div>
  );
}

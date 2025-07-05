import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectionProps {
  category: string;
  onCategoryChange: (category: string) => void;
  customCategory: string;
  onCustomCategoryChange: (customCategory: string) => void;
  disabled?: boolean;
}

const categoryOptions = [
  { value: "finance", label: "Finance & Accounting" },
  { value: "sales", label: "Sales & Marketing" },
  { value: "operations", label: "Operations & Logistics" },
  { value: "hr", label: "Human Resources" },
  { value: "product", label: "Product & Inventory" },
  { value: "customer", label: "Customer Data" },
  { value: "research", label: "Research & Development" },
  { value: "other", label: "Other" },
];

export function CategorySelection({
  category,
  onCategoryChange,
  customCategory,
  onCustomCategoryChange,
  disabled = false,
}: CategorySelectionProps) {
  return (
    <div className= "space-y-4" >
    <div>
    <Label htmlFor="category" className = "text-base font-medium" >
      Data Category
        </Label>
        < p className = "text-sm text-muted-foreground mb-3" >
          Help us understand what type of data you're analyzing
            </p>
            < Select value = { category } onValueChange = { onCategoryChange } disabled = { disabled } >
              <SelectTrigger>
              <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
  {
    categoryOptions.map((option) => (
      <SelectItem key= { option.value } value = { option.value } >
      { option.label }
      </SelectItem>
    ))
  }
  </SelectContent>
    </Select>
    </div>

  {
    category === "other" && (
      <div>
      <Label htmlFor="custom-category" > Specify Category </Label>
        < Input
    id = "custom-category"
    placeholder = "Describe your data category"
    value = { customCategory }
    onChange = {(e) => onCustomCategoryChange(e.target.value)
  }
  disabled = { disabled }
  className = "mt-1"
    />
    </div>
      )
}
</div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { FileSpreadsheet, FileUp, X } from "lucide-react";
import React from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  file: File | null;
  disabled?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  onValidationError?: (message: string) => void;
}

export function FileUpload({
  onChange,
  file,
  disabled = false,
  accept = ".xlsx,.xls,.csv",
  maxSize = 10,
  onValidationError,
}: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const acceptValues = accept.split(",");
      const fileExt = "." + selectedFile.name.split(".").pop();
      const fileMime = selectedFile.type;

      const isValidType = acceptValues.some(
        (type) =>
          type.trim() === fileExt || (fileMime && type.trim() === fileMime)
      );

      if (!isValidType) {
        onValidationError?.(`Please select a valid file type (${accept})`);
        return;
      }

      // Validate file size
      if (selectedFile.size > maxSize * 1024 * 1024) {
        onValidationError?.(`File size must be less than ${maxSize}MB`);
        return;
      }

      onChange(selectedFile);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-blue-50/50 dark:bg-blue-950/50'>
        <Input
          type='file'
          accept={accept}
          onChange={handleFileChange}
          className='hidden'
          id='file-upload'
          disabled={disabled}
        />
        <Label
          htmlFor='file-upload'
          className='cursor-pointer flex flex-col items-center gap-4'
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md'
          >
            <FileUp className='h-8 w-8 text-white' />
          </motion.div>
          <div>
            <div className='font-medium text-lg text-blue-900 dark:text-blue-300 mb-1'>
              Click to upload or drag and drop
            </div>
            <div className='text-sm text-blue-700/70 dark:text-blue-500/70'>
              Excel files (.xlsx, .xls) or CSV files up to {maxSize}MB
            </div>
          </div>
        </Label>
      </div>

      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='p-4 bg-white/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-800 rounded-lg shadow-md'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
                  <FileSpreadsheet className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <div className='font-medium text-blue-900 dark:text-blue-300'>
                    {file.name}
                  </div>
                  <Badge
                    variant='outline'
                    className='bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                  >
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </div>
              </div>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => onChange(null)}
                disabled={disabled}
                className='hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

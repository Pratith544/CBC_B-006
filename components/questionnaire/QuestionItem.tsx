"use client";

import { useState } from "react";
import { Question } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionItemProps {
  question: Question;
  response: string | string[];
  onResponse: (questionId: string, answer: string | string[]) => void;
}

export default function QuestionItem({
  question,
  response,
  onResponse,
}: QuestionItemProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onResponse(question.id, value);
  };

  const handleSelectChange = (value: string) => {
    onResponse(question.id, value);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = Array.isArray(response) ? [...response] : [];

    if (checked) {
      onResponse(question.id, [...currentValues, value]);
    } else {
      onResponse(
        question.id,
        currentValues.filter((v) => v !== value)
      );
    }
  };

  const handleRadioChange = (value: string) => {
    onResponse(question.id, value);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor={question.id} className="text-lg font-medium leading-6">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {question.type === "text" && (
        <Input
          id={question.id}
          type="text"
          value={response as string}
          onChange={handleTextChange}
          placeholder="Type your answer here"
          className="w-full"
          required={question.required}
        />
      )}

      {question.type === "select" && question.options && (
        <Select value={response as string} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {question.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {question.type === "multiselect" && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${question.id}-${option}`}
                checked={Array.isArray(response) && response.includes(option)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option, checked as boolean)
                }
              />
              <Label
                htmlFor={`${question.id}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      )}

      {question.type === "radio" && question.options && (
        <RadioGroup
          value={response as string}
          onValueChange={handleRadioChange}
          className="flex flex-col space-y-2"
        >
          {question.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${question.id}-${option}`} />
              <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}

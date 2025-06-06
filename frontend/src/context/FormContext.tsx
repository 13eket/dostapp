'use client';

import { createContext, useContext, useState } from 'react';

type DinnerPreferences = {
  spending: string;
  menuOptions: string[];
};

type FormData = {
  surveyAnswers?: Record<string, any>;
  phoneNumber?: string;
  dinnerPreferences?: DinnerPreferences;
};

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}

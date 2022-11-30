export interface Category {
  id: number;
  name: string
}

export interface JonContent {
  languageId: number,
  abbreviation: string,
  language: string,
  publicDescription:string,
  publicTitle: string,
  publishedOnJobBoard: string,
}

export interface Job {
  jobId: string,
  createdDate: string,
  updatedDate: string,
  industry: string,
  description: string,
  customerWeeklyHourEngagement: number | null,
  publishedOnJobBoard: string,
  requiredSkills: Category[],
  optionalSkills: Category[],
  role: string,
  companySize: number,
  publicTitle: string,
  isActive: boolean,
  jobLanguageContent: JonContent[]
}
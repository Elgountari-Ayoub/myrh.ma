import { JobSeeker } from "./JobSeeker";
import { Question } from "./Question";

export interface Profile {
    id?: number;
    title?: string;
    jobSeeker?: JobSeeker[];
    questions?: Question[];
  }
  
import { Question } from "./Question";

export interface Profile {
    id?: number;
    title?: string;
    questions?: Question[];
  }
  
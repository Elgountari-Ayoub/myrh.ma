import { Auth } from "./Auth";
import { Profile } from "./Profile";
import { Question } from "./Question";

export interface JobSeeker extends Auth{
    id?: number;
    title?: string;
    profile?: Profile[];
  }
  
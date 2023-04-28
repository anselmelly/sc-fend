import { Score } from "./score";

export interface Student {
  name:string,
  email: string,
  student_id: string,
  phone: string,
  id:number,
  scores:Score[]
}

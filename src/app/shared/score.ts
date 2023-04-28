import { Exam } from "./exam";
import { Student } from "./student";

export interface Score {
  id:number;
  student_id:number;
  exam_id:number;
  student:Student;
  exam:Exam;
  mark:number

}

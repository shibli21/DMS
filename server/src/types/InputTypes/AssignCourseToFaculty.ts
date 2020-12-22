import { Field, InputType } from "type-graphql";

@InputType()
export class AssignCourseToFacultyInputType {
  @Field()
  semesterId!: number;

  @Field()
  sessionId!: number;

  @Field()
  departmentCode!: string;

  @Field()
  facultyId!: number;

  @Field()
  courseCode!: string;
}

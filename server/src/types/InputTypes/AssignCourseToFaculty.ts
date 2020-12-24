import { Field, InputType } from "type-graphql";

@InputType()
export class AssignCourseToFacultyInputType {
  @Field({ nullable: true })
  semesterId!: number;

  @Field({ nullable: true })
  sessionId!: number;

  @Field({ nullable: true })
  departmentCode!: string;

  @Field({ nullable: true })
  facultyId!: number;

  @Field({ nullable: true })
  courseCode!: string;
}

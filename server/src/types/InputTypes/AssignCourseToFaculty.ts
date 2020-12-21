import { Field, InputType } from "type-graphql";

@InputType()
export class AssignCourseToFacultyInputType {
  @Field()
  semester!: string;

  @Field()
  session!: string;

  @Field()
  departmentCode!: string;

  @Field()
  facultyId!: number;

  @Field()
  courseCode!: string;
}

import { Field, InputType } from "type-graphql";

@InputType()
export class AddClassScheduleInputType {
  @Field()
  startTime!: string;

  @Field()
  endTime!: string;

  @Field()
  day!: number;

  @Field()
  sessionId!: number;

  @Field()
  semesterId!: number;

  @Field()
  courseCode!: string;

  @Field()
  departmentCode!: string;

  @Field()
  facultyId!: number;
}

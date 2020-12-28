import { Field, InputType } from "type-graphql";

@InputType()
export class AddClassScheduleInputType {
  @Field(() => [Classes], { nullable: true })
  classes!: Classes[];

  @Field({ nullable: true })
  sessionId!: number;

  @Field({ nullable: true })
  semesterId!: number;

  @Field({ nullable: true })
  courseCode!: string;

  @Field({ nullable: true })
  departmentCode!: string;

  @Field({ nullable: true })
  facultyId!: number;
}
@InputType()
class Classes {
  @Field()
  startTime!: string;

  @Field()
  endTime!: string;

  @Field()
  day!: string;
}

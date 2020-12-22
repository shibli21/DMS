import { Field, InputType } from "type-graphql";

@InputType()
export class AddSemesterInputType {
  @Field()
  number!: number;

  @Field()
  startTime!: string;

  @Field({ nullable: true })
  endTime: string;

  @Field()
  sessionId: number;

  @Field()
  departmentCode: string;
}

import { Field, InputType } from "type-graphql";

@InputType()
export class AddSemesterInputType {
  @Field({ nullable: true })
  number!: number;

  @Field({ nullable: true })
  startTime!: string;

  @Field({ nullable: true })
  endTime: string;

  @Field({ nullable: true })
  sessionId: number;

  @Field({ nullable: true })
  departmentCode: string;
}

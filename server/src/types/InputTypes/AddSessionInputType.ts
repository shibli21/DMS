import { Field, InputType } from "type-graphql";

@InputType()
export class AddSessionInputType {
  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  startTime!: string;

  @Field({ nullable: true })
  endTime: string;
}

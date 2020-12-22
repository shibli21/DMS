import { Field, InputType } from "type-graphql";

@InputType()
export class AddSessionInputType {
  @Field()
  name!: string;

  @Field()
  startTime!: string;

  @Field({ nullable: true })
  endTime: string;
}

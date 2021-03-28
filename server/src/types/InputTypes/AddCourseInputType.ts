import { Field, Float, InputType } from "type-graphql";

@InputType()
export class AddCourseInputType {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field(() => Float, { nullable: true })
  credit: number;

  @Field()
  description: string;

  @Field({ nullable: true })
  semesterId: number;

  @Field({ nullable: true })
  departmentCode: string;
}

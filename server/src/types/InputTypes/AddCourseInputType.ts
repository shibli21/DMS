import { Field, InputType } from "type-graphql";

@InputType()
export class AddCourseInputType {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field()
  credit!: number;

  @Field()
  description!: string;

  @Field()
  semester!: string;

  @Field()
  departmentCode!: string;
}

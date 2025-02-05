import { Field, InputType } from "type-graphql";
@InputType()
export class RegisterStudentInputType {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  token!: string;
}

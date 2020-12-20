import { Field, InputType } from "type-graphql";
@InputType()
export class RegisterFacultyInputType {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  token!: string;
}

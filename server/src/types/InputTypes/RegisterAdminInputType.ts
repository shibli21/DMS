import { Field, InputType } from "type-graphql";
@InputType()
export class RegisterAdminInputType {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  username!: string;

  @Field()
  token!: string;
}

import { Field, InputType } from "type-graphql";

@InputType()
export class AddFacultyInputType {
  @Field()
  email!: string;

  @Field()
  username!: string;

  @Field()
  designation: string;

  @Field()
  gender: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  contactNumber: number;
}

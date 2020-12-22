import { Field, InputType } from "type-graphql";

@InputType()
export class AddStudentInputType {
  @Field()
  email!: string;

  @Field()
  username!: string;

  @Field()
  registrationNumber: number;

  @Field()
  sessionId: number;

  @Field()
  gender: string;

  @Field()
  address: string;

  @Field()
  contactNumber: number;
}

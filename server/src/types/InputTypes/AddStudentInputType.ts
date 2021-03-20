import { Field, InputType } from "type-graphql";

@InputType()
export class AddStudentInputType {
  @Field()
  email!: string;

  @Field()
  username!: string;

  @Field({ nullable: true })
  registrationNumber: number;

  @Field()
  sessionId: number;

  @Field()
  gender: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  contactNumber: number;

  @Field({ nullable: true })
  departmentCode: string;

  @Field({ nullable: true })
  id: number;
}

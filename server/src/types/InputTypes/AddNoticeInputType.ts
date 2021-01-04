import { Field, InputType } from "type-graphql";

@InputType()
export class AddNoticeInputType {
  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  sessionId!: number;

  @Field({ nullable: true })
  semesterId!: number;

  @Field({ nullable: true })
  courseCode!: string;

  @Field({ nullable: true })
  departmentCode!: string;

  @Field({ nullable: true })
  facultyId!: number;
}

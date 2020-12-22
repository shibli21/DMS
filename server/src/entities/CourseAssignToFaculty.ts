import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { Department } from "./Department";
import { Faculty } from "./Faculty";
import { Semester } from "./Semester";
import { Session } from "./Session";

@Entity()
@ObjectType()
export class CourseAssignToFaculty extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @ManyToOne(() => Session)
  @Field(() => Session)
  session!: Session;

  @ManyToOne(() => Semester)
  @Field(() => Semester)
  semester!: Semester;

  @ManyToOne(() => Faculty, (Faculty) => Faculty)
  @Field(() => Faculty)
  faculty!: Faculty;

  @ManyToOne(() => Department, (department) => department)
  @Field(() => Department)
  department!: Department;

  @ManyToOne(() => Course, (Course) => Course.assignedFaculty)
  @Field(() => Course)
  course!: Course;
}

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Department } from "./Department";
import { Faculty } from "./Faculty";

@Entity()
@ObjectType()
export class CourseAssignToFaculty extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  semester!: string;

  @Column()
  @Field()
  session!: string;

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

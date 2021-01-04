import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Department } from "./Department";
import { Semester } from "./Semester";
import { Session } from "./Session";

@Entity()
@ObjectType()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course!: Course;

  @ManyToOne(() => Session)
  @Field(() => Session)
  session!: Session;

  @ManyToOne(() => Semester)
  @Field(() => Semester)
  semester!: Semester;

  @ManyToOne(() => Department)
  @Field(() => Department)
  department!: Department;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;
}

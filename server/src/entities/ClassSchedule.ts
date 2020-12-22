import { Semester } from "./Semester";
import { Session } from "./Session";
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
export class ClassSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ type: "time with time zone" })
  @Field()
  startTime!: string;

  @Column({ type: "time with time zone" })
  @Field()
  endTime!: string;

  @Column()
  @Field()
  day!: number;

  @ManyToOne(() => Session)
  @Field(() => Session)
  session!: Session;

  @ManyToOne(() => Semester)
  @Field(() => Semester)
  semester!: Semester;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course!: Course;

  @ManyToOne(() => Department)
  @Field(() => Department)
  department!: Department;

  @ManyToOne(() => Faculty)
  @Field(() => Faculty)
  faculty!: Faculty;
}

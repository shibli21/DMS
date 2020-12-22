import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Department } from "./Department";
import { Session } from "./Session";

@Entity()
@ObjectType()
export class Semester extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  number!: number;

  @Column({ type: "date" })
  @Field()
  startTime!: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  endTime!: string;

  @ManyToOne(() => Session, (session) => session.semester)
  @Field(() => Session)
  session: Session;

  @ManyToOne(() => Department)
  @Field(() => Department)
  department: Department;

  @OneToMany(() => Course, (course) => course.semester)
  @Field(() => [Course])
  course: Course[];
}

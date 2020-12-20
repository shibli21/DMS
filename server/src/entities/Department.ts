import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";

@Entity()
@ObjectType()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column({ unique: true })
  @Field()
  departmentCode!: string;

  @OneToMany(() => Course, (course) => course.department)
  @Field(() => [Course])
  courses: Course[];
}

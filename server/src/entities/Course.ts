import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CourseAssignToFaculty } from "./CourseAssignToFaculty";
import { Department } from "./Department";
import { Semester } from "./Semester";

@Entity()
@ObjectType()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ unique: true })
  @Field()
  code!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  credit!: number;

  @Column()
  @Field()
  description!: string;

  @ManyToOne(() => Department, (department) => department.courses)
  @Field(() => Department)
  department!: Department;

  @ManyToOne(() => Semester, (semester) => semester.course)
  @Field(() => Semester)
  semester!: Semester;

  @OneToMany(
    () => CourseAssignToFaculty,
    (CourseAssignToFaculty) => CourseAssignToFaculty.course
  )
  @Field(() => [CourseAssignToFaculty])
  assignedFaculty!: CourseAssignToFaculty[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}

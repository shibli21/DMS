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
import { Session } from "./Session";

@Entity()
@ObjectType()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
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

  @ManyToOne(() => Department, (department) => department.courses, {
    onDelete: "CASCADE",
  })
  @Field(() => Department)
  department!: Department;

  @ManyToOne(() => Semester, (semester) => semester.course)
  @Field(() => Semester)
  semester!: Semester;

  @ManyToOne(() => Session, (session) => session.id)
  @Field(() => Session)
  session!: Session;

  @OneToMany(() => CourseAssignToFaculty, (CourseAssignToFaculty) => CourseAssignToFaculty.course)
  @Field(() => [CourseAssignToFaculty])
  assignedFaculty!: CourseAssignToFaculty[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}

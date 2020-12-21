import { CourseAssignToFaculty } from "./CourseAssignToFaculty";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Faculty extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  username!: string;

  @Column()
  @Field()
  designation!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  oneTimePassword: string;

  @Column()
  @Field()
  gender: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  contactNumber: number;

  @OneToMany(
    () => CourseAssignToFaculty,
    (courseAssignToFaculty) => courseAssignToFaculty.faculty
  )
  @Field(() => [CourseAssignToFaculty])
  assignedTo: CourseAssignToFaculty[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}

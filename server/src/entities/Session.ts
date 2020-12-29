import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Semester } from "./Semester";

@Entity()
@ObjectType()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column({ type: "date" })
  @Field()
  startTime!: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  endTime!: string;

  @OneToMany(() => Semester, (semester) => semester.session)
  @Field(() => [Semester])
  semester: Semester[];
}

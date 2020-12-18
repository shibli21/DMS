import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ unique: true })
  @Field()
  registrationNumber: number;

  @Column()
  @Field()
  session: number;

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}

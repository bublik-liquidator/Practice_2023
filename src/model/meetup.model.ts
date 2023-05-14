
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Meetup {
  @PrimaryGeneratedColumn()
  id!: bigint;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  tags!: string[];

  @Column()
  place!: string;

  @Column()
  time!: string;

  // constructor(
  //   id: bigint,
  //   name: string,
  //   description: string,
  //   tags: string[],
  //   place: string,
  //   time: string
  // ) {
  //   this.id = id;
  //   this.name = name;
  //   this.description = description;
  //   this.tags = tags;
  //   this.place = place;
  //   this.time = time;
  // }
  
}

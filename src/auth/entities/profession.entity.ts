import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('professions')
export class Profession {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  professionName: string;

  // Relación muchos a muchos con usuarios
  @ManyToMany(() => User, (user) => user.professions)
  users: User[];

  @BeforeInsert()
  @BeforeUpdate()
  async toLowerCaseProfession() {
    this.professionName = this.professionName.toLowerCase();
  }
}

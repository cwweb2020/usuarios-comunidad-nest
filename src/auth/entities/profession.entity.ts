import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './user.entity';

@Entity('professions')
export class Profession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

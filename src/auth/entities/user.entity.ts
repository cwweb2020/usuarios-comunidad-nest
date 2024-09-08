import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profession } from './profession.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid') // Usar UUID como ID
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  firstName: string; // Nombre

  @ApiProperty()
  @Column({ type: 'varchar' })
  lastName: string; // Apellido

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  email: string;

  // @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'int' })
  age: number; // Edad

  @ApiProperty()
  @Column('text', { array: true }) // Array de idiomas
  languages: string[]; // Idiomas

  @ApiProperty()
  @Column()
  phone: string; // Teléfono

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'text' })
  location: string; // Ubicación

  @ApiProperty()
  @Column({ type: 'int' })
  credentialNum: number;

  @ApiProperty()
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  // Convertir nombre, apellido, profesión y ubicación a minúsculas antes de insertar o actualizar
  @BeforeInsert()
  @BeforeUpdate()
  async toLowerCaseFields() {
    this.firstName = this.firstName.toLowerCase();
    this.lastName = this.lastName.toLowerCase();
    this.location = this.location.toLowerCase();
    this.languages = this.languages.map((language) => language.toLowerCase());
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // Hashear la contraseña antes de insertar
    this.generateCredentialNum(); // Generar el número de credencial solo en la inserción
  }

  // Generar un número de credenciales de 8 dígitos al azar
  generateCredentialNum() {
    if (!this.credentialNum) {
      this.credentialNum = Math.floor(10000000 + Math.random() * 90000000);
    }
  }

  // relacion
  @ManyToMany(() => Profession, (profession) => profession.users, {
    cascade: true,
  })
  @JoinTable({ name: 'user_professions' }) // Define una tabla intermedia llamada user_professions
  professions: Profession[];
}

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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') // Usar UUID como ID
  id: string;

  @Column({ type: 'varchar' })
  firstName: string; // Nombre

  @Column({ type: 'varchar' })
  lastName: string; // Apellido

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  age: number; // Edad

  @Column('text', { array: true }) // Array de idiomas
  languages: string[]; // Idiomas

  @Column()
  phone: string; // Teléfono

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'text' })
  location: string; // Ubicación

  @Column({ type: 'int' })
  credentialNum: number;

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

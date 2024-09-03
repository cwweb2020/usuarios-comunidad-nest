import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Cryptocurrency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @Column({ type: 'varchar', unique: true })
  ticker: string;

  @Column({ type: 'float', default: 0 })
  precioCompra: number;

  @Column({ type: 'float' })
  cantidadComprada: number;

  @Column({ type: 'float', nullable: true })
  cantidadInvertida: number;

  // logica para lowercase los strings
  @BeforeInsert()
  @BeforeUpdate()
  toLowerCase() {
    if (this.nombre) {
      this.nombre = this.nombre.toLowerCase();
    }
    if (this.ticker) {
      this.ticker = this.ticker.toLowerCase();
    }
  }

  // Lógica para calcular la cantidad invertida
  @BeforeInsert()
  @BeforeUpdate()
  calculateCantidadInvertida() {
    this.cantidadInvertida = this.precioCompra * this.cantidadComprada;
  }
}

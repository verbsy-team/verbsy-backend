import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'username', type: 'text' })
  username: string;

  @Column()
  password: string;

  @Column({ name: 'full_name', type: 'text', nullable: true })
  fullName: string;

  @Column({ name: 'email', type: 'text' })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'role_id', type: 'tinyint', default: 2 })
  roleId: number;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
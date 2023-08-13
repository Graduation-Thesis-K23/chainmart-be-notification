import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../../common/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  sync_id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;
}

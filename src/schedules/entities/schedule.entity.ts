import { AuditableEntity } from "src/common/entites/auditable.entity";
import { ISchedule } from "src/common/interfaces/schedule.interface";
import { Service } from "src/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedules')
export class Schedule extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('interval', { nullable: true })
  slotDuration: string;

  @Column('jsonb', { nullable: true })
  schedule: ISchedule;

  @Column('boolean', { nullable: true })
  isActive: boolean;

  @ManyToOne(() => Service, (service) => service.schedules, { nullable: false })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}


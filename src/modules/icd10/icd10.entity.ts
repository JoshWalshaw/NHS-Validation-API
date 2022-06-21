import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Icd10 {
  @PrimaryColumn()
  code: string;

  @Index()
  @Column()
  altCode: string;

  @Column({ type: 'tinytext' })
  usage: string;

  @Column({ type: 'tinytext' })
  usageUk: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  qualifiers?: string;

  @Column({ nullable: true })
  genderMask?: 1 | 2;

  @Column({ nullable: true })
  minAge?: number;

  @Column({ nullable: true })
  maxAge?: number;

  @Column({ type: 'text', nullable: true })
  treeDescription?: string;
}

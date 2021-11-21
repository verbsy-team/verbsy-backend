import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player_data')
export class PlayerData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'player_id' })
  playerId: number;

  @Column({ name: 'question_id' })
  questionId: number;

  @Column({ name: 'answer_id', nullable: true })
  answerId: number;

  @Column({ name: 'answer', nullable: true })
  answer: string;

  @Column({ name: 'is_correct' })
  isCorrect: boolean;

  @Column({ name: 'answer_time' })
  answerTime: number;

  @Column({ name: 'score' })
  score: number;
}
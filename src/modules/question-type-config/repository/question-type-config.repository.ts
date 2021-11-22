import { EntityRepository, Repository } from 'typeorm';
import { QuestionTypeConfig } from '../entities/question-type-config.entity';

@EntityRepository(QuestionTypeConfig)
export class GameRepository extends Repository<QuestionTypeConfig> {}

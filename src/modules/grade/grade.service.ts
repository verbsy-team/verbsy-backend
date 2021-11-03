import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassesRepository } from '../classes/repository/classes.repository';
import { SchoolYear } from '../school-year/entities/school-year.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepo: Repository<Grade>,
    @InjectRepository(SchoolYear)
    private schoolYearRepo: Repository<SchoolYear>,
    private classRepo: ClassesRepository,
  ) {}
  async create(createGrade: CreateGradeDto): Promise<Grade> {
    try {
      const grade = new Grade();
      grade.name = createGrade.name;
      return await grade.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Grade[]> {
    try {
      const grades = await this.gradeRepo.createQueryBuilder().getMany();
      for (let grade of grades) {
        const classes = await this.classRepo.find({ gradeId: grade.id });
        grade = Object.assign(grade, { classes: classes });
      }
      return grades;
    } catch (error) {
      throw new InternalServerErrorException('Error while getting grade');
    }
  }

  async findOne(id: number): Promise<Grade> {
    try {
      const data = await this.gradeRepo.findOne(id);
      if (!data) {
        throw new NotFoundException('Grade does not exist');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    try {
      const data = await this.gradeRepo.findOne(id);
      if (!data) {
        throw new NotFoundException('Grade does not exist');
      }
      await this.gradeRepo.update(id, updateGradeDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.gradeRepo.findOne(id);
      if (!data) {
        throw new NotFoundException('Grade does not exist');
      }
      await this.gradeRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
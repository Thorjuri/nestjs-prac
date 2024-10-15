import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): string {
    return 'Request function is findAll';
  }

  async getOne(id): Promise<object> {
    return await this.databaseService.getSingleBySubmissionId(id);
  }

  async getList(projectId, startDate, endDate): Promise<object> {
    return await this.databaseService.queryListByProjectId(
      projectId,
      startDate,
      endDate,
    );
  }

  create(createUserDto): object {
    return createUserDto;
  }
}

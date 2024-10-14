import { Injectable } from '@nestjs/common';
import { DatabaseService} from "../database/database.service";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): string {
    return 'Request function is findAll';
  }

  async findOne(id): Promise<any> {
    return await this.databaseService.getSingleBySubmissionId(id);
  }
  create(createUserDto): object {
    return createUserDto;
  }
}

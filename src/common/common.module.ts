import { Module, Global } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { AiService } from './services/ai.service';
import { OpenAIService } from './services/openai.service';
import { AiController } from './controllers/ai.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AiController],
  providers: [AiService, OpenAIService],
  exports: [AiService],
})
export class AiModule {}

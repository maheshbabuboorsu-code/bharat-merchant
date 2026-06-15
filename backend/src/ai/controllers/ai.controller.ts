import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from '../services/ai.service';
import {
  GenerateProductDescriptionDto,
  GenerateHashtagsDto,
  GenerateMarketingContentDto,
} from '../dto';

@ApiTags('AI')
@Controller('ai')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate-description')
  @ApiOperation({ summary: 'Generate product description' })
  async generateDescription(@Request() req, @Body() dto: GenerateProductDescriptionDto) {
    return this.aiService.generateProductDescription(req.user.userId, '', dto);
  }

  @Post('generate-seo-title/:productId')
  @ApiOperation({ summary: 'Generate SEO title' })
  async generateSeoTitle(
    @Request() req,
    @Param('productId') productId: string,
    @Body() body: { productTitle: string; category: string; language: string },
  ) {
    return this.aiService.generateSeoTitle(
      req.user.userId,
      productId,
      body.productTitle,
      body.category,
      body.language,
    );
  }

  @Post('generate-bullet-points/:productId')
  @ApiOperation({ summary: 'Generate bullet points' })
  async generateBulletPoints(
    @Request() req,
    @Param('productId') productId: string,
    @Body() body: { productTitle: string; description: string; language: string },
  ) {
    return this.aiService.generateBulletPoints(
      req.user.userId,
      productId,
      body.productTitle,
      body.description,
      body.language,
    );
  }

  @Post('generate-hashtags/:productId')
  @ApiOperation({ summary: 'Generate hashtags' })
  async generateHashtags(
    @Request() req,
    @Param('productId') productId: string,
    @Body() dto: GenerateHashtagsDto,
  ) {
    return this.aiService.generateHashtags(req.user.userId, productId, dto);
  }

  @Post('generate-instagram-caption/:productId')
  @ApiOperation({ summary: 'Generate Instagram caption' })
  async generateInstagramCaption(
    @Request() req,
    @Param('productId') productId: string,
    @Body() body: { productTitle: string; description: string; language: string },
  ) {
    return this.aiService.generateInstagramCaption(
      req.user.userId,
      productId,
      body.productTitle,
      body.description,
      body.language,
    );
  }

  @Post('generate-whatsapp-text/:productId')
  @ApiOperation({ summary: 'Generate WhatsApp sales text' })
  async generateWhatsappText(
    @Request() req,
    @Param('productId') productId: string,
    @Body() body: { productTitle: string; price: number; language: string },
  ) {
    return this.aiService.generateWhatsappText(
      req.user.userId,
      productId,
      body.productTitle,
      body.price,
      body.language,
    );
  }

  @Post('generate-facebook-ad/:productId')
  @ApiOperation({ summary: 'Generate Facebook ad copy' })
  async generateFacebookAd(
    @Request() req,
    @Param('productId') productId: string,
    @Body() body: { productTitle: string; description: string; language: string },
  ) {
    return this.aiService.generateFacebookAd(
      req.user.userId,
      productId,
      body.productTitle,
      body.description,
      body.language,
    );
  }

  @Post('profit-recommendation')
  @ApiOperation({ summary: 'Get profit recommendation' })
  async profitRecommendation(
    @Request() req,
    @Body() body: { costPrice: number; sellingPrice: number; marketplace: string },
  ) {
    return this.aiService.generateProfitRecommendation(
      req.user.userId,
      body.costPrice,
      body.sellingPrice,
      body.marketplace,
    );
  }

  @Get('history')
  @ApiOperation({ summary: 'Get AI generation history' })
  async getHistory(@Request() req, @Query('skip') skip = 0, @Query('take') take = 10) {
    return this.aiService.getGenerationHistory(req.user.userId, Number(skip), Number(take));
  }
}

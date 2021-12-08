import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GameStatisticsService } from './game-statistics.service';

@Controller('game-statistics')
export class GameStatisticsController {
  constructor(private readonly gameStatisticsService: GameStatisticsService) {}

  @Get('leaderboard/:gameId')
  async getLeaderboard(@Param('gameId') gameId: number) {
    const leaderboard = await this.gameStatisticsService.getLeaderboard(gameId);
    return {
      status: HttpStatus.OK,
      message: 'h',
      data: {
        leaderboard,
      },
    };
  }

  @Get('summary/:gameId')
  async getGameSummary(@Param('gameId') gameId: number) {
    const generalInfo = await this.gameStatisticsService.getGameGeneralInfo(
      gameId,
    );
    const leaderboard = await this.gameStatisticsService.getLeaderboard(gameId);
    const completionRate =
      await this.gameStatisticsService.getGameCompletionRate(gameId);
    return {
      status: HttpStatus.OK,
      message: 'h',
      data: {
        summary: generalInfo,
        leaderboard,
        completionRate,
      },
    };
  }

  @Get('player/:playerId')
  async getPlayerDetailedStats(@Param('playerId') playerId: number) {
    const playerData = await this.gameStatisticsService.getPlayerDetailedStats(
      playerId,
    );
    return {
      status: HttpStatus.OK,
      message: 'h',
      data: playerData,
    };
  }

  @Get('question/:gameId/:questionId')
  async getQuestionDetailedStats(
    @Param('gameId') gameId: number,
    @Param('questionId') questionId: number,
  ) {
    const questionStats =
      await this.gameStatisticsService.getQuestionDetailedStats(
        gameId,
        questionId,
      );
    return {
      status: HttpStatus.OK,
      message: 'h',
      data: questionStats,
    };
  }
}

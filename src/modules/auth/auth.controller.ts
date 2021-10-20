import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/constant/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { readXlsxFile } from 'read-excel-file/node';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ user; accessToken }> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('login')
  async signIn(@Body() logInDto: LogInDto): Promise<{ user; accessToken }> {
    return await this.authService.logIn(logInDto);
  }
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Administrator)
  @Post('gen-student-acc')
  @UseInterceptors(FileInterceptor('file'))
  async generateStudentAccount(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    // const xlxs = await readXlsxFile(file, { sheet: 1 });
  }
}

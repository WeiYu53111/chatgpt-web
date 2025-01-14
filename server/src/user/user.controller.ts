import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto, UserRegisterDto } from './dto/user.dto';
import { Response } from '../interface/response.interface';
import { AuthService } from '../base/auth.service';
import { EmailService } from '../base/email.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Post('/login')
  async login(@Body() userDto: UserLoginDto): Promise<Response> {
    //base64解码
    const decodedString = atob(userDto.password);
    //RSA解密
    const newPw = this.authService.rsaDecode(decodedString);
    userDto.password = newPw;
    const user = await this.userService.findUser(userDto);
    if (user) {
      const toekn = await this.authService.generateToken({
        email: userDto.email,
      });

      const resData = {
        data: { token: toekn },
        message: '登录成功',
        status: 'Success',
      };

      //更新最近登录时间
      await this.userService.updateLoginTime(userDto.email);

      return Promise.resolve(resData);
    } else {
      const resData = {
        data: {},
        message: '用户名或密码错误',
        status: 'Fail',
      };
      return Promise.resolve(resData);
    }
  }

  @Post('new')
  public async register(@Body() userDto: UserRegisterDto): Promise<Response> {
    if (!this.emailService.checkEmailCode(userDto.email, userDto.emailCode)) {
      return Promise.resolve({
        data: '',
        message: '验证码错误或超时',
        status: 'Fail',
      });
    }
    try {
      //base64解码
      const decodedString = atob(userDto.password);
      //RSA解密
      const newPw = this.authService.rsaDecode(decodedString);
      userDto.password = newPw;
      const result: any = await this.userService.createUser(userDto);
      return Promise.resolve({
        data: '',
        message: '注册成功',
        status: 'Success',
      });
    } catch (err) {
      this.logger.error(err);
      return Promise.resolve({
        status: 'Fail',
        message: err.message,
        data: null,
      });
    }
  }

  @Post('reset')
  public async updatePw(@Body() userDto: UserRegisterDto): Promise<Response> {
    if (!this.emailService.checkEmailCode(userDto.email, userDto.emailCode)) {
      return Promise.resolve({
        data: '',
        message: '验证码错误或超时',
        status: 'Fail',
      });
    }

    //base64解码
    const decodedString = atob(userDto.password);
    //RSA解密
    const newPw = this.authService.rsaDecode(decodedString);
    userDto.password = newPw;
    this.logger.log('base64:' + userDto.password);
    this.logger.log('rsa:' + decodedString);
    this.logger.log('rsa:' + newPw);

    try {
      const result: any = await this.userService.updatePw(userDto);
      return Promise.resolve({
        data: '',
        message: '密码重置成功',
        status: 'Success',
      });
    } catch (err) {
      this.logger.error(err);
      return Promise.resolve({
        status: 'Fail',
        message: err.message,
        data: null,
      });
    }
  }
}

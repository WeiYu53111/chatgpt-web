import { Body, Controller, Post, Req } from '@nestjs/common';
import { Response } from '../interface/response.interface';
import { StatService } from './stat.service';

@Controller('stat')
export class StatController {
  constructor(private statService: StatService) {}

  @Post('/userdata')
  async fetchUserData(): Promise<Response> {
    const userData = await this.statService.fetchUserData();
    if (userData) {
      const resData = {
        data: userData,
        message: '登录成功',
        status: 'Success',
      };
      return Promise.resolve(resData);
    } else {
      const resData = {
        data: {},
        message: '获取用户数据异常',
        status: 'Fail',
      };
      return Promise.resolve(resData);
    }
  }

  @Post('/user_his_data')
  async fetchUserHisData(): Promise<Response> {
    const userHisData = await this.statService.fetchUserHisData();
    if (userHisData) {
      const resData = {
        data: userHisData,
        message: '登录成功',
        status: 'Success',
      };
      return Promise.resolve(resData);
    } else {
      const resData = {
        data: {},
        message: '获取用户数据异常',
        status: 'Fail',
      };
      return Promise.resolve(resData);
    }
  }
}

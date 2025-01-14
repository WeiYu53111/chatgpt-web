import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserLoginDto, UserRegisterDto } from './dto/user.dto';
import { UserStat } from '../entity/userStat.entity';
import { formatDate } from '../util/common';
import { UserData } from '../stat/interface/userData.interface';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    this.logger.log('UserService init');
  }

  /**
   * 通过用户名和密码查找单个用户
   * @param userDto
   */
  public async findUser(userDto: UserLoginDto): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email: userDto.email,
        password: userDto.password,
      },
    });
  }

  /**
   * 通过用户名和密码查找单个用户
   * @param userDto
   */
  public async findUserByName(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  /**
   * 获取所有用户信息
   */
  public async findAllUser(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        email: 'asc',
      },
    });
  }

  public getUserRepo(): Repository<User> {
    return this.usersRepository;
  }

  public async updateLoginTime(email: string) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ last_login_time: new Date() })
      .where('email = :email', { email })
      .execute();
  }

  public async createUser(userDto: UserRegisterDto) {
    const u = new User();
    u.email = userDto.email;
    u.password = userDto.password;
    u.create_time = new Date();
    await this.usersRepository.save(u);
  }

  public async updatePw(userDto: UserRegisterDto) {
    const email = userDto.email;
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: userDto.password })
      .where('email = :email', { email })
      .execute();
  }
}

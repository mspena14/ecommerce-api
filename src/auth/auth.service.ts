import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    try {
      const user: User = await this.userService.findOneByEmail(email);


      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, role: user.role, user_id: user.id };

      const token = await this.jwtService.signAsync(payload);

      const userId = user.id;

      return {
        token,
        email,
        userId,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new QueryFailedError('Bad request', undefined, error);
      }
      throw new InternalServerErrorException(
        error.message || 'Internal server error',
      );
    }
  }

  async register({ name, email, password, role, phone }: RegisterUserDto) {
    try {
      const salt: string = bcrypt.genSaltSync();
      const userCreated: User = await this.userService.createUser({
        name,
        email,
        password: await bcrypt.hash(password, salt),
        phone,
        role,
      });
      const registerResponse = {
        id: userCreated.id,
        email: userCreated.email,
        role: userCreated.role,
      };


      return registerResponse;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new QueryFailedError('Bad request', undefined, error);
      }
      throw new InternalServerErrorException(
        error.message || 'Internal server error',
      );
    }
  }

  async profile({ email }: { email: string }) {
    return await this.userService.findOneByEmail(email);
  }
}

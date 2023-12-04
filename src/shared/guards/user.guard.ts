import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers.authorization &&
      request.headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('Invalid token!');

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'ultraSecretSecret',
      });

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}

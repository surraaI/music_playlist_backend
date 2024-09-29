import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';  // Assuming you have a user module
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }), 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService], 
  controllers: [AuthController], 
  exports: [AuthService],
})
export class AuthModule {}

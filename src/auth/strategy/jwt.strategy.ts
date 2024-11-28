import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayloadDto } from "../dto/tokenPayload.dto";
import { ConfigService } from "@nestjs/config";
import { TokenExpiredError } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_ACCESS'),       
      ignoreExpiration: false,

    });
  }
  async validate(payload: TokenPayloadDto) {
    return {id: payload.id, role: payload.role}
  }

  handleRequest(err, user, info, context) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Your token has expired. Please log in again.');
    } else if (err || !user) {
      throw err || new UnauthorizedException('Invalid token or user not found.');
    }
    return user; 
  }
}






import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     console.log("Authorization Header:", request.headers['authorization']);
//     console.log("Before can activate")

//     try {
      
//       const canActivate = await super.canActivate(context);
//       console.log("canActivate result:", canActivate);

//       console.log("After can activate");
//       console.log(canActivate);
//       return canActivate as boolean;
//     } catch (error) {
      
//       console.error("Error during canActivate:", error);
//       return false;
//     }
//  }
}
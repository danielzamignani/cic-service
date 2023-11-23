import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { jwtDecode } from "jwt-decode";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): Promise<any> => {
        const request = context.switchToHttp().getRequest<Request>();
        const jwt = request.headers['authorization'];

        if(jwt) {
            return jwtDecode(jwt);
        } else {
            return null;
        }
      }
)
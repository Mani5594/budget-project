import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepository: UsersRepository
    ) {
        super(
            {
                secretOrKey: 'topSecret51',
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            }
        );
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { userName } = payload;
        const user: User = await this.usersRepository.findOne({ where: {userName}} )

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
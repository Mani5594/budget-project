import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

export interface singInRes{
    accessToken: string 
    userName: string 
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsdto: AuthCredentialsDto): Promise<singInRes>  {
        const {userName, password } = authCredentialsdto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = this.usersRepository.create({
            userName,
            password: hashedPassword,
        })
        try {
            await this.usersRepository.save(user);
            return await this.signIn(authCredentialsdto);
        } catch (error) {
            if (error.code === '23505') { // duplicate user name
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsdto: AuthCredentialsDto): Promise<singInRes> {
        const {userName, password } = authCredentialsdto;
        const user = await this.usersRepository.findOne({where: {userName}})

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { userName }
            const accessToken: string = this.jwtService.sign(payload)
            return { accessToken , userName}
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }

    }
}

import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { UserEntity } from 'src/user/models/user.model';
import { Not, Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dto/createUser';
import { FindAllUserData } from './dto/findAllResponseDTO';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  comparePassword,
  generateToken,
  IGenerateToken,
} from 'src/common/helper';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // user register functionality
  async createUser(createObj: CreateUserInput): Promise<CreateUserOutput> {
    const { name, email, password } = createObj;
    const lowerEmail = email.toLowerCase();
    const findOneData = await this.userRepository.findOne({
      where: { email: lowerEmail },
      select: ['email'],
    });
    if (findOneData && findOneData.email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }
    // const hashPasswordValue = await hashPassword(Password);
    const dataObject: CreateUserInput = {
      name,
      email: lowerEmail,
      password
    };
    const createUserQuery = this.userRepository.create(dataObject);
    const saveUserData = await this.userRepository.save(createUserQuery);
    return saveUserData;
  }

  // user login functionality
  async userLogin(Email: string, Password: string): Promise<{ Token: string }> {
    const lowerEmail = Email.toLowerCase();
    const findUserData = await this.userRepository.findOne({
      where: {
        email: lowerEmail,
      },
      select: ['ID', 'email', 'name', 'password'],
    });
    if (!findUserData) {
      throw new NotFoundException(constant.EMAIL_NOT_FOUND);
    }
    const IsValidPassword = await comparePassword(
      Password,
      findUserData.password,
    );
    if (!IsValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }
    const payloadObject: IGenerateToken = {
      ID: findUserData.ID,
      Name: findUserData.name,
      Email: findUserData.email,
    };
    const getToken = generateToken(payloadObject);
    return { Token: `Bearer ${getToken}` };
  }

 async findAllUserData(): Promise<FindAllUserData[]> {

    return this.userRepository.find({
      select: ['ID', 'name', 'email'],
    });
  }

  async getUser(email : string ): Promise<UserEntity>{
    return this.userRepository.findOneBy({email :email});
  }
}

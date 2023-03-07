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
  hashPassword,
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
    const { Name, Email, Password } = createObj;
    const lowerEmail = Email.toLowerCase();
    const findOneData = await this.userRepository.findOne({
      where: { Email: lowerEmail },
      select: ['Email'],
    });
    if (findOneData && findOneData.Email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }
    const hashPasswordValue = await hashPassword(Password);
    const dataObject: CreateUserInput = {
      Name,
      Email: lowerEmail,
      Password: hashPasswordValue,
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
        Email: lowerEmail,
      },
      select: ['ID', 'Email', 'Name', 'Password'],
    });
    if (!findUserData) {
      throw new NotFoundException(constant.EMAIL_NOT_FOUND);
    }
    const IsValidPassword = await comparePassword(
      Password,
      findUserData.Password,
    );
    if (!IsValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }
    const payloadObject: IGenerateToken = {
      ID: findUserData.ID,
      Name: findUserData.Name,
      Email: findUserData.Email,
    };
    const getToken = generateToken(payloadObject);
    return { Token: `Bearer ${getToken}` };
  }

 async findAllUserData(): Promise<FindAllUserData[]> {
    return this.userRepository.find({
      select: ['ID', 'Name', 'Email'],
    });
  }

  async getUser(email : string ): Promise<UserEntity>{
    return this.userRepository.findOneBy({Email :email});
  }
}

import { IUserRepository } from "./types";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async userById(id: string) {
    return await this.userRepository.get(id);
  }
  
}

export type IUserService = UserService;

export default UserService;
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const loggedUser = this.usersRepository.findById(user_id);

    if (!loggedUser) {
      throw new Error(`Logged user does not exists.`);
    }

    if (!loggedUser.admin) {
      throw new Error(`You can't list all user because you're not an admin.`);
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

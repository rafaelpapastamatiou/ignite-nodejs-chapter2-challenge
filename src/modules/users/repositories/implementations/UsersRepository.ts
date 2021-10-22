import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const currentDate = new Date();
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: currentDate,
      updated_at: currentDate,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.indexOf(receivedUser);

    const updatedUser = {
      ...receivedUser,
      updated_at: new Date(),
      admin: true,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

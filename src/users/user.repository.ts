import { EntityRepository, Repository } from "typeorm";
import { User } from "../Entity/users.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

}
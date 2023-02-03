import { EntityRepository, Repository } from "typeorm";
import {  UserEntity } from "../Entity/users.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

}
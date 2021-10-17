import DataLoader from "dataloader";
import { ServicesContext } from "./index";
import { User } from "./types";


export function makeDataLoader(services: ServicesContext) {
  async function batchGetUsers (userIds: readonly string[]) {
    const userMap = new Map();
    const results = await services.userService.usersByIds([...userIds]);

    results.forEach(user => {
      userMap.set(user.id, user);
    });

    return userIds.map((id) => userMap.get(id));
  }
  
  return {
    userLoader: new DataLoader<string, User>(keys => batchGetUsers(keys)),
  };
}
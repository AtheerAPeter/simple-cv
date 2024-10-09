import Axios from "axios";
import { skillsUpdateApi } from "./skillsUpdateApi";
import { userApi } from "./userApi";

export const client = Axios.create({
  baseURL: "/api",
});

export const HttpClient = {
  SkillsUpdateApi: skillsUpdateApi(client),
  UserApi: userApi(client),
};

import Axios from "axios";
import { skillsUpdateApi } from "./skillsUpdateApi";

export const client = Axios.create({
  baseURL: "/api",
});

export const HttpClient = {
  SkillsUpdateApi: skillsUpdateApi(client),
};

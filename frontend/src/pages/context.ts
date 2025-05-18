import { createContext } from "react";
import {User} from "../components/LoginForm"
export const UserContext = createContext<User | undefined>(undefined)

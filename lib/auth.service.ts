"use client";
import Cookies from "js-cookie";

class AuthService {

  public static saveAuthToken = (token: string, name: string, email: string) => {
    Cookies.set("token", token);
    Cookies.set("name", name);
    Cookies.set("email", email);
  };

  public static getAuthToken = () => {
    const token = Cookies.get("token");
    return token;
  };


  public static removeAuthToken = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("email");
  };
}

export default AuthService;

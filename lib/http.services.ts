"use client";
import axios from "axios";
import Cookies from 'js-cookie';
import AuthService from "./auth.service";

class HttpService {
  private static api = () => {
    const api = axios.create({
      baseURL: "http://192.168.7.200:8000/api/",
    });

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          console.error("You are not logged in");
          AuthService.removeAuthToken();
          window.location.href = "/login";
          return Promise.reject();
        }
        return Promise.reject(error);
      }
    );

    api.interceptors.request.use((config) => {
      const token = Cookies.get("token");
      if (token && token != "" && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    return api;
  };
  public static get = async (url: string) => {
    const api = this.api();
    return await api.get(url);
  };
  public static patch = async (url: string, data: any) => {
    const api = this.api();
    return await api.patch(url, data);
  };
  public static post = async (url: string, data: any) => {
    const api = this.api();
    return await api.post(url, data);
  };
  public static delete = async (url: string) => {
    const api = this.api();
    return await api.delete(url);
  };

  public static get_sync = (url: string) => {
    const api = this.api();
    return api.get(url);
  };

  public static post_sync = (url: string, data: any) => {
    const api = this.api();
    return api.post(url, data);
  };
}

export default HttpService;

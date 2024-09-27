import { COOKIE_KEY } from "@/types/enums";

export const getCookie = (name: COOKIE_KEY) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const setCookie = (name: COOKIE_KEY, value: string, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // expires in `days`
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

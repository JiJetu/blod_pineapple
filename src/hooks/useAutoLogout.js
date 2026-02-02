import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/auth.slice";

const getJwtExpiry = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  } catch {
    return null;
  }
};

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    const accessExpiry = getJwtExpiry(accessToken);
    const refreshExpiry = getJwtExpiry(refreshToken);

    if (!accessExpiry || !refreshExpiry) {
      dispatch(logout());
      return;
    }

    // Logout at earliest expiry
    const logoutAt = Math.min(accessExpiry, refreshExpiry);
    const timeout = logoutAt - Date.now();

    if (timeout <= 0) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => dispatch(logout()), timeout);
    return () => clearTimeout(timer);
  }, [accessToken, refreshToken, dispatch]);
};

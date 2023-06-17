import jwtDecode, { JwtPayload } from "jwt-decode";

export const jwtGetUserId = (token: string) => {
  type AppJwtPayload = {
    user_id: string | number;
  };
  const decoded: AppJwtPayload = jwtDecode(token);
  return decoded.user_id;
};

export default jwtGetUserId;
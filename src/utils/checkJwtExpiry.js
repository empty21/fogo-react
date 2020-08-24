import jwtDecode from "jwt-decode";

const checkJwtExpiry = (token) => {
  try{
    const decoded = jwtDecode(token);
    return Date.now() + 600 * 1000 <= decoded.exp * 1000;
  } catch (e) {
    return false
  }
}
export default checkJwtExpiry
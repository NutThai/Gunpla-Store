import { jwtDecode } from "jwt-decode";
import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  //   if (process.server) {
  //     return
  // }
  const userStore = useUserStore();
  const token = useCookie("token");
  //   console.log(userStore.isAdmin);
  //   const role = "customer";
  // console.log(userStore.user);
  const { role } = token.value ? jwtDecode(token.value) : "";
  if (role != "admin" && to.name == "admin") {
    console.log("1", !userStore.isAdmin);
    console.log("2", to.path == "/admin");
    return abortNavigation();
  }
  if ((to.name == "profile" || to.name == "checkout" || to.name == "order-History") && !token.value) {
    return navigateTo("/login");
  }
});

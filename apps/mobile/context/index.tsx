import { UserProvider } from "./user";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default ContextWrapper;

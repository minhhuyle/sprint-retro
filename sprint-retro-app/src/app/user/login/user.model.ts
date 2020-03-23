class User {
  id?: number;
  userName: string;
  password: string;
  role?: string;
}

class UserLocal extends User{
  isLogged: boolean;
}

export {
  User,
  UserLocal
}

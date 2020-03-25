class User {
  id?: number;
  userName: string;
  password: string;
  role?: string;
}

class UserLocal extends User{
  isLogged: boolean;
  totalVotedPostIts?: number;
}

export {
  User,
  UserLocal
}

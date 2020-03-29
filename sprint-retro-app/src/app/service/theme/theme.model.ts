class Theme {
  id: number;
  name: string;
  limitTimeToWrite: number;
  writeTime: Date;
  selectedTheme: Date;
  maxPostIt: number;
  maxVote: number;
  boards: Board[];

  constructor() {
    this.boards = [];
  }
}

class Board {
  id: number;
  type: string;
  likable: boolean;
}

class PostIt {
  id: number;
  vote: number;
  comment: string;
  type: string;
  linkedPostIts: PostIt [];

  constructor(type: string) {
    this.vote = 0;
    this.type = type;
  }
}

export {
  Theme,
  Board,
  PostIt
}

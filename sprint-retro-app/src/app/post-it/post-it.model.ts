enum PostItType {
  GOOD = 'GOOD',
  KEEP = 'KEEP',
  BAD = 'BAD'
}

class PostIt {
  id: number;
  vote: number;
  comment: string;

  constructor() {
    this.vote = 0;
  }
}

export {
  PostItType,
  PostIt
}

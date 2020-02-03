enum PostItType {
  GOOD = 'GOOD',
  KEEP = 'KEEP',
  BAD = 'BAD'
}

class PostIt {
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

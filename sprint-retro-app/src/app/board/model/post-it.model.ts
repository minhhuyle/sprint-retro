enum PostItType {
  GOOD = 'GOOD',
  KEEP = 'KEEP',
  BAD = 'BAD'
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
  PostItType,
  PostIt
}

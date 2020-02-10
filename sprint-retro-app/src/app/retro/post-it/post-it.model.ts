enum PostItType {
  GOOD = 'GOOD',
  KEEP = 'KEEP',
  BAD = 'BAD'
}

class PostIt {
  id: number;
  vote: number;
  comment: string;
  type: PostItType;

  constructor(type: PostItType) {
    this.vote = 0;
    this.type = type;
  }
}

export {
  PostItType,
  PostIt
}

enum PostItType {
  GOOD = 'GOOD',
  KEEP = 'KEEP',
  BAD = 'BAD'
}

class PostIt {
  vote: number;
  comment: string;
}

export {
  PostItType,
  PostIt
}

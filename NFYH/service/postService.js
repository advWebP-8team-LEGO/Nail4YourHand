module.exports = {
  sortDate: (posts) => {
    posts.sort( (a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA < dateB ? 1: -1;
    })
    return posts;
  },
  sortLike: (posts) => {
    posts.sort( (a, b) => {
      return a.likeCnt < b.likeCnt ? 1: -1;
    })
    return posts;
  }
}
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  for (let item of blogs) {
    sum += item.likes
  }
  return sum
}

const favoriteBlog = (blogs) => {
  let favBlog = {
    title: "",
    author: "",
    likes: 0
  }
  for (let item of blogs) {
    if (item.likes > favBlog.likes) {
      favBlog = { title: item.title, author: item.author, likes: item.likes }
    }
  }

  return favBlog
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
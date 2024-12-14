
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => (favorite.likes > blog.likes ? favorite : blog), blogs[0])
  }


const mostBlogs = (blogs) => {
    const authorCounts = blogs.reduce((authorMap, blog) => {
      authorMap[blog.author] = (authorMap[blog.author] || 0) + 1;
      return authorMap;
    }, {});
    
    const topAuthor = Object.entries(authorCounts).reduce((top, [author, count]) => {
      if (count > top.blogs) {
        return { author, blogs: count };
      }
      return top;
    }, { author: '', blogs: 0 });
  
    return topAuthor;
  };

  const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((authorMap, blog) => {
      authorMap[blog.author] = (authorMap[blog.author] || 0) + blog.likes;
      return authorMap;
    }, {});
    
    const topAuthor = Object.entries(authorLikes).reduce((top, [author, likes]) => {
      if (likes > top.likes) {
        return { author, likes };
      }
      return top;
    }, { author: '', likes: 0 });
  
    return topAuthor;
  };
  
 
  


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
  
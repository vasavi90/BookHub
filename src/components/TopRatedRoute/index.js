import './index.css'

const TopRatedBooks = props => {
  const {details} = props
  const {authorName, coverPic, title} = details

  return (
    <div className="container">
      <img src={coverPic} alt={authorName} className="pic" />
      <p className="title">{title}</p>
      <p className="author">{authorName}</p>
    </div>
  )
}

export default TopRatedBooks

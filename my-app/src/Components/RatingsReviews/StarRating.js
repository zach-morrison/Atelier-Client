import Star from './Star'

const StarRating = (props) => {
  const {rating, id} = props
  const stars = []

  for (let i = 0; i < 5; i++) {
    let point = rating - i
    let fill = 0
    if (point >= 1) {
      fill = 100
    } else if (point > 0) {
      fill = Math.floor(point * 100)
    }
    stars.push(<Star key={`${id}-${i}`} fill={fill} id={`${id}-${i}`} />)
  }

  return (
    <div className='flex items-center'>
      {stars}
    </div>
  )
}

export default StarRating
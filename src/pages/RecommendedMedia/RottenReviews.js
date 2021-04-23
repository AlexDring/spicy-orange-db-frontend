
const RottenReviews = props => {
  const { title, score, rottenScores } = props
  return(
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h3 style={{textTransform: 'uppercase', fontWeight: 900, marginBottom: 0}}>Rotten Ga's</h3>
      <h4>{title}</h4>
      <div style={{marginTop: 'auto', textAlign: 'center'}}>
        {score ? <p style={{fontSize: 24, marginBlock: 5}}>{Math.round(score)}/1000</p> : 'No ratings'}
        {score ? <p>{rottenScores(Math.round(score))}</p> : null}
      </div>
    </div>
  )
}

export default RottenReviews
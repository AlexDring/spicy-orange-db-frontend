import imdb from '../../assets/images/imdb.png'
import joeimdb2 from '../../assets/images/joeimdb2.png'
import rottentomatoes from '../../assets/images/rottentomatoes.png'
import metacritic from '../../assets/images/metacritic.png'

const ExternalReviews = (props) => {
  const { source, rating } = props

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {source === 'Internet Movie Database' && <img width={100} src={imdb} alt=""/>}
      {source === 'Rotten Tomatoes' && <img width={100} src={rottentomatoes} alt=""/>}
      {source === 'Metacritic' && <img width={100} src={metacritic} alt=""/>}
      {source === 'JoeImdb' && <img width={110} src={joeimdb2} alt="" />}
      <div style={{ marginTop: "auto" }}>
        <p style={{fontSize: 24}}>{rating}</p>
      </div>
    </div>
  );
};

export default ExternalReviews;

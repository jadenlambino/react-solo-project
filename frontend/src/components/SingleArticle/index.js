import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './singleArticle.css';


const SingleArticle = () => {
    const { id } = useParams();
    const articles = useSelector(state => state.articleState.entries)
    console.log(id)
    console.log(articles)
    const singleArticle = articles.find(article => article.id === +id)

    return (
        <>
            {singleArticle && (
               <div>
                   <h1>{singleArticle.title}</h1>
                   <img
                    src={singleArticle.coverPhoto}
                    alt={singleArticle.title}
                    />
                    <p>
                        {singleArticle?.body}
                    </p>
               </div>
            )}
        </>
    )
}

export default SingleArticle

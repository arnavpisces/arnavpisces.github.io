import * as React from "react"
import { container, individualPost, innerIndividualPost } from '../components/posts.module.css'
// import monzo  from '../images/monzo.png'
import postdata from '../json/postdata.json'
import { Link } from 'gatsby'

const Posts = () => {
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        Promise.all(
            postdata.map((item) =>
            import(`../images/${item.image}`).then((image) => ({
            ...item,
            image: image.default,
            }))
        )
        ).then((data) => {
            console.log('Data from JSON:', postdata);
            console.log('Data after import:', data);
            setImages(data);
          });
    }, []);
    console.log('Component rendered');
    console.log('Data from JSON:', postdata);
    // console.log('Data after import:', data);

    return (
      <div className={container}>
        {images &&
            images.map((item, index) => (
            <div key={index} className={individualPost}>
                <img src={item.image} alt={item.title} />
                    <div className={innerIndividualPost}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        {/* <Link to={item.url} target="_blank">Read More &#8594;</Link> */}
                        <Link to={item.url} target="_blank">Read More &#8594;</Link>
                    </div>
                </div>
        ))}
      </div>
    )
  }
  
  export default Posts;
import React, { Component } from 'react';
import Slider from "react-slick";
import productService from '../services/product.service';
import sliderDefaultImage from '../assets/img/default-slider-image.jpg';
import defaultClothingImage from '../assets/img/default-clothing-image.jpg';
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

const settings = {
    dots: false,
    lazyLoad: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    pauseOnHover: false
  };

const newArivalSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    responsive: [
        {
        breakpoint: 1290,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
        }
        },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

const baseUrl = 'https://fronttask.techeyeco.com';

class Home extends Component {
  constructor(props) {

      super(props);
      this.state = {
          isOpen: false,
          sliderData:[],
          newArrivalData:[],
          discountedProductData:[],
          isOpen: false,
          productList:[],
          ProductToShow:[],
          start:0,
          end:8
      }
      this.sliderImagesList = this.sliderImagesList.bind(this);
      this.newArrivalList = this.newArrivalList.bind(this);
      this.DiscountedProductList = this.DiscountedProductList.bind(this);
      this.productList = this.productList.bind(this);
      this.toggle = this.toggle.bind(this);
      this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  componentDidMount(){

    // getting data for the slider section
    productService.getSliderData()
        .then(response => {
            // mapping through each attachment
            response.data.map(currentData=> {
                // if attachment is null a default image will be set
                if(currentData.attachment === null){
                    this.setState({
                        sliderData:[...this.state.sliderData,"../assets/img/default-slider-image.jpg"]
                    });
                }
                if(currentData.attachment !== null){
                    this.setState({
                        sliderData:[...this.state.sliderData,`${baseUrl}`+`${currentData.attachment.replace(/\\/g, "/")}`]
                    });
                }
            })
        })

    // getting data for the new arrival section
    productService.getNewArrivalData()
    .then(response => {
        response.data.map(currentData=> {
            this.setState({
                newArrivalData:[...this.state.newArrivalData,currentData]
            });
        })
    })

    // getting data for the discounted products section
    productService.getDiscountedProducts()
    .then(response => {
        response.data.map(currentData=> {
            this.setState({
                discountedProductData:[...this.state.discountedProductData,currentData]
            });
        })
    })

    // getting data for product list section
    productService.getProductList(this.state.start,this.state.end)
    .then(response => {
        response.data.map(currentData=> {
            this.setState({
                productList:[...this.state.productList,currentData]
            });
        })
    })
  }

  sliderImagesList(){
    return this.state.sliderData.map((curentImage,index) => {
        if(curentImage === "../assets/img/default-slider-image.jpg"){
            return <div className='slide-image' key={index}><LazyLoadImage  src={sliderDefaultImage} onError={(e)=>{e.target.onError = null; e.target.src = sliderDefaultImage}}/></div>
        }
        else{
            return <div className='slide-image' key={index}><LazyLoadImage  src={curentImage} onError={(e)=>{e.target.onError = null; e.target.src = sliderDefaultImage}}/></div>
        }
    })
  }

    fetchMoreData = () => {
        this.setState({
            start:this.state.start+8,
            end:this.state.end+8
        })
        setTimeout(() => {
        productService.getProductList(this.state.start,this.state.end)
        .then(response => {
            response.data.map(currentData=> {
                this.setState({
                    productList:[...this.state.productList,currentData]
                });
            })
        })
    }, 1500);
  };

  toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
}

  newArrivalList(){
    return this.state.newArrivalData.map((currentItem,index) => {
        let thumbnail =  `${baseUrl}`+`${currentItem.attachment.replace(/\\/g, "/")}`
            return (
                <div className="col-md-3" key={index}>
                    <figure className="card card-product-grid">
                        <div className="img-wrap"> 
                            <LazyLoadImage src={thumbnail} onError={(e)=>{e.target.onError = null; e.target.src = defaultClothingImage}} alt="new arrival thumbnail" />
                        </div> 
                        <figcaption className="info-wrap">
                            <div className="fix-height">
                                <p className="title">{currentItem.name}</p>
                                <div className="price-wrap mt-2">
                                    <span className="price">{`$`+ currentItem.price}</span>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-2">Add to cart </button>
                        </figcaption>
                    </figure>
                </div> 
            )
    })
  }

  DiscountedProductList(){
    return this.state.discountedProductData.map((currentItem,index) => {
        let thumbnail =  `${baseUrl}`+`${currentItem.attachment.replace(/\\/g, "/")}`
            return (
                <div className="col-md-3" key={index}>
                    <figure className="card card-product-grid">
                        <div className="img-wrap"> 
                            <LazyLoadImage src={thumbnail} onError={(e)=>{e.target.onError = null; e.target.src = defaultClothingImage}} alt="new arrival thumbnail" />
                        </div> 
                        <figcaption className="info-wrap">
                            <div className="fix-height">
                                <p className="title">{currentItem.name}</p>
                                <div className="price-wrap mt-2">
                                    <span className="price">{`$`+ (currentItem.price-(currentItem.discount/currentItem.price)).toPrecision(3)} </span>
                                    {(currentItem.discount !== 0) && (
                                        <span>
                                        <del className="price-old">{`$`+ currentItem.price}</del><strong style={{color:"red",paddingLeft:"5px"}}>(%{currentItem.discount} Discount)</strong>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3">Add to cart </button>
                        </figcaption>
                    </figure>
                </div> 
            )
    })
  }

  productList(currentItem,index){
    let thumbnail =  `${baseUrl}`+`${currentItem.attachment.replace(/\\/g, "/")}`
            return (
                <div key={index}>
                    <figure className="card card-product-grid">
                        <div className="img-wrap"> 
                            <LazyLoadImage src={thumbnail} onError={(e)=>{e.target.onError = null; e.target.src = defaultClothingImage}} alt="new arrival thumbnail" />
                        </div> 
                        <figcaption className="info-wrap">
                            <div className="fix-height">
                                <p className="title">{currentItem.name}</p>
                                <div className="price-wrap mt-2">
                                    <span className="price">{`$`+ (currentItem.price-(currentItem.discount/currentItem.price)).toPrecision(3)} </span>
                                    {(currentItem.discount !== 0) && (
                                        <span>
                                        <del className="price-old">{`$`+ currentItem.price}</del><strong style={{color:"red",paddingLeft:"5px"}}>(%{currentItem.discount} Discount)</strong>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3">Add to cart </button>
                        </figcaption>
                    </figure>
                </div> 
            )
  }

  render() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Tech-eye-test</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* slider section */}
            <div className='row'>
                <Slider {...settings}>
                    {this.sliderImagesList()}
                </Slider>
            </div>

            {/* new arrival section */}
            <div className='pt-4' id='newArrival'>
                <h3 className='pb-4'>New arrivals</h3>
                <div className='row'>
                    <Slider {...newArivalSettings}>
                        {this.newArrivalList()}
                    </Slider>
                </div>
            </div>

            {/* discounted products section */}
            <div className='pt-4' id='discounted_products'>
                <h3 className='pb-4'>Discounted products</h3>
                <div className='row'>
                    <Slider {...newArivalSettings}>
                        {this.DiscountedProductList()}
                    </Slider>
                </div>
            </div>

            {/* Product list section */}
            <div className='row' id='product_list'>
                <h3 className='pb-4'>Product list</h3>
                <InfiniteScroll
                    dataLength={this.state.productList.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}>
                    {this.state.productList.map((i, index) => (
                        <div key={index} className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
                            {this.productList(i,index)}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
  }
}
export default Home;
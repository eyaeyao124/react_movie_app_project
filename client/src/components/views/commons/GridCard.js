import React from 'react'
import { Col, Icon } from 'antd';
import "./GridCard.css"


function GridCards(props) {

    if (props.landingPage) {
        return (
            <Col xl={4} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                    </a>
                <div className="movie-box">
                    <div style={{fontWeight:"bold"}}>{props.movieName}</div><Icon type="star" style={{color:"#ff9900"}}/> <span>{props.movieAverage}</span>
                </div>    
                </div>
            </Col>
        )
    } else {
        return (
            <Col xl={4} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>

                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName} />

                </div>
            </Col>
        )
    }

}

export default GridCards

import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,ListGroup ,ListGroupItem } from 'reactstrap';

function RenderDish({dish}){
	return (
		<Card>
			<CardImg width="100%" src={dish.image} alt={dish.name}/>
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText> {dish.description} </CardText>
			</CardBody>
		</Card>
	);	
}

function RenderComment({comments}){
	const temp = [];
	if(comments!=null){
		for(var i=0;i<comments.length;i++){
			temp.push(
				<ListGroupItem key={comments[i].cid}>
					<p>{comments[i].comment}</p><br />
					<p>{comments[i].author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short', day:'2-digit'}).format(new Date(Date.parse(comments[i].date)))}</p>
				</ListGroupItem>
			);
		}
		return (temp);		
	}
	else{
		return(<div></div>);
	}	
}

const DishDetail = (props)=> {

	const dish = props.dishDetails;

	if(dish != null){
		return(
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dishDetails}/>
					</div>

					<div className="col-12 col-md-5 m-1">
						<h4><strong>Comments</strong></h4>
						<ListGroup>
							<RenderComment comments = {dish.comments}/>
						</ListGroup>
					</div>
				</div>
			</div>	
		);
	}
	else {
		return(
			<div></div>
		);
	}	
}

export default DishDetail;
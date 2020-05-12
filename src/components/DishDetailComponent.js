import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,ListGroup ,ListGroupItem } from 'reactstrap';

class DishDetail extends Component {

	constructor(props){
		super(props);

	}

	renderDish(dish){
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

	renderComment(comments){
		const temp = [];
		if(comments!=null){
			console.log('Comments Size : '+comments.length);
			for(var i=0;i<comments.length;i++){
				console.log(comments[i].cid);
				temp.push(
					<ListGroupItem key={comments[i].cid}>
						<p>{comments[i].comment}</p><br />
						<p>{comments[i].author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short', day:'2-digit'}).format(new Date(Date.parse({comments[i].date})))}</p>
					</ListGroupItem>
				);
			}
			return temp;		
		}
		else{
			return(<div></div>);
		}	
	}

	render(){

		const dish = this.props.dishDetails;

		if(dish != null){
			return(
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(dish)}
					</div>

					<div className="col-12 col-md-5 m-1">
						<h4><strong>Comments</strong></h4>
						<ListGroup>
							{this.renderComment(dish.comments)}
						</ListGroup>
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

}

export default DishDetail;
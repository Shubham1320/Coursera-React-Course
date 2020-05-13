import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,ListGroup ,ListGroupItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

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
		console.log(comments.length);
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
	const comments = props.comments;

	if(dish != null){
		return(
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{dish.name}</h3>
						<hr />
					</div>
				</div>
				
				<div className="row">	
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={dish}/>
					</div>	

					<div className="col-12 col-md-5 m-1">
						<h4><strong>Comments</strong></h4>
						<ListGroup>
							<RenderComment comments = {comments}/>
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
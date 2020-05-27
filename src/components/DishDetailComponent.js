import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,ListGroup ,ListGroupItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Button, ModalHeader, Modal, ModalBody , Row, Col, Label} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;

const maxLength = (len) => (val) => !(val) || (val.length <= len);

const minLength = (len) => (val) => (val) && (val.length >= len);



class CommentForm extends Component{

	constructor(props){
		super(props);

		this.state = {
			isModalOpen: false
		}

		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal(){
		this.setState({isModalOpen: !this.state.isModalOpen});
	}

	handleSubmit(values) {
		console.log("Current State is : " + JSON.stringify(values));
		alert("Current State is : " + JSON.stringify(values));
	}	

	render(){

		return(
			<React.Fragment>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"> Submit Comment </span> 
				</Button>

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
					<ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
					<ModalBody>
						<LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor = "rating" md = {12}>Rating</Label>
	            				<Col md={12}>
	            					<Control.select model=".rating" name="rating" className="form-control">
	            						<option>1</option>
	            						<option>2</option>
	            						<option>3</option>
	            						<option>4</option>
	            						<option>5</option>
	            					</Control.select>	  					
	            				</Col>
							</Row>
							<Row className="form-group">
	            				<Label htmlFor = "yourname" md = {12}>Your Name</Label>
	            				<Col md={12}>
	            					<Control.text validators={{
	            							required, minLength: minLength(3), maxLength:maxLength(15)
	            						}}
	            						model =".yourname" 
	            						className="form-control" 
	            						id="yourname" 
	            						name="yourname" 
	            						placeholder="Your Name"/>	
	            						<Errors 
	            							className="text-danger"
	            							model=".yourname"
	            							show="touched"
	            							messages={{
	            								required: 'Required ',
	            								minLength: 'Must be greater than 2 characters',
	            								maxLength: 'Must be 15 characters or less'
	            							}} 
	            						/>				
	            				</Col>
	            			</Row>
	            			<Row className="form-group">
	            				<Label htmlFor = "comment" md = {12}>Comment</Label>
	            				<Col md={12}>
	            					<Control.textarea  model=".comment" id="comment" name="comment" rows="6" className="form-control"/>         					
	            				</Col>
	            			</Row>
	            			<hr/>
	            			<Row className="form-group">
	            				<Col md={{size:12}}>
	            					<Button type="submit" color="primary">
	            					Submit
	            					</Button>
	            				</Col>
	            			</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>


		);
	}

}


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
		temp.push(
			<ListGroupItem>
				<CommentForm/>
			</ListGroupItem>
		)
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
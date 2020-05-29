import React, {Component} from 'react';
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

export default CommentForm;
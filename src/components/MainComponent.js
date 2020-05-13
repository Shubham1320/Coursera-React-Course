import React, { Component } from 'react';
import Menu from './menuComponent';
import Contact from './ContactComponent'; 
import '../App.css';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'; 
import { Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  render() {

    const HomePage = ()=>{
      return(
        <Home dish = {this.state.dishes.filter((dish)=> dish.featured)[0]} promotion = {this.state.promotions.filter((promo)=> promo.featured)[0]} leader = {this.state.leaders.filter((leader)=> leader.featured)[0]}/>
      );
    } 

    const DishWithId = ({match})=>{
      return(
        <DishDetail dishDetails={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId))[0]}
          comments={this.state.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId))}/>
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component = {HomePage} />
          <Route exact path="/menu" component = {() => <Menu dishes={this.state.dishes}/>} />
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component = {Contact}/>
          <Redirect to="/home" component = {HomePage}  />    
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;

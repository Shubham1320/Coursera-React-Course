import React, { Component } from 'react';
import Menu from './menuComponent';
import Contact from './ContactComponent'; 
import '../App.css';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment ,fetchDishes} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
    comments: state.comments   
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}, 
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = ()=>{
      return(
        <Home dish = {this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} dishesLoading={this.props.dishes.isLoading} dishesErrMessage = {this.props.dishes.errMessage} promotion = {this.props.promotions.filter((promo)=> promo.featured)[0]} leader = {this.props.leaders.filter((leader)=> leader.featured)[0]}/>
      );
    } 

    const DishWithId = ({match})=>{
      return(
        <DishDetail dishDetails={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMessage = {this.props.dishes.errMessage}
          comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId))}
          addComment = {this.props.addComment}/>
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component = {HomePage} />
          <Route exact path="/menu" component = {() => <Menu dishes={this.props.dishes}/>} />
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component = {() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> }/>
          <Route exact path="/aboutus" component = {()=> <About leaders={this.props.leaders}/>} />
          <Redirect to="/home" component = {HomePage}  />    
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

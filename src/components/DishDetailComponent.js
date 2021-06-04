import React,{ Component } from 'react';
import { Card , CardImg , CardText, CardBody, CardTitle} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Row , Label, Col } from 'reactstrap';
import { Control , LocalForm , Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

// function RenderMenuItem ({dish, onClick}) {
//     return (
//         <Card>
//             <Link to={`/menu/${dish.id}`} >
//                 <CardImg width="100%" src={dish.image} alt={dish.name} />
//                 <CardImgOverlay>
//                     <CardTitle>{dish.name}</CardTitle>
//                 </CardImgOverlay>
//             </Link>
//         </Card>
//     );
// }
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggle();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);    }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    render(){
        return (
            <div>
                <Button outline onClick={this.toggle}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={10}>
                                <Control.select model=".rating" name="rating" className="form-control"
                                validators={{
                                    required
                                }}
                                >
                                    <option value="">--Select Rating--</option>
                                    <option value="1">1 🌟</option>
                                    <option value="2">2 🌟</option>
                                    <option value="3">3 🌟</option>
                                    <option value="4">4 🌟</option>
                                    <option value="5">5 🌟</option>
                                </Control.select>
                                <Errors 
                                 className="text-danger"
                                 model=".rating"
                                 show="touched"
                                 messages={{
                                     required: 'Please choose a rating'
                                 }}
                                 />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={2}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" name="name" className="form-control" placeholder="Your Name"
                                validators={{
                                    required,minLength: minLength(2),maxLength: maxLength(15)
                                }} />
                                <Errors 
                                    className="text-danger"
                                    model=".name"
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
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" name="comment" id="comment"
                                    rows="6" className="form-control">

                                </Control.textarea>
                            </Col>
                        </Row>
                    
                    <Button color='primary' type="submit">Submit</Button>{'  '}
                    <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments({comments, postComment, dishId}) {

        //let options = { year: "numeric", month: "short", day: "numeric" };
        return (
            <div>
                {
                    comments.map((comment) => (
                        <ul key={comment.id} className="list-unstyled">
                            <li className="mb-2">{comment.comment}</li>
                            <li>
                                - - {comment.author}{" "}
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </li>
                        </ul>
                       ))
                }         
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );

}


function RenderDish({dish}){
    if (dish !=null){
        return (
        <Card>
<CardImg top src={baseUrl + dish.image} alt={dish.name} />            <CardBody>
                <CardTitle><b>{dish.name}</b></CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
        </Card>
        );
    }
    else{
        return (
        <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)        
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} />
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}  
                        dishId={props.dish._id} 
                    />
                </div>
            </div>
        );
    else
        return(
            <div></div>
        );
}

export default DishDetail;
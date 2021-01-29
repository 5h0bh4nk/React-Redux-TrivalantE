import React from 'react';
import { Card , CardImg  , CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


function RenderMenuItem ({dish, onClick}) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function RenderComments({dish}) {
    if(dish!=null){
    let comments=dish.comments;
    if (comments != null) {
        let options = { year: "numeric", month: "short", day: "numeric" };
        
        return comments.map((comment) => (
            <ul key={comment.id} className="list-unstyled">
                <li className="mb-2">{comment.comment}</li>
                <li>
                    - - {comment.author}{" "}
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </li>
            </ul>
        ));
    }} else return <div />;
}


function RenderDish({dish}){
    if (dish !=null){
        return (
        <Card>
        <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardBody>
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

const DishDetail = (props) =>{
    console.log("Dish detailcomponent did update");
    const dish = props.dish;
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
}



export default DishDetail
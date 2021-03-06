import React from 'react';
import  { Component } from 'react';
import { Card, CardImg, CardText, CardBody,Button,Label,
    CardTitle, Breadcrumb, BreadcrumbItem , Modal, ModalHeader, ModalBody,Row,Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm ,Errors} from 'react-redux-form';

   function  RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments}) {
        if (comments != null){
            const menu = comments.map((x) => {
                return (
                    <ul class="list-unstyled">
                        <li>{x.comment}</li>
                        <li>--{x.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(x.date)))}</li>
                    </ul>
                );
            });
    
            return (
                <div>
                    <h4>Comments</h4>
                    {menu}
                    <CommentForm  />
                </div>
            );
            
        }
        else
            return(
                <div></div>
            );
    }
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm  extends Component{   
            
        constructor(props){
            super(props);

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
            
                isModalOpen: false
              };
        }
        
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
        }
        render(){

            return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Content</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="message">Rating</Label>    
                            <Control.select model=".rating" id="rating" className="form-control" name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>

                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="name">Your Name</Label>
                            <Control.text model=".name" id="name" name="name"
                                       className="form-control" placeholder="Your Name"  validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" className="form-control" />
                            </Col>
                        </Row>
                       
                        <Button type="submit" className="bg-primary" value="submit">
                            Submit
                        </Button>      
                    </LocalForm>

                
                    </ModalBody>
                </Modal>
            </div>
               

                
            );

        }


    }      
   const DishDetail=(props) => {
		if (props.dish) {
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
        else {
            return (
                <div></div>
            );
        }

      


    }


export default DishDetail;
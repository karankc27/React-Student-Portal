import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import axios from 'axios'
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

export default class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: [],
            cid: props.location.params.cid
        };
    }
    getUsersData() {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}teacher/assignments/${this.state.cid}`, {})
            .then(res => {
                let data = res.data.data
                console.log(data)
                data = data.filter(u => {
                    return u.courseId==this.state.cid && u.percentage
                })
                const users = data.map(u =>
                    <li className="user-item">
			<Card className="user-item__content">
				<Link>
					
					<div className="user-item__info">
                    <h3>Roll No: {u.rno}</h3>
                    <h3>Words Matched: {u.words_matched}</h3>
                    <h3>Total Words: {u.max_words}</h3>
                    <h3>Percentage: {u.percentage.substring(0,5)}%</h3>
						
					</div>
				</Link>
			</Card>
		</li>
                    
                    
                    )
                    
                    
                    this.setState({
                        users
                    })
                    
                })
                .catch((error) => {
                    console.log(error)
                })
                
            }
            componentDidMount(){
                this.getUsersData()
            }
            render() {
                return (
                    <div>
                <div>
        <h1 align='center'>Assignments (CourseID {this.state.cid})</h1>
                    <br></br>
                <ul className="users-list">
                    {this.state.users}
                    </ul>
                </div>
            </div>
        )
    }
}
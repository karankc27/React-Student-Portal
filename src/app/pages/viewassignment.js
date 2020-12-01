
import React, {Component} from 'react'
import axios from 'axios'

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
                    
                    <table >
                        
                   <br></br>
                    <td>{u.courseId}</td>
                    <td>{u.email.substring(0,12)}</td>
                    <td>{u.words_matched}</td>
                    <td>{u.max_words}</td>
                    <td>{u.percentage.substring(0,5)}%</td>

                    </table>
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
                <style>{`
                    table{
                        border:1px solid black;
                     }
                `}</style>
                <div>
                    <h1 align='center'>Assignments</h1>
                    <table >
                        <th>CourseId</th>
                        <th>RNO</th>
                        <th>Words Matched</th>
                        <th>MAX WORDS</th>
                        <th>PERCENTAGE</th>
                    </table>
                    <br></br>
                    {this.state.users}
                </div>
            </div>
        )
    }
}
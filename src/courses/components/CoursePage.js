import React, { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
const CoursePage = (props) => {
    return(<React.Fragment>
        <div className="map-container">
					<h2>
						<center>
							{props.key} <br />
							Price: {props.key} <br></br>
							<br></br>
							<Button> Buy Now</Button>
						</center>
					</h2>
				</div>
    </React.Fragment>
    )
}


export default CoursePage;
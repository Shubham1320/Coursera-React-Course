import React from 'react';
import {Media} from 'reactstrap';

function RenderLeader(props) {
	return(
		<div key={props.leader.id} className="col-12 mt-5">
			<Media tag="li">
				<Media left middle>
					<Media object src="/assets/images/alberto.png" alt={props.leader.name} />
				</Media>
				<Media body className="ml-5">
					<Media heading>
						{props.leader.name}
					</Media>
					{props.leader.designation}
					<br/>
					{props.leader.description}
				</Media>
			</Media>
		</div>		
	);
}

export default RenderLeader;
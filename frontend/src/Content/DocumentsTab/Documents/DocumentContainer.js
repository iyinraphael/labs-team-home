import React from 'react';
import { Query } from 'react-apollo';
import * as query from '../../../constants/queries';
import { DropTarget } from 'react-dnd';
import Doc from '../Doc';
import { compose } from 'react-apollo';
import { updateDocument } from '../../mutations/documents';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: #4a4550;
	min-width: 300px;
	min-height: 50px;
`;

const Error = styled.p`
	color: white;
`;

const FormDiv = styled.div`
	width: 92%;
	display: flex;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	label {
		color: white;
		font-size: 20px;
	}
	select {
		margin-left: 10px;
	}
	option {
		height: 50px;
	}
`;

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		document: monitor.getItem()
	};
}

class DocumentContainer extends React.Component {
	updateDrop = (id, folderid) => {
		// console.log('Staging DOC: ', id);
		// console.log('DropArea ID: ', folderid);

		if (folderid === undefined) {
			this.props.updateDocument({ id: id, folder: null });
		} else {
			this.props.updateDocument({ id: id, folder: folderid._id });
		}
		console.log('Document Update');
	};

	render() {
		const { connectDropTarget, hovered } = this.props;
		const backgroundColor = hovered ? 'lightgray' : '';

		return connectDropTarget(
			<div>
				<Container style={{ background: backgroundColor }}>
					<FormDiv>
						<SortForm>
							<label>
								Folder Sort:
								<select
									value={this.props.sortOption}
									onChange={this.props.sortChange}
								>
									<option value="newest">Newest First</option>
									<option value="oldest">Oldest First</option>
								</select>
							</label>
						</SortForm>
					</FormDiv>
					{/* Find all the documents  */}
					<Query
						query={query.FIND_DOCUMENTS_BY_TEAM}
						variables={{ team: this.props.team }}
					>
						{({ loading, error, data: { findDocumentsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return console.error(error);
							if (findDocumentsByTeam && findDocumentsByTeam.length > 0) {
								switch (this.props.sortOption) {
									case 'newest':
										findDocumentsByTeam.sort((a, b) => {
											if (a.createdAt < b.createdAt) return 1;
											if (a.createdAt > b.createdAt) return -1;
											return 0;
										});
										break;
									case 'oldest':
										findDocumentsByTeam.sort((a, b) => {
											if (a.createdAt < b.createdAt) return -1;
											if (a.createdAt > b.createdAt) return 1;
											return 0;
										});
										break;
									default:
										break;
								}

								return findDocumentsByTeam
									.filter(doc => doc.folder === null)
									.map(doc => {
										return (
											<div
												onClick={() => this.toggleDocumentDetail(doc)}
												key={doc._id}
											>
												<Doc
													document={doc}
													handleDrop={(id, folderId) =>
														this.updateDrop(id, folderId)
													}
												/>
											</div>
										);
									});
							} else {
								return <Error>No Documents Available For This Team</Error>;
							}
						}}
					</Query>
				</Container>
			</div>
		);
	}
}

const target = {
	drop(props) {
		const { folder } = props;
		return { folder };
	}
};

export default compose(
	DropTarget('item', target, collect),
	updateDocument
)(DocumentContainer);
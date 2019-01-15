const MsgComment = /* GraphQL */ `
	type MsgComment {
		_id: ID
		user: User!
		message: Message!
		content: String!
		likes: [User]
		createdAt: String
		updatedAt: String
	}
	input FindMsgCommentInput {
		id: ID!
	}
	input FindMsgCommentsByMessageInput {
		message: ID!
	}
	input AddMsgCommentInput {
		user: String!
		message: String!
		content: String!
	}
	input UpdateMsgCommentInput {
		id: ID!
		user: String
		message: String
		content: String
	}
	input DeleteMsgCommentInput {
		id: ID!
	}
	extend type Query {
		MsgComments: [MsgComment]
		findMsgCommentsByMessage(input: FindMsgCommentsByMessageInput): [MsgComment]
		findMsgComment(input: FindMsgCommentInput): MsgComment
	}
	extend type Mutation {
		addMsgComment(input: AddMsgCommentInput!): MsgComment
		updateMsgComment(input: UpdateMsgCommentInput!): MsgComment
		deleteMsgComment(input: DeleteMsgCommentInput!): MsgComment
	}
`;

module.exports = MsgComment;

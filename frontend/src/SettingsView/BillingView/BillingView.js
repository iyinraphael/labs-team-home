import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import BillingTeamCard from './BillingTeamCard';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Logo from '../../assets/TH_favicon.png';
import * as query from '../../constants/queries';
import { FULL_TEAM } from '../../constants/fragments';
import { StyledBillingContainer } from '../styles/container.styles';

const STRIPE_SOURCE = gql`
	mutation setPremium($team: ID!, $amount: Int!, $token: String!) {
		setPremium(input: { id: $team, charge: $amount, source: $token }) {
			...FullTeam
		}
	}
	${FULL_TEAM}
`;

const BillingView = props => {
	const publishableKey = 'pk_test_GedRIIhEwHrV1xzzkxMsRuUX';

	console.log(props);
	return (
		<StyledBillingContainer>
			<Query query={query.FIND_TEAMS_BY_USER}>
				{({ loading, error, data: { findTeamsByUser } }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;
					return findTeamsByUser
						.filter(
							({ users }) =>
								users.find(({ user }) => user._id === props.currentUser._id)
									.admin
						)
						.map(team => (
							<BillingTeamCard
								teamId={props.teamId}
								team={team}
								key={team._id}
								data-id={team._id}
								handlePickTeam={props.handlePickTeam}
							/>
						));
				}}
			</Query>
			<Mutation
				mutation={STRIPE_SOURCE}
				update={(cache, { data: { setPremium } }) => {
					const { findTeamsByUser } = cache.readQuery({
						query: query.FIND_TEAMS_BY_USER
					});
					cache.writeQuery({
						query: query.FIND_TEAMS_BY_USER,
						data: {
							findTeamsByUser: findTeamsByUser.map(team =>
								team._id === setPremium._id ? setPremium : team
							)
						}
					});
				}}
			>
				{(setPremium, { data }) => (
					<StripeCheckout
						label="Go Premium" //Component button text
						name="TeamHome" //Modal Header
						description="Upgrade to a premium account today."
						panelLabel="Go Premium" //Submit button in modal
						amount={999} //Amount in cents $9.99
						token={token =>
							setPremium({
								variables: {
									//need to un hard code this later
									team: props.teamId,
									amount: 999,
									token: token.id
								}
							})
								.then(res => {
									console.log(res);
									alert('Payment Success');
								})
								.catch(err => {
									console.log(err);
									alert('Payment Error');
								})
						}
						stripeKey={publishableKey}
						image={Logo} //Pop-in header image
						billingAddress={false}
					/>
				)}
			</Mutation>
		</StyledBillingContainer>
	);
};

export default BillingView;

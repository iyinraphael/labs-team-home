//
//  InviteToTeamViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class InviteToTeamViewController: UIViewController {

    @IBAction func inviteToTeam(_ sender: Any) {
        
        guard let apollo = apollo,
            let teamId = teamId,
            let email = emailTextField.text,
            let phoneNumber = phoneNumberTextField.text else { return }
        
        apollo.perform(mutation: InviteUserToTeamMutation(id: teamId, email: email, phoneNumber: phoneNumber), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let user = data.inviteUser else { return }
            
            print(user)
            teamWatcher?.refetch()
            
        }
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var teamId: GraphQLID?

    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var phoneNumberTextField: UITextField!
    
}

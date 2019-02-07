//
//  InviteToTeamViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Material

class InviteToTeamViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        emailTextField.dividerActiveColor = Appearance.yellowColor
        emailTextField.placeholderActiveColor = Appearance.yellowColor
        emailTextField.textColor = .white
        phoneNumberTextField.dividerActiveColor = Appearance.yellowColor
            phoneNumberTextField.placeholderActiveColor = Appearance.yellowColor
        phoneNumberTextField.textColor = .white
        inviteButton.backgroundColor = Appearance.darkMauveColor
    }

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
            
            guard let result = result else { return }
            
            if let errors = result.errors {
                let this = errors
            }
            
            guard let data = result.data,
                let user = data.inviteUser else { return }
            
            print(user)
            
            DispatchQueue.main.async {
                let alert = UIAlertController(title: "Invitation Sent", message: "The team is getting bigger!", preferredStyle: .alert)
                
                self.present(alert, animated: true, completion: nil)
                
                let when = DispatchTime.now() + 2
                DispatchQueue.main.asyncAfter(deadline: when){
                    
                    alert.dismiss(animated: true, completion: nil)
                }
            }
            
            teamWatcher?.refetch()
//            self.navigationController?.popViewController(animated: true)
            
        }
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var teamId: GraphQLID?

    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var emailTextField: TextField!
    @IBOutlet weak var phoneNumberTextField: TextField!
    @IBOutlet weak var inviteButton: RaisedButton!
    
}

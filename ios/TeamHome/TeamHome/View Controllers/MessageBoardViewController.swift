//
//  MessageBoardViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class MessageBoardViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        displayTeamInfo()
        
        //Load messages for user
    }
    
    @IBAction func filterTags(_ sender: Any) {
        //Displays stack view for tags
        
        //Filters messages from selected tag
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass Team info to Team detail VC
        
        //Pass Team info to add to team VC
    }
    
    // MARK - Private Methods
    
    private func displayTeamInfo() {
    }
    
    // MARK - Properties
    
    var user: User?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    
}

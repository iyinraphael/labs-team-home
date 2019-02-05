//
//  CommentsCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

var commentsWatcher: GraphQLQueryWatcher<FindCommentsByMessageQuery>?

class CommentsCollectionViewController: UICollectionViewController, CommentCollectionCellDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        collectionView.backgroundColor = .clear
        
        guard let messageId = messageId,
            let apollo = apollo else { return }

        loadComments(from: messageId, with: apollo)
    }

    // MARK: UICollectionViewDataSource

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return comments?.count ?? 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CommentCell", for: indexPath) as! CommentCollectionViewCell
    
        guard let comment = comments?[indexPath.row],
            let currentUser = currentUser else { return UICollectionViewCell() }
        cell.comment = comment
        cell.currentUser = currentUser
        cell.delegate = self
        
        return cell
    }
    
    // MARK - CommentCollectionCellDelegate
    
    func likeComment(cell: CommentCollectionViewCell) {
        guard let apollo = apollo,
            let comment = cell.comment,
            let commentId = comment.id else { return }
        
        // Check if already liked
        apollo.perform(mutation: LikeCommentMutation(id: commentId), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            
            print(result)
        }
    }
    
    func unlikeComment(cell: CommentCollectionViewCell) {
        guard let apollo = apollo,
            let comment = cell.comment,
            let commentId = comment.id else { return }
        
        // Check if already liked
        apollo.perform(mutation: UnlikeCommentMutation(id: commentId), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            
            print(result)
        }
    }
    
    // MARK - Private Methods
    
    private func loadComments(from messageId: GraphQLID, with apollo: ApolloClient) {
        commentsWatcher = apollo.watch(query: FindCommentsByMessageQuery(messageId: messageId), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            self.comments = result.data?.findMsgCommentsByMessage
        })
    }
    
//    private func fetchCurrentUser(with apollo: ApolloClient) {
//        apollo.fetch(query: CurrentUserQuery()) { (result, error) in
//            if let error = error {
//                return
//            }
//
//            guard let result = result else { return }
//
//            self.currentUser = result.data?.currentUser
//        }
//    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var messageId: GraphQLID?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
    var comments: [FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?]? {
        didSet {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
    }
}

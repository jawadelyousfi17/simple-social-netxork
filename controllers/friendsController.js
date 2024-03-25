const { User } = require('../models/user')

/* 
utility functions to verify a a userID is in friend list / requests list / sent requests list
*/
const isFriend = (me , userId) => {
    return me.friends.includes(userId);
  }
  const isReq = (me , userId) => {
    return me.requestsSent.includes(userId);
  }
  const isRes = (me , userId) => {
    return me.requestsReceived.includes(userId);
  }


const addFreind = async (req, res) => {
    const id = req.params.username
    try {
        const sender = res.locals.user
        const receiver = await User.findById(id)
        // Update sender's friendRequestsSent
        await sender.updateOne({ $addToSet: { requestsSent: id } });
        await receiver.updateOne({ $addToSet: { requestsReceived: sender._id } });
        await sender.save()
        await receiver.save()
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}


const recievedRequests = async (req, res) => {
    try {
        const user = res.locals.user
        const userRequests = await user.populate({
            path: 'requestsReceived',
            select: 'name _id'
        })
        res.render('received', { data: userRequests.requestsReceived })
    } catch (error) {
        console.log(error.message)
    }
}

const acceptFriend = async (req, res) => {
    const id = req.params.id
    try {
        const receiver = res.locals.user
        const sender = await User.findById(id)
        await receiver.updateOne({ $addToSet: { friends: id }, $pull: { requestsReceived: id } });
        await sender.updateOne({ $addToSet: { friends: receiver._id }, $pull: { requestsSent: receiver._id } });

        res.redirect('/requests')
    } catch (error) {
        console.log(error.message)
    }
}

const getAllFriends = async (req, res) => {
    const user = res.locals.user
    try {
        const freinds = await user.populate({
            path: 'friends',
            select: 'name username _id'
        })
       res.render ( 'friends' , { data : freinds.friends })
    } catch (error) {
        
    }
}

const removeFriend = async (req, res) => {
    const user = res.locals.user
    const id = req.params.id
    try {
        await user.updateOne({$pull: { friends: id } })
        await User.findByIdAndUpdate(id , {$pull: { friends: user._id } } )
       res.redirect('/friends')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {removeFriend, getAllFriends, acceptFriend, addFreind , recievedRequests }


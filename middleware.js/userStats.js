
const userStats = (req , res , next ) => {
    const user = res.locals.user 
    if(user) res.locals.stats = { requests : user.requestsReceived.length , messages : 0 } 
    if(!user) res.locals.stats = {requests : 0 }
    next()
}

module.exports = userStats
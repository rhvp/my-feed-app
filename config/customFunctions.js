module.exports = {
    selectOption : function (status, options) {
        
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
    },
    isUserAuthenticated: (req, res, next)=>{
        if(req.user){
            next();
        } else {
            res.redirect('/login');
        }
    }
}